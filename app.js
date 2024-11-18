const bodyParser = require("body-parser");
const express = require("express");
const dataSource = require("./src/config/data-source.js");
const router = require("./src/routes/app.routes.js");

const app = express();
dataSource.initialize();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,OPTIONS*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization,x-access-token,Content-Type,Content-Length,X-Requested-With,Accept,user");
    next();
})

app.use(bodyParser.json({ type: "application/json" }))
app.use('/', router);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log("App Running on port : " + port)
});