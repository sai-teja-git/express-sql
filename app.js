import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/app.routes.js";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,OPTIONS*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization,x-access-token,Content-Type,Content-Length,X-Requested-With,Accept,user");
    next();
})

app.use(bodyParser.json({ type: "application/json" }))
app.use('/', router);


app.listen(process.env.PORT, () => {
    console.log("App Running on port : " + process.env.PORT)
});