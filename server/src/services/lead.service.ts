import Lead from "../models/Lead";

interface CreateLeadData {
  user: string;
  title: string;
  description: string;
  platform:
    | "reddit"
    | "github"
    | "linkedin"
    | "hackernews"
    | "producthunt"
    | "indiehackers";
  sourceUrl: string;
  author?: string;
  industry?: string;
  country?: string;
  aiScore?: number;
}

interface UpdateLeadData {
  status?: "new" | "contacted" | "qualified" | "closed";
  isSaved?: boolean;
}

class LeadService {
  async createLead(data: CreateLeadData) {
    return await Lead.create(data);
  }

  async getUserLeads(userId: string) {
    return await Lead.find({ user: userId }).sort({
      createdAt: -1,
    });
  }

  async getLeadById(userId: string, leadId: string) {
    const lead = await Lead.findOne({
      _id: leadId,
      user: userId,
    });

    if (!lead) {
      throw new Error("Lead not found.");
    }

    return lead;
  }

  async updateLead(
    userId: string,
    leadId: string,
    data: UpdateLeadData
  ) {
    const lead = await Lead.findOneAndUpdate(
      {
        _id: leadId,
        user: userId,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      throw new Error("Lead not found.");
    }

    return lead;
  }

  async deleteLead(userId: string, leadId: string) {
    const lead = await Lead.findOneAndDelete({
      _id: leadId,
      user: userId,
    });

    if (!lead) {
      throw new Error("Lead not found.");
    }

    return {
      message: "Lead deleted successfully",
    };
  }
}

export default new LeadService();