import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Eyebrow, Section } from "@/components/sections/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Get a free quote from Haka Decks, a deck builder in Centennial, CO. Tell us about your deck, pergola, or outdoor living project and Pete will be in touch within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Get a quote</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Tell us what you&apos;re thinking.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Even if it&apos;s just a rough idea. We&apos;ll come take a look, talk through options,
          and give you an honest estimate. No pressure, no sales pitch.
        </p>
      </Section>

      <Section top="none">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="border-border/40 bg-card/40 rounded-2xl border p-6 sm:p-10">
            <ContactForm />
          </div>

          <aside className="space-y-10">
            <div>
              <Eyebrow>Reach us directly</Eyebrow>
              <dl className="mt-6 space-y-5 text-sm">
                <ContactRow icon={Phone} label="Phone">
                  <a href={site.phoneHref} className="text-foreground hover:underline">
                    {site.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={Mail} label="Email">
                  <a href={site.emailHref} className="text-foreground break-all hover:underline">
                    {site.email}
                  </a>
                </ContactRow>
                <ContactRow icon={MapPin} label="Address">
                  <p className="text-foreground/90">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </p>
                </ContactRow>
              </dl>
            </div>

            <div>
              <Eyebrow>Hours</Eyebrow>
              <dl className="mt-4 space-y-1.5 text-sm">
                {site.hours.display.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6">
                    <dt className="text-muted-foreground">{h.label}</dt>
                    <dd className="text-foreground/90 tabular-nums">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <Eyebrow>Service area</Eyebrow>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                We work across the south Denver metro — Centennial, Greenwood Village, Cherry Hills,
                Lone Tree, Highlands Ranch, Castle Rock, and surrounding neighborhoods.
              </p>
            </div>

            <div>
              <Eyebrow>Response time</Eyebrow>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Most quote requests get a reply within one business day. Site visits typically
                happen within the week.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-haka-cream mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <dt className="text-muted-foreground text-xs tracking-widest uppercase">{label}</dt>
        <dd className="mt-1">{children}</dd>
      </div>
    </div>
  );
}
