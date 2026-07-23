"use client";

import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@vercel/analytics";
import { trackGa } from "@/lib/gtag";
import { toast } from "sonner";
import { ArrowRight, Camera, Check, Loader2, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  contactChannel,
  contactSchema,
  DECK_FEATURES,
  DECK_LEVELS,
  detectContact,
  PROJECT_CHIPS,
  type ContactInput,
  type ContactKind,
} from "@/lib/contact-schema";
import { trackAdsConversion } from "@/lib/google-ads";
import { trackReddit } from "@/lib/reddit";
import { site } from "@/lib/site";

// Live guidance shown under the contact field, keyed off the same detector that
// gates submission. `pine` reads as success, `soft` as neutral, `warn` as error.
const HINTS: Record<Exclude<ContactKind, null>, { text: string; tone: "pine" | "soft" | "warn" }> =
  {
    phone: { text: "✓ Looks good — we'll call or text this number.", tone: "pine" },
    email: { text: "✓ Looks good — we'll email you back.", tone: "pine" },
    "partial-email": { text: "Almost — that email looks incomplete.", tone: "soft" },
    "partial-phone": { text: "Keep going — 10 digits for a phone number.", tone: "soft" },
    unknown: { text: "Enter a phone number or an email address.", tone: "warn" },
  };

// Empty until the visitor starts typing — the hint only speaks up to confirm or
// correct, never to fill silence. Reserved height keeps the layout from jumping.
const HINT_DEFAULT = "";

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
// Binary ceiling per photo after compression — keeps each base64 payload under
// the schema's 1.5M-char cap and the whole request under Vercel's body limit.
const MAX_COMPRESSED_BYTES = 1_000_000;

// Downscale to ≤1600px JPEG in the browser so a 10 MB phone photo becomes a
// few hundred KB before it rides the JSON payload as base64. Returns null when
// the browser can't decode the file (e.g. HEIC outside Safari) and it's too
// big to send as-is.
async function compressPhoto(
  file: File,
): Promise<{ name: string; type: string; data: string } | null> {
  const toBase64 = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    for (const quality of [0.8, 0.6, 0.4]) {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality),
      );
      if (blob && blob.size <= MAX_COMPRESSED_BYTES) {
        const base = file.name.replace(/\.[^.]+$/, "") || "photo";
        return { name: `${base}.jpg`, type: "image/jpeg", data: await toBase64(blob) };
      }
    }
    return null;
  } catch {
    // Undecodable format — pass the original through only if it's small enough.
    if (file.size <= MAX_COMPRESSED_BYTES && file.type.startsWith("image/")) {
      return { name: file.name, type: file.type, data: await toBase64(file) };
    }
    return null;
  }
}

