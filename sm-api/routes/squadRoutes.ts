import { Router } from "express";
import {
  addMemberToSquad,
  createSquad,
  deleteSquad,
  getAllSquads,
  getSquadById,
  removeMemberFromSquad,
  updateSquad,
} from "../controllers/squadController";
import { authenticateToken, authorizeManager } from "../middlewares/index";

const router = Router();

router.post("/create", authenticateToken, authorizeManager, createSquad);
router.post(
  "/members/add",
  authenticateToken,
  authorizeManager,
  addMemberToSquad
);
router.delete(
  "/members/remove",
  authenticateToken,
  authorizeManager,
  removeMemberFromSquad
);
router.put("/:id", authenticateToken, authorizeManager, updateSquad);
router.delete("/:id", authenticateToken, authorizeManager, deleteSquad);
router.get("/:id", authenticateToken, getSquadById);
router.get("/", authenticateToken, getAllSquads);

export default router;
