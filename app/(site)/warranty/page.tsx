import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, HandshakeIcon, ShieldCheck } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { ProofBadge } from "@/components/sections/review-quotes";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const title = "Our Warranty & Guarantee | Haka Decks";
const description =
  "Every Haka deck carries three layers of protection: our 2-year written workmanship warranty, 25-to-50-year manufacturer coverage our certifications unlock, and a simple promise — if something isn't right, we make it right.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/warranty" },
  openGraph: { title, description, url: `${site.url}/warranty` },
};

const LAYERS = [
  {
    icon: ShieldCheck,
    title: "Two years on our workmanship, in writing",
    body: "Framing, fastening, board layout, railing installation, stairs, and every connection in between. If something we built fails because of how we built it within two years, we come back and fix it — no paperwork on your end, no fight.",
  },
  {
    icon: Award,
    title: "25 to 50 years on the boards",
    body: "Every capped composite and PVC line we install carries the manufacturer's structural and fade-and-stain warranties — 25 years to lifetime depending on the line. Our Deckorators Pro Elite, Trex Platinum Pro, and TimberTech dealer credentials unlock the longest labor-coverage tiers those programs offer.",
  },
  {
    icon: HandshakeIcon,
    title: "And the part that isn't a clause",
    body: "In practice we've stood behind serious workmanship issues well past the written two years — five years and beyond — because we'd rather lose money on a bad job than leave a homeowner stuck with one. If something isn't right, we make it right.",
  },
];

export default function WarrantyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Warranty & Guarantee", path: "/warranty" }]} />

      <Section top="loose" bottom="tight">
        <Eyebrow>The Haka Guarantee</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          We guarantee everything we build.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          If something isn&apos;t right, we make it right — no fine print, no fight. Our name goes
          on every project, and three layers of protection back it up.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href={site.cta.href}>
              {site.cta.label}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <ProofBadge />
        </div>
      </Section>

      <Section top="tight" bottom="tight">
        <ul className="grid gap-6 lg:grid-cols-3">
          {LAYERS.map(({ icon: Icon, title: t, body }) => (
            <li key={t} className="border-border/40 bg-card/40 rounded-2xl border p-7">
              <Icon className="text-haka-cream h-6 w-6" />
              <h2 className="font-display mt-4 text-xl font-medium tracking-tight">{t}</h2>
              <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>How a claim works</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              One phone call. We run the rest.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              You never have to figure out which warranty applies. Call us, and we diagnose the
              issue, identify which layer covers it, and run the claim end to end.{" "}
              <span className="text-foreground">Workmanship issue in the first two years?</span>{" "}
              That&apos;s on us — no questions.{" "}
              <span className="text-foreground">Board fading, splitting, or staining?</span>{" "}
              That&apos;s a manufacturer claim, and we file it on your behalf, documentation and
              replacement install included.{" "}
              <span className="text-foreground">
                Something serious, clearly a build error, years later?
              </span>{" "}
              Call us anyway. If it&apos;s truly our fault, we&apos;ll make it right.
            </p>
            <p>
              The long manufacturer terms are real but nuanced — labor coverage runs on its own
              clock, and the fine print matters. We published the full brand-by-brand breakdown,
              including what &ldquo;50-year warranty&rdquo; actually pays for in year 30, in our{" "}
              <Link href="/blog/haka-warranties-guide" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                plain-English warranty guide
              </Link>
              .
            </p>
            <p>
              And because manufacturer warranties require professional installation and filed
              paperwork, we register your project documentation on day one — so coverage is never
              in question when you need it, including when you sell the house.
            </p>
          </div>
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
