import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { ProofBadge } from "@/components/sections/review-quotes";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const title = "Our Process — What to Expect | Haka Decks";
const description =
  "From the first call to a checkback a year later: how a Haka deck project actually runs — free on-site design consultation, itemized proposal, permits handled, a 3–10 day build, and who you talk to at every step.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/process" },
  openGraph: { title, description, url: `${site.url}/process` },
};

const STEPS = [
  {
    title: "The call and the walkthrough",
    time: "This week",
    body: "Tell us what you're picturing — a rough idea is plenty. We come walk the yard with you: sun exposure, grade, sightlines, how you actually want to use the space. It's free, it's usually within the week, and you're talking to the people who will build it, not a salesperson.",
  },
  {
    title: "Design and an itemized number",
    time: "Days, not weeks",
    body: "We design around the site and the budget, then put a real number on it — itemized, in writing, so you can see exactly where every dollar goes and compare it line-for-line against any other bid. No allowances hiding in a lump sum, no pressure clock on the price.",
  },
  {
    title: "Permits and HOA, off your plate",
    time: "2–4 weeks",
    body: "We produce the drawings, pull the permit, file the HOA architectural paperwork, and handle corrections if a reviewer wants something adjusted. You never stand at a counter. We order materials during the wait so the build starts the day approvals land.",
  },
  {
    title: "The build",
    time: "3–10 days on site",
    body: "Footings, framing, decking, railing — with the city's inspections passed at every required stage and the site left clean every evening. Pete walks every project personally, and you'll always know who's in your yard and what happens next.",
  },
  {
    title: "Walkthrough and handoff",
    time: "Final day",
    body: "We walk the finished deck together, fix anything that isn't perfect, and hand over the paperwork: the closed permit, your registered manufacturer warranties, and our 2-year written workmanship warranty. Then the space is yours.",
  },
  {
    title: "The year-later checkback",
    time: "A year on",
    body: "This is the step nobody else promises: we come back. Colorado's first winter is the real test of any deck, and if we think anything isn't perfect — a board that moved, a gate that sags — we fix it. We won't quit until you're thrilled; happy is the only finish line.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Our Process", path: "/process" }]} />

      <Section top="loose" bottom="tight">
        <Eyebrow>What to expect</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Six steps from first call to first barbecue.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Most homeowners have never hired a deck builder before, so here&apos;s exactly how it
          runs — including the step that comes a year after we&apos;re done.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href={site.cta.href}>
              Start with step one
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <ProofBadge />
        </div>
      </Section>

      <Section top="tight" bottom="tight">
        <ol className="grid gap-6 lg:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-border/40 bg-card/40 rounded-2xl border p-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-haka-cream text-lg font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground text-xs tracking-widest uppercase">
                  {s.time}
                </span>
              </div>
              <h2 className="font-display mt-3 text-xl font-medium tracking-tight">{s.title}</h2>
              <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Timing it</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              Working backward from summer.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              Add the steps up and a typical project runs four to eight weeks door to door — most
              of it paperwork lead time, not construction. That&apos;s why the homeowners on new
              decks by Memorial Day are the ones who called in winter. If you&apos;re aiming at a
              date, our{" "}
              <Link href="/blog/best-time-to-build-deck-colorado" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                guide to timing a Colorado deck build
              </Link>{" "}
              maps the calendar, and the{" "}
              <Link href="/deck-cost-calculator" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                cost calculator
              </Link>{" "}
              gets you a planning number before we ever talk.
            </p>
          </div>
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
