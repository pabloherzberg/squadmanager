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
  "/:id/members",
  authenticateToken,
  authorizeManager,
  addMemberToSquad
);
router.delete(
  "/:id/members/:id",
  authenticateToken,
  authorizeManager,
  removeMemberFromSquad
);
router.put("/:id", authenticateToken, authorizeManager, updateSquad);
router.delete("/:id", authenticateToken, authorizeManager, deleteSquad);
router.get("/:id", authenticateToken, getSquadById);
router.get("/", authenticateToken, getAllSquads);

export default router;
