import { Router } from "express";
import {
  addTaskEvidence,
  createTask,
  deleteTask,
  deleteTaskEvidence,
  getAllTasks,
  getTaskById,
  getTaskEvidenceById,
  updateTask,
} from "../controllers/tasksController";
import { authenticateToken } from "../middlewares/index";

const router = Router();

router.post("/", authenticateToken, createTask);
router.get("/:id", authenticateToken, getTaskById);
router.post("/:id/evidence", authenticateToken, addTaskEvidence);
router.get("/:id/evidence", authenticateToken, getTaskEvidenceById);
router.get("/", authenticateToken, getAllTasks);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);
router.delete("/:id/evidence", authenticateToken, deleteTaskEvidence);

export default router;
