require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { authenticateToken } from "./middlewares/authMiddleware";
import { sequelize, syncDatabase } from "./models";
import { squadRoutes, taskRoutes, userRoutes } from "./routes/index";
import { setupSwagger } from "./swagger";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/squad", authenticateToken, squadRoutes);
app.use("/api/tasks", authenticateToken, taskRoutes);

setupSwagger(app);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await syncDatabase();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
