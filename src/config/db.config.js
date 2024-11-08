const dbConfig = {
    type: "postgres",
    host: "ep-wild-sunset-a1fckyqg.ap-southeast-1.aws.neon.tech",
    username: "express_node_owner",
    password: "ALCvr0P5FtJM",
    database: "express_node",
    entities: ["src/entities/*.entity.js"],
    migrations: ["src/migrations/**/*.js"],
    synchronize: false,
    ssl: { rejectUnauthorized: false },
    timezone: "Z",
}

// rimraf src/migrations & rmdir src/migrations & 

// const dbConfig = {
//     type: "postgres",
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER_NAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: ["/src/entities/*.entity.js"],
//     migrations: ["/src/migrations/*.js"],
//     synchronize: true,
//     ssl: { rejectUnauthorized: false },
// }


export default dbConfig;