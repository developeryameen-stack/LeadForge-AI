// import { Router } from "express";

// const router = Router();

// router.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "LeadForge AI API is running successfully 🚀",
//     timestamp: new Date().toISOString(),
//   });
// });

// export default router;


import { Router } from "express";
import authRoutes from "./auth.routes";
import userPreferenceRoutes from "./userPreference.routes";
import leadRoutes from "./lead.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/preferences", userPreferenceRoutes);
router.use("/leads", leadRoutes);

export default router;