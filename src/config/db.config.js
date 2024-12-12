require('dotenv').config();

const dbConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entities/*.entity.js"],
    migrations: ["src/migrations/**/*.js"],
    synchronize: false,
    ssl: { rejectUnauthorized: false },
    timezone: "Z",
}

module.exports = dbConfig;