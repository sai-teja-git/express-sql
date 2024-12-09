const dataSource = require("../config/data-source");
const HttpCodes = require("../constants/http-codes");

const brandEntity = require("../entities/brand.entity");

const addBrand = async (req, res) => {
    try {
        await insertBrand(req.body)
        res.send({
            status: HttpCodes.OK,
            message: "Brand(s) Created"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to add brands',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const insertBrand = async (body) => {
    const brand = dataSource.getRepository(brandEntity)
    return await brand.insert(body)
}

const getBrand = async (_, res) => {
    try {
        const brand = dataSource.getRepository(brandEntity)
        const data = await brand.find({ is_active: true })
        res.send({
            status: HttpCodes.OK,
            data,
            message: "Fetched Brand(s) Data"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch users',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const updateBrand = async (req, res) => {
    try {
        const brand = dataSource.getRepository(brandEntity)
        const brandId = req.params.id
        console.log('brandId', brandId)
        const body = req.body
        if ("id" in body) {
            delete body["id"]
        }
        await brand.update(brandId, body)
        res.send({
            status: HttpCodes.OK,
            message: "Brand Updated"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to update brand',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    addBrand,
    getBrand,
    updateBrand,
    insertBrand,
}