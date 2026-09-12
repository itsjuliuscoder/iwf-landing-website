import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(254),
  churchAffiliation: z.string().trim().max(200).optional().or(z.literal("")),
  country: z
    .string()
    .trim()
    .length(2)
    .regex(/^[A-Za-z]{2}$/)
    .transform((v) => v.toUpperCase()),
  groupSize: z.coerce.number().int().min(1).max(50),
});

export const partnerInquirySchema = z.object({
  tier: z.enum(["kingdom", "covenant", "seed"]),
  organizationName: z.string().trim().min(2).max(200),
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(20),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const altarCallSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20),
  nearestCity: z.string().trim().max(120).optional().or(z.literal("")),
});
