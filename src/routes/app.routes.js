import express from "express";
import userRouter from "./user.routes.js";
import HttpCodes from "../constants/http-codes.js";

const router = express.Router();

router.use("/user", userRouter);

router.get('/', (req, res) => {
    res.send({
        status: HttpCodes.OK,
        message: "Server Here!"
    })
});


export default router