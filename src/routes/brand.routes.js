const express = require("express");

const brandService = require("../services/brand.service");
const brandRouter = express.Router();


brandRouter.post("/", (req, res) => {
    return brandService.addBrand(req, res)
});

brandRouter.get("/", (req, res) => {
    return brandService.getBrand(req, res)
});

brandRouter.patch("/:id", (req, res) => {
    return brandService.updateBrand(req, res)
});

module.exports = brandRouter; 