import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  development: {
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.PASSWORD || "",
    database: process.env.DATABASE || "",
    host: process.env.HOST || "",
    dialect: (process.env.DIALECT as "postgres") || "postgres",
  },
};
