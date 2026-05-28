import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { Section } from "./section";

export function CtaFinal({
  heading = "Ready to Talk About Your Deck?",
  body = "Tell us what you're thinking — even if it's just a rough idea. We'll come take a look, talk through options, and give you an honest estimate. No pressure, no sales pitch.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <Section className="relative overflow-hidden">
      <div
        aria-hidden
        className="from-haka-cream/[0.06] absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b to-transparent"
      />
      <div className="border-border/50 bg-card/40 relative overflow-hidden rounded-3xl border p-10 sm:p-16 lg:p-24">
        <div
          aria-hidden
          className="bg-haka-cream/10 absolute -top-32 -right-32 h-80 w-80 rounded-full blur-3xl"
        />
        <div className="relative max-w-3xl">
          <h2 className="font-display text-balance text-4xl leading-[1.04] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {body}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href={site.cta.href}>
                {site.cta.label}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 px-6 text-base">
              <a href={site.phoneHref}>Call {site.phone}</a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
