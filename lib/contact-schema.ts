import { z } from "zod";

// Optional "What's it about?" chips. Free to skip — they just help Pete prep.
export const PROJECT_CHIPS = ["New deck", "Pergola", "Deck repair", "Something else"] as const;

// Optional deck-detail inputs — all skippable. The more a homeowner volunteers
// up front, the sharper Pete's first quote and the less phone back-and-forth.
export const DECK_FEATURES = [
  "Railings",
  "Cover / roof",
  "Stairs",
  "Lighting",
  "Built-in seating",
  "Pergola",
  "Outdoor kitchen",
] as const;

// Required "How did you find us?" dropdown. Pete gets the answer in the lead
// email alongside the analytics-derived source (lib/visitor-context.ts) — the
// visitor's own words and the tracking data often disagree in useful ways.
export const REFERRAL_SOURCES = [
  "Google Search",
  "Instagram",
  "YouTube",
  "Nextdoor",
  "Angi",
  "Yelp",
  "Bing",
  "Friend",
  "Magazine",
  "Ad",
  "Other",
] as const;

// A submission carries a phone number, an email, or both — at least one is
// required so Pete always has a way to reach back.
//
// These validators are the single source of truth for both the live hints the
// form shows as you type and the accept/reject gate on submit, so the two
// never drift.
export function isValidPhone(v: string): boolean {
  const digits = (v || "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

export function isValidEmail(v: string): boolean {
  return /^\S+@\S+\.\S+$/.test((v || "").trim());
}

export const contactSchema = z
  .object({
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    email: z.string().trim().max(120).optional().or(z.literal("")),
    // Loose here, gated to REFERRAL_SOURCES in superRefine below — an enum
    // would fail base parsing on the empty placeholder value, and zod skips
    // superRefine when base parsing fails, hiding the phone/email errors
    // until the dropdown was fixed. One refinement pass shows all errors at once.
    referralSource: z.string().max(40),
    projectType: z.enum(PROJECT_CHIPS).optional(),
    squareFootage: z.string().trim().max(20).optional().or(z.literal("")),
    features: z.array(z.enum(DECK_FEATURES)).optional(),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    // Client-compressed photos (base64), attached to the lead email. The form
    // downscales to ≤1600px JPEG before submit, so each stays well under the
    // ~1.5MB-binary cap this limit encodes (and the request under Vercel's
    // 4.5MB body limit).
    photos: z
      .array(
        z.object({
          name: z.string().trim().min(1).max(120),
          type: z.string().regex(/^image\//),
          data: z.string().min(1).max(1_500_000),
        }),
      )
      .max(3)
      .optional(),
    // Honeypot — must be empty.
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((d, ctx) => {
    if (!d.phone && !d.email) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Add a phone number or email so Pete can reach you.",
      });
    } else {
      if (d.phone && !isValidPhone(d.phone)) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Enter a valid phone number." });
      }
      if (d.email && !isValidEmail(d.email)) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "Enter a valid email address." });
      }
    }
    if (!(REFERRAL_SOURCES as readonly string[]).includes(d.referralSource)) {
      ctx.addIssue({
        code: "custom",
        path: ["referralSource"],
        message: "Pick how you found us — it really helps a small shop.",
      });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;
