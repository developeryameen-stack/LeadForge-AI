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

const router = Router();

router.use("/auth", authRoutes);

export default router;