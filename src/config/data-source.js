const dbConfig = require("./db.config.js");
const { DataSource } = require("typeorm");

const dataSource = new DataSource(dbConfig);

module.exports = dataSource