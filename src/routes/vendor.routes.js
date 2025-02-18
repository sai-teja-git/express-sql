const express = require("express");

const vendorService = require("../services/vendor.service");
const vendorRouter = express.Router();


vendorRouter.post("/", (req, res) => {
    return vendorService.addVendor(req, res)
});

vendorRouter.get("/rating", (req, res) => {
    return vendorService.getVendorRatings(req, res)
});

vendorRouter.get("/products", (req, res) => {
    return vendorService.getVendorProducts(req, res)
});

vendorRouter.get("/", (req, res) => {
    return vendorService.getVendor(req, res)
});

vendorRouter.patch("/:id", (req, res) => {
    return vendorService.updateVendor(req, res)
});

module.exports = vendorRouter; 