import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Eyebrow, Section } from "@/components/sections/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Talk to Pete at Haka Decks, a deck builder in Centennial, CO. Call, or leave a number or email and he'll get back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section top="loose" bottom="loose">
      <div className="mx-auto max-w-[540px]">
        <Eyebrow className="mb-3.5">Get a quote</Eyebrow>
        <h1 className="font-display text-foreground text-[52px] leading-[1.02] font-medium tracking-tight text-balance">
          Talk to Pete.
        </h1>
        <p className="text-foreground/70 mt-4 mb-7 text-lg leading-relaxed">
          Call now, or leave your number and he&apos;ll get back to you.
        </p>

        <ContactForm />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Serving Centennial &amp; the south Denver metro · Prefer email?{" "}
          <a href={site.emailHref} className="text-foreground font-medium">
            {site.email}
          </a>
        </p>
      </div>
    </Section>
  );
}
