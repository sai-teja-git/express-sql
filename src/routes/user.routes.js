import express from "express";
import HttpCodes from "../constants/http-codes.js";

const userRouter = express.Router();

userRouter.get('/params/:id', (req, res) => {
    console.log('req.id', req.params.id)
    res.send({
        status: 200,
        user_id: req.params.id,
        message: "User Here!"
    })
});

userRouter.get('/query', (req, res) => {
    console.log('req.query', req.query)
    res.send({
        status: 200,
        message: "User Here!",
        ...req.query
    })
});

userRouter.get('/', (req, res) => {
    res.send({
        status: HttpCodes.OK,
        message: "User Here!"
    })
});

export default userRouter