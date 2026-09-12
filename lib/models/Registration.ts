import { Schema, models, model, type InferSchemaType, type Model } from "mongoose";

export interface IRegistration {
  registrationId: string;
  fullName: string;
  phone: string;
  email: string;
  churchAffiliation?: string;
  country: string;
  groupSize: number;
  checkedIn: boolean;
  checkedInAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    churchAffiliation: { type: String, trim: true },
    country: {
      type: String,
      required: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
      index: true,
    },
    groupSize: { type: Number, required: true, min: 1, max: 50 },
    checkedIn: { type: Boolean, default: false },
    checkedInAt: { type: Date },
  },
  { timestamps: true }
);

export type RegistrationDocument = InferSchemaType<typeof RegistrationSchema> & {
  _id: Schema.Types.ObjectId;
};

export const Registration: Model<IRegistration> =
  (models.Registration as Model<IRegistration>) ||
  model<IRegistration>("Registration", RegistrationSchema);
