const express = require("express");

const orderService = require("../services/order.service");
const orderRouter = express.Router();

orderRouter.post("/cron", (req, res) => {
    return orderService.startCron(req, res)
})

orderRouter.delete("/cron", (req, res) => {
    return orderService.stopCron(req, res)
})

module.exports = orderRouter; 