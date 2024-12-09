const dataSource = require("../config/data-source");
const HttpCodes = require("../constants/http-codes");

const vendorEntity = require("../entities/vendor.entity");

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
    const vendor = dataSource.getRepository(vendorEntity)
    return await vendor.insert(body)
}

const getVendor = async (_, res) => {
    try {
        const vendor = dataSource.getRepository(vendorEntity)
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
        const vendor = dataSource.getRepository(vendorEntity)
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

module.exports = {
    addVendor,
    getVendor,
    updateVendor,
    insertVendor,
}