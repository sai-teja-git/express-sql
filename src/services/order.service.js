const dataSource = require("../config/data-source");
const HttpCodes = require("../constants/http-codes");
const moment = require("moment-timezone");

const userEntity = require("../entities/user.entity");
const user = dataSource.getRepository(userEntity);

const productEntity = require("../entities/product.entity");
const product = dataSource.getRepository(productEntity);

const orderEntity = require("../entities/order.entity");
const { HttpError } = require("../errors/http.errors");
const order = dataSource.getRepository(orderEntity);

let orderCron;
let detailsForOrder = {};
let insertIndex = 1;
let totalInsertions = 0;
let isCronInProgress = false;

const randomIntNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startCron = async (_, res) => {
    try {
        if (isCronInProgress) {
            throw new HttpError("The previous cron job is still in progress. Please wait for it to complete before starting a new one.", 500)
        }
        detailsForOrder = {};
        insertIndex = 1;
        totalInsertions = 0;
        const [userIds, productIds] = await Promise.all([
            await user.find({
                where: {
                    is_active: true
                },
                select: ["id"]
            }),
            await product.find({
                where: {
                    is_active: true
                },
                select: ["id"]
            }),
        ])
        detailsForOrder["users"] = userIds.map(e => e.id);
        detailsForOrder["users_length"] = userIds.length;
        detailsForOrder["products"] = productIds.map(e => e.id);
        detailsForOrder["products_length"] = productIds.length;
        console.log("Cron started......", moment().format("DD-MM-yyyy HH:mm:ss"))
        orderCron = setInterval(() => {
            createOrder()
        }, (10 * 1000))
        isCronInProgress = true;
        res.send({
            status: HttpCodes.OK,
            message: "Cron Started"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch Product Category',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const stopCron = async (_, res) => {
    try {
        clearInterval(orderCron)
        console.log("Cron Stopped......")
        isCronInProgress = false;
        res.send({
            status: HttpCodes.OK,
            message: "Cron Stopped"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch Product Category',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const createOrder = async () => {
    const statusData = ["delivered", "canceled", "returned", "replaced"];
    const orders = [];
    for (let i = 0; i < 10; i++) {
        const userInd = randomIntNumber(0, detailsForOrder["users_length"] - 1);
        const productInd = randomIntNumber(0, detailsForOrder["products_length"] - 1);

        const userId = detailsForOrder["users"][userInd];
        const productId = detailsForOrder["products"][productInd];

        const rating = randomIntNumber(1, 5);
        const discountPercent = randomIntNumber(1, 15);
        const statusInd = i % 2 == 0 ? randomIntNumber(0, 3) : randomIntNumber(0, 1)

        orders.push({
            user_id: { id: userId },
            product_id: { id: productId },
            discount_percent: discountPercent,
            rating,
            status: statusData[statusInd]
        })
        if (statusInd === 3) {
            const statusReInd = randomIntNumber(0, 2)
            orders.push({
                user_id: { id: userId },
                product_id: { id: productId },
                discount_percent: discountPercent,
                rating,
                status: statusData[statusReInd]
            })
        }
    }
    try {
        const data = await order.insert(orders)
        totalInsertions += data.identifiers.length
        console.table({
            sno: insertIndex,
            count: data.identifiers.length,
            totalInsertions,
            message: "Order(s) Created",
            status: HttpCodes.OK,
            on: moment().format("DD-MM-yyyy HH:mm:ss")
        })
        insertIndex++;
    } catch (error) {
        console.log('orders', orders)
        console.error(error.message)
    }
}

module.exports = {
    startCron,
    stopCron,
}