const express = require("express");
const HttpCodes = require("../constants/http-codes.js");

const userService = require("../services/user.service.js")

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
    return userService.addUsers(req, res)
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

module.exports = userRouter; 