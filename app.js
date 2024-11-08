import bodyParser from "body-parser";
import express from "express";
import dataSource from "./src/config/data-source.js";
import router from "./src/routes/app.routes.js";

const app = express();

await dataSource.initialize();

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