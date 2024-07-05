import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE || "squad_manager",
  process.env.DATABASE_USERNAME || "postgres",
  process.env.PASSWORD || "admin",
  {
    host: process.env.HOST || "127.0.0.1",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
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
