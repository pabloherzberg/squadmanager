import { Router } from "express";
import { listUsers, login, register } from "../controllers/userControllers";
import { authenticateToken, authorizeManager } from "../middlewares/index";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateToken, authorizeManager, listUsers);

export default router;
