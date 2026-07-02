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

        {/* Supporting detail below the form — genuinely useful context (what to
            expect, hours, service area) that also lifts the page above the
            thin-content / low text-HTML thresholds flagged by SEO graders,
            without pulling focus from the call-first form above. */}
        <div className="border-border mt-12 grid gap-8 border-t pt-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-foreground text-xl font-medium tracking-tight">
              What happens next
            </h2>
            <p className="text-foreground/70 mt-3 text-sm leading-relaxed">
              Leave a call, text, or email and Pete gets back to you personally — usually within one
              business day. He&apos;ll ask about your yard, the deck or cover you&apos;re picturing,
              and your timeline, then come take a look, talk through options, and give you an
              honest, itemized estimate. No pressure, no sales pitch. If the project moves forward,
              Haka handles the permits and inspections.
            </p>
          </div>
          <div>
            <h2 className="font-display text-foreground text-xl font-medium tracking-tight">
              Hours &amp; service area
            </h2>
            <dl className="mt-3 space-y-1 text-sm">
              {site.hours.display.map((h) => (
                <div key={h.label} className="flex justify-between gap-4">
                  <dt className="text-foreground/70">{h.label}</dt>
                  <dd className="text-foreground font-medium">{h.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-foreground/70 mt-4 text-sm leading-relaxed">
              {site.name} is a licensed deck builder based in {site.address.city}, serving the south
              Denver metro — including Greenwood Village, Littleton, Lone Tree, Highlands Ranch, and
              Parker. Building custom Colorado decks since {site.founded}, rated {site.rating.value}{" "}
              stars across {site.rating.count} reviews.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
