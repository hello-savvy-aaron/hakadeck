"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@vercel/analytics";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  contactChannel,
  contactSchema,
  detectContact,
  PROJECT_CHIPS,
  type ContactInput,
  type ContactKind,
} from "@/lib/contact-schema";
import { trackReddit } from "@/lib/reddit";
import { site } from "@/lib/site";

// Live guidance shown under the contact field, keyed off the same detector that
// gates submission. `pine` reads as success, `soft` as neutral, `warn` as error.
const HINTS: Record<Exclude<ContactKind, null>, { text: string; tone: "pine" | "soft" | "warn" }> =
  {
    phone: { text: "✓ Looks good — Pete will call or text this number.", tone: "pine" },
    email: { text: "✓ Looks good — Pete will email you back.", tone: "pine" },
    "partial-email": { text: "Almost — that email looks incomplete.", tone: "soft" },
    "partial-phone": { text: "Keep going — 10 digits for a phone number.", tone: "soft" },
    unknown: { text: "Enter a phone number or an email address.", tone: "warn" },
  };

const HINT_DEFAULT = "One field is all Pete needs — phone or email, whichever you prefer.";

export function ContactForm() {
  const [sentContact, setSentContact] = useState<string | null>(null);
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
  const kind = detectContact(contactValue);
  const hint = kind ? HINTS[kind] : { text: HINT_DEFAULT, tone: "soft" as const };

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Submit failed");
      // Count successful submissions in Vercel Web Analytics. Both fields are
      // bounded (no PII) — the contact string and note are omitted.
      track("Contact form submitted", {
        channel: contactChannel(values.contact) ?? "unknown",
        projectType: values.projectType ?? "unspecified",
      });
      // Mirror the conversion to Reddit Ads — a quote request counts as a Lead
      // for campaign optimization. No-ops if the pixel isn't configured.
      trackReddit("Lead");
      setSentContact(values.contact.trim());
      reset();
    } catch {
      toast.error("Something went wrong. Try calling Pete at " + site.phone + ".");
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
          Pete will reach out at <strong className="text-foreground">{sentContact}</strong> within
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
        onClick={() => track("Contact call clicked")}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex items-center justify-center gap-3 rounded-xl px-6 py-[18px] text-lg font-semibold shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Phone className="h-5 w-5" />
        Call Pete — {site.phone}
      </a>

      <div className="my-6 flex items-center gap-4">
        <span className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-sm font-medium">or have Pete reach out</span>
        <span className="bg-border h-px flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* Optional project chips — single-select toggle, purely to help Pete prep. */}
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

        <Textarea
          rows={3}
          placeholder="Anything else Pete should know? (optional)"
          aria-label="Anything else Pete should know?"
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
          {isSubmitting ? "Sending…" : "Send to Pete"}
        </Button>

        <p className="text-muted-foreground mt-3.5 text-center text-[13px]">
          Replies within one business day. No spam, ever.
        </p>
      </form>
    </div>
  );
}
