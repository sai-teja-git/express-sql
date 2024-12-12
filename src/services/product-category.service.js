const dataSource = require("../config/data-source");
const HttpCodes = require("../constants/http-codes");

const productCategoryEntity = require("../entities/product-category.entity");
const productCategory = dataSource.getRepository(productCategoryEntity)

const addProductCategory = async (req, res) => {
    try {
        await insertProductCategory(req.body)

        res.send({
            status: HttpCodes.OK,
            message: "Product Category(s) Created"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to add product Category(s)',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const insertProductCategory = async (body) => {
    return await productCategory.insert(body)
}

const getProductCategory = async (_, res) => {
    try {
        const data = await productCategory.find({ is_active: true })
        res.send({
            status: HttpCodes.OK,
            data,
            message: "Fetched Product Category(s) Data"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Fetch Product Category',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const updateProductCategory = async (req, res) => {
    try {
        const productCategoryId = req.params.id
        const body = req.body
        if ("id" in body) {
            delete body["id"]
        }
        await productCategory.update(productCategoryId, body)
        res.send({
            status: HttpCodes.OK,
            message: "Product Category Updated"
        })
    } catch (e) {
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed to update product Category',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    addProductCategory,
    getProductCategory,
    updateProductCategory,
    insertProductCategory,
}