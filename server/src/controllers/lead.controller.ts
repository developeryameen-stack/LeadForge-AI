import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";
import leadService from "../services/lead.service";

export const createLead = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const lead = await leadService.createLead({
      user: req.user._id.toString(),
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  }
);

export const getLeads = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const leads = await leadService.getUserLeads(
      req.user._id.toString()
    );

    res.status(200).json({
      success: true,
      data: leads,
    });
  }
);

export const getLead = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const lead = await leadService.getLeadById(
      req.user._id.toString(),
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: lead,
    });
  }
);

export const updateLead = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const lead = await leadService.updateLead(
      req.user._id.toString(),
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  }
);

export const deleteLead = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await leadService.deleteLead(
      req.user._id.toString(),
      req.params.id
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  }
);