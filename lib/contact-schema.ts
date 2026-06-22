import { z } from "zod";

export const PROJECT_TYPES = [
  "New deck",
  "Pergola or covered structure",
  "Outdoor kitchen",
  "Railing system",
  "Deck repair or restoration",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Tell us your name.").max(80),
  email: z.string().email("That doesn't look like a valid email."),
  phone: z.string().max(40).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPES),
  message: z.string().min(10, "A sentence or two helps us prep.").max(4000),
  referral: z.string().max(120).optional().or(z.literal("")),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
