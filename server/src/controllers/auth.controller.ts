import { Request, Response } from "express";
import authService from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  }
);


export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  }
);


// import { AuthRequest } from "../middleware/auth.middleware";

export const getMe = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  }
);


export const updateProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await authService.updateProfile(
      req.user._id.toString(),
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  }
);