import { Schema, models, model, type Model } from "mongoose";

export interface IAltarCallResponse {
  name: string;
  phone: string;
  nearestCity?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AltarCallResponseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    nearestCity: { type: String, trim: true },
  },
  { timestamps: true }
);

export const AltarCallResponse: Model<IAltarCallResponse> =
  (models.AltarCallResponse as Model<IAltarCallResponse>) ||
  model<IAltarCallResponse>("AltarCallResponse", AltarCallResponseSchema);
