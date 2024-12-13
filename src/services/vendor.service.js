const dataSource = require("../config/data-source");
const HttpCodes = require("../constants/http-codes");

const vendorEntity = require("../entities/vendor.entity");
const vendor = dataSource.getRepository(vendorEntity);

const orderEntity = require("../entities/order.entity");
const order = dataSource.getRepository(orderEntity)

const addVendor = async (req, res) => {
    try {
        await insertVendor(req.body)

        res.send({
            status: HttpCodes.OK,
            message: "Vendor(s) Created"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to add vendors',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const insertVendor = async (body) => {
    return await vendor.insert(body)
}

const getVendor = async (_, res) => {
    try {
        const data = await vendor.find({ is_active: true })
        res.send({
            status: HttpCodes.OK,
            data,
            message: "Fetched Vendor(s) Data"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch vendors',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const updateVendor = async (req, res) => {
    try {
        const vendorId = req.params.id
        const body = req.body
        if ("id" in body) {
            delete body["id"]
        }
        await vendor.update(vendorId, body)
        res.send({
            status: HttpCodes.OK,
            message: "Vendor Updated"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to update vendor',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

/**
 * The function `getVendorRatings` retrieves vendor ratings and related information from orders in a
 * database and sends the data as a response.
 * @param _ - The underscore (_) in the function parameters typically represents a placeholder for an
 * unused parameter. In this case, it seems that the function `getVendorRatings` does not require any
 * input parameters, so the underscore (_) is used to indicate that there is no specific parameter
 * being passed into the function.
 * @param res - The `res` parameter in your function `getVendorRatings` is typically used to send the
 * HTTP response back to the client. It is an instance of the response object in Express.js or similar
 * frameworks. In your code snippet, you are using `res.send()` and `res.status().json
 */
const getVendorRatings = async (_, res) => {
    try {
        const data = await order
            .createQueryBuilder("order")
            .leftJoin("order.product_id", "product")
            .leftJoin("product.vendor_id", "vendor")
            .select([
                "vendor.id As vendor",
                "vendor.name As name",
                "vendor.contact_name AS contact_name",
                "CAST(TRUNC(AVG(order.rating),2) AS FLOAT) AS rating",
                "CAST(COUNT(order.rating) AS INT) AS reviews",
            ])
            .groupBy(["vendor.id", "vendor.name"])
            .orderBy("rating", "DESC")
            .where("order.status='delivered' OR order.status='replaced'")
            .getRawMany(); x
        res.send({
            status: HttpCodes.OK,
            data,
            message: "Fetched Successfully."
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to fetch',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    addVendor,
    getVendor,
    updateVendor,
    insertVendor,
    getVendorRatings
}