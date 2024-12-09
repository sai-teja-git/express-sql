const express = require("express");

const productService = require("../services/product.service");
const productRouter = express.Router();


productRouter.post("/", (req, res) => {
    return productService.addProduct(req, res)
});

productRouter.get("/", (req, res) => {
    return productService.getProduct(req, res)
});

productRouter.patch("/:id", (req, res) => {
    return productService.updateProduct(req, res)
});

module.exports = productRouter;