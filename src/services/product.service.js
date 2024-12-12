const dataSource = require("../config/data-source");
const HttpCodes = require("../constants/http-codes");

const productEntity = require("../entities/product.entity");
const product = dataSource.getRepository(productEntity);

const addProduct = async (req, res) => {
    try {
        await insertProduct(req.body)

        res.send({
            status: HttpCodes.OK,
            message: "Product(s) Created"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to add product(s)',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const insertProduct = async (body) => {
    if (Array.isArray(body)) {
        for (let productItem of body) {
            productItem.vendor_id = { id: productItem.vendor_id };
            productItem.brand_id = { id: productItem.brand_id };
            productItem.category_id = { id: productItem.category_id };
        }
    } else {
        body.vendor_id = { id: body.vendor_id };
        body.brand_id = { id: body.brand_id };
        body.category_id = { id: body.category_id };
    }
    console.log('body', body)
    return await product.insert(body)
}

const getProduct = async (_, res) => {
    try {
        const data = await product.find({ is_active: true })
        res.send({
            status: HttpCodes.OK,
            data,
            message: "Fetched Product(s) Data"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch Product',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const body = req.body
        const relational_data = {
            vendor_id: { name: "vendor" },
            brand_id: { name: "brand" },
            category_id: { name: "product_category" }
        }
        for (let key in relational_data) {
            if (key in body) {
                body[relational_data[key].name] = { id: body[key] }
                delete body[key]
            }
        }
        if ("id" in body) {
            delete body["id"]
        }
        await product.update(productId, body)
        res.send({
            status: HttpCodes.OK,
            message: "Product Updated"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to update product',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    insertProduct,
}