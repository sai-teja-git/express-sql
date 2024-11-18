const express = require("express");
const userRouter = require("./user.routes.js");
const HttpCodes = require("../constants/http-codes.js");

const router = express.Router();

router.use("/user", userRouter);

router.get('/', (req, res) => {
    res.send({
        status: HttpCodes.OK,
        message: "Server Here!"
    })
});


module.exports = router;