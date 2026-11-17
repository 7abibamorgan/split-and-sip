// Split & Sip: routes (filled in by the owner of this use case)
import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  handleGetAll,
  handleCreate,
  handleDelete,
} from "../controllers/expenseController.js";

const router = express.Router();

// Anyone may look
router.get("/", handleGetAll);
// Only a logged-in user may change: requireAuth runs first
router.post("/", requireAuth, handleCreate);
router.delete("/:id", requireAuth, handleDelete);

export default router;