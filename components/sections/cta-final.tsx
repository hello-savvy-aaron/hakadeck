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
    <Section className="bg-haka-teal relative overflow-hidden text-white">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />
      <div className="relative max-w-3xl">
        <h2 className="font-display text-balance text-4xl leading-[1.04] font-medium tracking-tight sm:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="bg-haka-ink h-12 px-6 text-base text-white hover:bg-haka-ink/85"
          >
            <Link href={site.cta.href}>
              {site.cta.label}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/40 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
          >
            <a href={site.phoneHref}>Call {site.phone}</a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
