import dbConfig from "./db.config.js";
import { DataSource } from "typeorm";

const dataSource = new DataSource(dbConfig);

export default dataSource;