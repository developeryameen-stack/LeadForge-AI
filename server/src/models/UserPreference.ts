import mongoose, { Schema, Document } from "mongoose";

export interface IUserPreference extends Document {
  user: mongoose.Types.ObjectId;

  targetIndustries: string[];
  targetPlatforms: string[];
  keywords: string[];
  excludedKeywords: string[];
  preferredCountries: string[];

  notificationFrequency: "instant" | "daily" | "weekly";

  aiModel: string;

  leadScoreThreshold: number;
}

const userPreferenceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    targetIndustries: {
      type: [String],
      default: [],
    },

    targetPlatforms: {
      type: [String],
      default: [],
    },

    keywords: {
      type: [String],
      default: [],
    },

    excludedKeywords: {
      type: [String],
      default: [],
    },

    preferredCountries: {
      type: [String],
      default: [],
    },

    notificationFrequency: {
      type: String,
      enum: ["instant", "daily", "weekly"],
      default: "daily",
    },

    aiModel: {
      type: String,
      default: "gpt-5.5",
    },

    leadScoreThreshold: {
      type: Number,
      default: 70,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserPreference>(
  "UserPreference",
  userPreferenceSchema
);