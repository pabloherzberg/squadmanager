import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE || "squad_manager",
  process.env.USERNAME || "postgres",
  process.env.PASSWORD || "admin",
  {
    host: process.env.HOST || "127.0.0.1",
    dialect: "postgres",
  }
);

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};
