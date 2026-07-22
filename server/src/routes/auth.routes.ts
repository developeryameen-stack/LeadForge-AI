import { Router } from "express";
// import { register, login } from "../controllers/auth.controller";
import { register, login, getMe } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";


const router = Router();

// POST /api/v1/auth/register
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;