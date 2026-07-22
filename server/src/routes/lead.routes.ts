import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";

const router = Router();

router.use(protect);

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;