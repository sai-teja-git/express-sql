const express = require("express");

const userService = require("../services/user/user.service.js");
const authService = require("../services/user/auth.service")
const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
    return authService.login(req, res)
});

userRouter.post('/password-update', (req, res) => {
    return userService.updatePassword(req, res)
});

userRouter.post('/', (req, res) => {
    return userService.addUsers(req, res)
});

userRouter.get('/', (req, res) => {
    return userService.getUsers(req, res)
});

module.exports = userRouter;