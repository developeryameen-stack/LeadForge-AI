import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";
import userPreferenceService from "../services/userPreference.service";

export const getPreferences = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const preferences = await userPreferenceService.getPreferences(
      req.user._id.toString()
    );

    res.status(200).json({
      success: true,
      data: preferences,
    });
  }
);

export const updatePreferences = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const preferences =
      await userPreferenceService.updatePreferences(
        req.user._id.toString(),
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      data: preferences,
    });
  }
);