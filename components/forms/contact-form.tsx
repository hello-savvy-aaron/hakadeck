"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@vercel/analytics";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactSchema, PROJECT_TYPES, type ContactInput } from "@/lib/contact-schema";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: "New deck" },
  });

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Submit failed");
      // Count successful submissions in Vercel Web Analytics. projectType is a
      // bounded enum (no PII) — name/email/message are deliberately omitted.
      track("Contact form submitted", { projectType: values.projectType });
      setSubmitted(true);
      reset();
      toast.success("Got it — Pete will be in touch within one business day.");
    } catch {
      toast.error("Something went wrong. Try emailing pete@hakadecks.com directly.");
    }
  }

  if (submitted) {
    return (
      <div className="border-border/40 bg-card/60 rounded-2xl border p-8">
        <h3 className="font-display text-2xl font-medium tracking-tight">Got your message.</h3>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Pete will be in touch within one business day to set up a no-pressure
          visit. If it&apos;s urgent, give him a call at{" "}
          <a href="tel:+17205895680" className="text-foreground underline-offset-4 hover:underline">
            720-589-5680
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <Input
            autoComplete="name"
            placeholder="Jane Homeowner"
            {...register("name")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="720-555-0142"
            {...register("phone")}
          />
        </Field>
        <Field label="Project type" error={errors.projectType?.message}>
          <Controller
            control={control}
            name="projectType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <Field label="Tell us about your project" error={errors.message?.message}>
        <Textarea
          rows={5}
          placeholder="Size, materials you've considered, anything you'd want to show off — or just a rough idea."
          {...register("message")}
        />
      </Field>

      <Field label="How did you hear about us? (optional)" error={errors.referral?.message}>
        <Input placeholder="Google, neighbor, Instagram…" {...register("referral")} />
      </Field>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 px-6 text-base">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="mr-2 h-4 w-4" />
          )}
          {isSubmitting ? "Sending…" : "Send to Pete"}
        </Button>
        <p className="text-muted-foreground text-xs">
          No spam, no sales sequences — just one human reading and replying.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground/80 text-sm">
        {label}
      </Label>
      {/* The id is wired via the surrounding label[for] — child controls already render their own input element. */}
      <div id={id}>{children}</div>
      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  );
}
