import * as dotenv from "dotenv";
import { resolve } from "path";
import { Sequelize } from "sequelize";
import { config } from "./config/config";
import { syncDatabase } from "./models";

dotenv.config({ path: resolve(__dirname, ".env") });
dotenv.config();

if (!process.env.DATABASE_USERNAME) {
  console.error("USERNAME not defined");
  process.exit(1);
}

console.log({
  username: process.env.DATABASE_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});

const env = "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as any,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await syncDatabase();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