export function ContactForm() {
  const [sentContact, setSentContact] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Fire quote_form_start once per mount, on the first focus of any field —
  // the funnel step between quote_click (opening /contact) and generate_lead
  // (submitting). Feeds the "Quote form starts" stat on the agency dashboard.
  const formStarted = useRef(false);
  function trackFormStart() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackGa("quote_form_start");
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const contactValue = useWatch({ control, name: "contact" }) ?? "";
  const selectedChip = useWatch({ control, name: "projectType" });
  const selectedLevel = useWatch({ control, name: "levels" });
  const selectedFeatures = useWatch({ control, name: "features" }) ?? [];
  const kind = detectContact(contactValue);
  const hint = kind ? HINTS[kind] : { text: HINT_DEFAULT, tone: "soft" as const };

  function addPhotos(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => {
      if (!f.type.startsWith("image/")) return false;
      if (f.size > MAX_PHOTO_BYTES) {
        toast.error(`${f.name} is over 10 MB — try a smaller photo.`);
        return false;
      }
      return true;
    });
    setPhotos((prev) => [...prev, ...incoming].slice(0, MAX_PHOTOS));
  }

  async function onSubmit(values: ContactInput) {
    try {
      // Photos compress in the browser and ride the payload as attachments. A
      // photo that can't be processed never blocks the lead — it's dropped
      // with a heads-up instead.
      let attached: NonNullable<ContactInput["photos"]> = [];
      if (photos.length) {
        const results = await Promise.all(photos.map(compressPhoto));
        attached = results.filter((r) => r !== null);
        if (attached.length < photos.length) {
          toast.warning(
            attached.length
              ? "One of the photos couldn't be attached — sending the rest."
              : "The photos couldn't be attached — sending your message without them.",
          );
        }
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...(attached.length ? { photos: attached } : {}),
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      // Count successful submissions in Vercel Web Analytics. Both fields are
      // bounded (no PII) — the contact string and note are omitted.
      const channel = contactChannel(values.contact) ?? "unknown";
      const projectType = values.projectType ?? "unspecified";
      track("Contact form submitted", { channel, projectType });
      // Land the actual conversion in GA4 too. `generate_lead` is GA4's
      // recommended lead event — mark it as a key event in the GA4 UI to count
      // it as a conversion. Free and unlimited, unlike the Vercel event above
      // (which needs a paid plan), so this is the reliable home for the signal.
      trackGa("generate_lead", { channel, projectType });
      // Mirror the conversion to Reddit Ads — a quote request counts as a Lead
      // for campaign optimization. No-ops if the pixel isn't configured.
      trackReddit("Lead");
      // And to Google Ads as the form-submit conversion, so Ads counts form
      // leads alongside calls and emails. No-ops until the label is configured.
      trackAdsConversion(site.googleAdsConversions.form, {
        value: 1.0,
        currency: "USD",
      });
      setSentContact(values.contact.trim());
      setPhotos([]);
      reset();
    } catch {
      toast.error("Something went wrong. Try calling us at " + site.phone + ".");
    }
  }

  if (sentContact) {
    return (
      <div className="border-border bg-card rounded-[20px] border p-8 text-center shadow-sm sm:p-10">
        <div className="bg-primary text-primary-foreground mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <p className="font-display text-foreground mt-5 text-3xl font-medium tracking-tight">
          Got it.
        </p>
        <p className="text-foreground/70 mt-3 leading-relaxed">
          We&apos;ll reach out at <strong className="text-foreground">{sentContact}</strong> within
          one business day.
        </p>
        <p className="text-muted-foreground mt-5 text-sm">
          Need it sooner?{" "}
          <a href={site.phoneHref} className="text-haka-pine font-semibold">
            Call {site.phone}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSentContact(null)}
          className="text-primary mt-6 text-sm font-semibold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="border-border bg-card rounded-[20px] border p-6 shadow-sm sm:p-7">
      {/* Primary path — call. Highest-intent, zero-friction for a homeowner. */}
      <a
        href={site.phoneHref}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex items-center justify-center gap-3 rounded-xl px-6 py-[18px] text-lg font-semibold shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Phone className="h-5 w-5" />
        Call us — {site.phone}
      </a>

      <div className="my-6 flex items-center gap-4">
        <span className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-sm font-medium">or have us reach out</span>
        <span className="bg-border h-px flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} onFocusCapture={trackFormStart}>
        <Input
          autoComplete="email"
          enterKeyHint="send"
          placeholder="Your phone number or email"
          aria-label="Your phone number or email"
          aria-describedby="contact-hint"
          className="h-14 text-base"
          {...register("contact")}
        />
        <p
          id="contact-hint"
          className={cn(
            "mt-2 min-h-[18px] px-0.5 text-[13px]",
            errors.contact
              ? "text-[#a05252]"
              : hint.tone === "pine"
                ? "text-haka-pine"
                : hint.tone === "warn"
                  ? "text-[#a05252]"
                  : "text-muted-foreground",
          )}
        >
          {errors.contact?.message ?? hint.text}
        </p>

        {/* Optional project chips — single-select toggle, purely to help us prep. */}
        <fieldset className="mt-4">
          <legend className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
            What&apos;s it about?{" "}
            <span className="font-normal tracking-normal normal-case">(optional)</span>
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {PROJECT_CHIPS.map((label) => {
              const on = selectedChip === label;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    setValue("projectType", on ? undefined : label, { shouldDirty: true })
                  }
                  className={cn(
                    "rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-card text-foreground hover:bg-muted/60",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Optional deck detail — every field skippable; helps Pete quote faster. */}
        <fieldset className="mt-5">
          <legend className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
            Tell us about your deck{" "}
            <span className="font-normal tracking-normal normal-case">(all optional)</span>
          </legend>
          <p className="text-muted-foreground mt-1.5 text-[13px] leading-relaxed">
            A few details now means a faster, more accurate quote — Pete will just ask anyway.
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="sqft" className="text-foreground/80 text-sm font-medium">
                Approx. size
              </label>
              <div className="relative mt-1.5">
                <Input
                  id="sqft"
                  inputMode="numeric"
                  placeholder="e.g. 300"
                  aria-label="Approximate deck size in square feet"
                  className="h-12 pr-14 text-base"
                  {...register("squareFootage")}
                />
                <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm">
                  sq ft
                </span>
              </div>
            </div>
            <div>
              <span className="text-foreground/80 text-sm font-medium">Levels</span>
              <div className="mt-1.5 flex gap-2">
                {DECK_LEVELS.map((label) => {
                  const on = selectedLevel === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setValue("levels", on ? undefined : label, { shouldDirty: true })
                      }
                      className={cn(
                        "flex-1 rounded-full border px-3 py-2.5 text-sm font-medium transition-colors",
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-card text-foreground hover:bg-muted/60",
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <span className="text-foreground/80 mt-4 block text-sm font-medium">
            Features &amp; add-ons
          </span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {DECK_FEATURES.map((label) => {
              const on = selectedFeatures.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    const next = on
                      ? selectedFeatures.filter((f) => f !== label)
                      : [...selectedFeatures, label];
                    setValue("features", next.length ? next : undefined, { shouldDirty: true });
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-card text-foreground hover:bg-muted/60",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Optional photos — especially useful for repair/replacement leads. */}
        <div className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            aria-label="Add photos of your deck or yard"
            onChange={(e) => {
              addPhotos(e.target.files);
              e.target.value = "";
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={photos.length >= MAX_PHOTOS}
              className="border-input text-foreground hover:bg-muted/60 inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Camera className="h-4 w-4" />
              {photos.length ? "Add another photo" : "Add photos of your deck or yard"}
            </button>
            {photos.map((f, i) => (
              <span
                key={`${f.name}-${i}`}
                className="border-input bg-muted/40 text-foreground/80 inline-flex max-w-[180px] items-center gap-1.5 rounded-full border px-3 py-2 text-xs"
              >
                <span className="truncate">{f.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                  className="hover:text-foreground shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
          <p className="text-muted-foreground mt-1.5 px-0.5 text-[13px]">
            Optional — up to 3 photos, 10 MB each. Great for repairs and replacements.
          </p>
        </div>

        <Textarea
          rows={3}
          placeholder="Anything else we should know? (optional)"
          aria-label="Anything else we should know?"
          className="mt-4 text-base"
          {...register("message")}
        />

        {/* Honeypot — hidden from humans, catches bots. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...register("website")}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="mt-3.5 h-14 w-full text-base font-semibold"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ArrowRight className="mr-2 h-5 w-5" />
          )}
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>

        <p className="text-muted-foreground mt-3.5 text-center text-[13px]">
          Replies within one business day. No spam, ever.
        </p>
      </form>
    </div>
  );
}
