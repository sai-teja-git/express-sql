const dataSource = require("../config/data-source");
const HttpCodes = require("../constants/http-codes");
const fs = require("fs");

const userService = require("./user/user.service");
const brandService = require("./brand.service");
const productCategoryService = require("./product-category.service");
const vendorService = require("./vendor.service");
const productService = require("./product.service");

const addDefaultData = async (_, res) => {
    try {

        await createUsers();
        console.log("User(s) created..")
        const brandIds = await createBrands();
        console.log("Brand(s) created..")
        const productCategoryIds = await createProductCategory();
        console.log("Product Categories created..")
        const vendorIds = await createVendor();
        console.log("Vendor(s) created..")

        const productFilePath = "src/data-files/product.json";
        const productBody = JSON.parse(await fs.readFileSync(productFilePath, "utf-8"));
        for (let product of productBody) {
            product.vendor_id = vendorIds[product.vendor_name] ?? null;
            delete product.vendor_name
            product.brand_id = brandIds[product.brand_name] ?? null;
            delete product.brand_name
            product.category_name = productCategoryIds[product.category_name] ?? null;
            delete product.category_name
        }

        await productService.insertProduct(productBody)
        console.log("Product(s) created..")

        res.send({
            status: HttpCodes.OK,
            message: "Data Inserted"
        })
    } catch (e) {
        console.log(e)
        res.status(e.status ?? HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: e.message ?? 'Failed Insert Data',
            status: e.status ?? HttpCodes.INTERNAL_SERVER_ERROR
        });
    }
}

const createUsers = async () => {
    const userFilePath = "src/data-files/user.json";
    const userBody = JSON.parse(await fs.readFileSync(userFilePath, "utf-8"));
    const userData = await userService.insertUsers(userBody);
    const userCreatedIds = userData.identifiers;
    const userIds = {};
    for (let [ind, user] of userBody.entries()) {
        userIds[user.name] = userCreatedIds[ind].id
    }
    return userIds
}

const createBrands = async () => {
    const brandFilePath = "src/data-files/brand.json";
    const brandBody = JSON.parse(await fs.readFileSync(brandFilePath, "utf-8"));
    const brandData = await brandService.insertBrand(brandBody);
    const brandCreatedIds = brandData.identifiers;
    const brandIds = {};
    for (let [ind, user] of brandBody.entries()) {
        brandIds[user.name] = brandCreatedIds[ind].id
    }
    return brandIds
}

const createProductCategory = async () => {
    const productCategoryFilePath = "src/data-files/product-category.json";
    const productCategoryBody = JSON.parse(await fs.readFileSync(productCategoryFilePath, "utf-8"));
    const productCategoryData = await productCategoryService.insertProductCategory(productCategoryBody);
    const productCategoryCreatedIds = productCategoryData.identifiers;
    const productCategoryIds = {};
    for (let [ind, user] of productCategoryBody.entries()) {
        productCategoryIds[user.name] = productCategoryCreatedIds[ind].id
    }
    return productCategoryIds
}

const createVendor = async () => {
    const vendorFilePath = "src/data-files/vendor.json";
    const vendorBody = JSON.parse(await fs.readFileSync(vendorFilePath, "utf-8"));
    const vendorData = await vendorService.insertVendor(vendorBody);
    const vendorCreatedIds = vendorData.identifiers;
    const vendorIds = {};
    for (let [ind, user] of vendorBody.entries()) {
        vendorIds[user.name] = vendorCreatedIds[ind].id
    }
    return vendorIds
}

module.exports = {
    addDefaultData
}