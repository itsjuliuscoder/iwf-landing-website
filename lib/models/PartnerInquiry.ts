import { Schema, models, model, type Model } from "mongoose";

export type PartnerTier = "kingdom" | "covenant" | "seed";

export interface IPartnerInquiry {
  tier: PartnerTier;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerInquirySchema = new Schema(
  {
    tier: {
      type: String,
      required: true,
      enum: ["kingdom", "covenant", "seed"],
    },
    organizationName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

export const PartnerInquiry: Model<IPartnerInquiry> =
  (models.PartnerInquiry as Model<IPartnerInquiry>) ||
  model<IPartnerInquiry>("PartnerInquiry", PartnerInquirySchema);
