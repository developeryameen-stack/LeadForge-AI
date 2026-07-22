import mongoose, { Document, Schema } from "mongoose";

export interface ILead extends Document {
  user: mongoose.Types.ObjectId;

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

  author: string;

  industry: string;
  country: string;

  aiScore: number;

  status: "new" | "contacted" | "qualified" | "closed";

  isSaved: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    platform: {
  type: String,
  enum: [
    "reddit",
    "github",
    "linkedin",
    "hackernews",
    "producthunt",
    "indiehackers",
  ],
  required: true,
},

    sourceUrl: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    aiScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
    },

    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>("Lead", leadSchema);