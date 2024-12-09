const express = require("express");

const productCategoryService = require("../services/product-category.service");
const productCategoryRouter = express.Router();


productCategoryRouter.post("/", (req, res) => {
    return productCategoryService.addProductCategory(req, res)
});

productCategoryRouter.get("/", (req, res) => {
    return productCategoryService.getProductCategory(req, res)
});

productCategoryRouter.patch("/:id", (req, res) => {
    return productCategoryService.updateProductCategory(req, res)
});

module.exports = productCategoryRouter;