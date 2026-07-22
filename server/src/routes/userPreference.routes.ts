import { Router } from "express";
import {
  getPreferences,
  updatePreferences,
} from "../controllers/userPreference.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, getPreferences);

router.put("/", protect, updatePreferences);

export default router;