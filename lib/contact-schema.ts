import { z } from "zod";

// Optional "What's it about?" chips. Free to skip — they just help Pete prep.
export const PROJECT_CHIPS = ["New deck", "Pergola", "Deck repair", "Something else"] as const;

// Optional deck-detail inputs — all skippable. The more a homeowner volunteers
// up front, the sharper Pete's first quote and the less phone back-and-forth.
export const DECK_LEVELS = ["Single-level", "Multi-level"] as const;
export const DECK_FEATURES = [
  "Railings",
  "Cover / roof",
  "Stairs",
  "Lighting",
  "Built-in seating",
  "Pergola",
  "Outdoor kitchen",
] as const;

// A submission carries a single point of contact — either a phone number or an
// email — plus optional context. One required field, lowest possible friction.
//
// `detectContact` is the single source of truth for both the live hint the form
// shows as you type and the accept/reject gate on submit, so the two never drift.
export type ContactKind =
  | "email"
  | "phone"
  | "partial-email"
  | "partial-phone"
  | "unknown"
  | null;

export function detectContact(v: string): ContactKind {
  const t = (v || "").trim();
  if (!t) return null;
  if (/@/.test(t)) return /^\S+@\S+\.\S+$/.test(t) ? "email" : "partial-email";
  const digits = t.replace(/\D/g, "");
  if (digits.length >= 10 && digits.length <= 11) return "phone";
  if (digits.length > 0) return "partial-phone";
  return "unknown";
}

export function contactChannel(v: string): "email" | "phone" | null {
  const kind = detectContact(v);
  return kind === "email" || kind === "phone" ? kind : null;
}

export const contactSchema = z
  .object({
    contact: z
      .string()
      .trim()
      .min(1, "Add a phone number or email so Pete can reach you.")
      .max(120),
    projectType: z.enum(PROJECT_CHIPS).optional(),
    squareFootage: z.string().trim().max(20).optional().or(z.literal("")),
    levels: z.enum(DECK_LEVELS).optional(),
    features: z.array(z.enum(DECK_FEATURES)).optional(),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    // Honeypot — must be empty.
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((d) => contactChannel(d.contact) !== null, {
    path: ["contact"],
    message: "Enter a valid phone number or email.",
  });

export type ContactInput = z.infer<typeof contactSchema>;
