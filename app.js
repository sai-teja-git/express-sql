const express = require("express")

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(2200, () => {
    console.log("App Running on port : " + 2000)
});