const express = require("express");
const HttpCodes = require("../constants/http-codes.js");

const userRouter = require("./user.routes.js");
const brandRouter = require("./brand.routes.js");
const productCategoryRouter = require("./product-category.routes.js");
const productRouter = require("./product.routes.js");
const vendorRouter = require("./vendor.routes.js");
const commonService = require("../services/common.service.js");
const orderRouter = require("./order.routes.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/brand", brandRouter);
router.use("/product-category", productCategoryRouter);
router.use("/vendor", vendorRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter)

router.post("/default-data", (req, res) => {
    return commonService.addDefaultData(req, res)
})

router.get('/', (_, res) => {
    res.send({
        status: HttpCodes.OK,
        name: "express-sql",
        message: "Server Here!"
    })
});


module.exports = router;