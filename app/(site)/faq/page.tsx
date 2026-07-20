import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Eyebrow, Section } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { ProofBadge } from "@/components/sections/review-quotes";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/faqs";

const title = "Deck Building FAQ — Cost, Permits, Materials, Timeline | Haka Decks";
const description =
  "Every question homeowners ask us, in one place: what a deck costs in the Denver metro, how permits and HOAs work, composite vs. wood, how long a build takes, and what our warranty covers.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title, description, url: `${site.url}/faq` },
};

// Rendered below AND fed to FaqJsonLd — schema text must match visible copy.
const CATEGORIES: { name: string; faqs: Faq[] }[] = [
  {
    name: "Cost & payment",
    faqs: [
      {
        q: "How much does a new deck cost in the Denver area?",
        a: "A professionally built capped-composite deck runs about $40–$70 per square foot installed in 2026 — a typical 300–400 square foot deck lands around $15,000–$30,000 with stairs, railing, and permits included. Size, height, access, and material move the number. Our free cost calculator gives you a planning range in thirty seconds, and every Haka estimate is itemized so you can see exactly where the budget goes.",
      },
      {
        q: "Why isn't Haka the cheapest quote I'll get?",
        a: "Because the cheapest deck in Colorado is usually the one built to sea-level habits. Our decks are engineered for altitude — footings below the frost line, framing sized for snow load, hardware and flashing specced for freeze-thaw — installed by manufacturer-certified crews whose certification tiers unlock the longest warranty coverage those brands offer, permitted and inspected every time, and backed by a written workmanship warranty we've honored past its own term. We'd rather explain an itemized number once than have you pay for a rebuilt ledger later. If a lower bid itemizes the same scope, engineering, and warranty, take it — we've just never seen one that does.",
      },
      {
        q: "Do you require a big deposit?",
        a: "No. A deposit should cover materials mobilization, not shift the whole job's risk onto you — we take a modest deposit with payments tied to project milestones, and you never pay the balance until the final walkthrough. Treat any builder asking for half down as a red flag.",
      },
      {
        q: "Do you offer financing?",
        a: "Many of our clients pay from savings or a HELOC, but there are several good routes to financing a deck in Colorado — we've laid out the honest pros and cons of each on our financing page, and we're glad to talk through what fits your project.",
      },
    ],
  },
  {
    name: "Permits & HOA",
    faqs: [
      {
        q: "Do I need a permit to build a deck?",
        a: "Almost certainly yes. On the Front Range essentially every deck over 30 inches requires a building permit, and many towns permit lower ones too. We produce the drawings, submit the permit, manage inspections, and handle corrections on every build — it's part of the job, not an add-on. An unpermitted deck is a classic inspection red flag when you sell.",
      },
      {
        q: "Will you deal with my HOA?",
        a: "Yes — completely. Most south-metro neighborhoods run architectural review before the city sees anything, and we prepare and file the submittal drawings, material and color specs, and site plans. We've been through the process with the HRCA in Highlands Ranch and the big associations in Parker, Lone Tree, and Centennial enough times to know what each one wants to see.",
      },
      {
        q: "How long do permits take?",
        a: "Two to four weeks is typical across the south Denver metro, longer in the spring rush. We order materials during the wait so the crew starts the day approvals land. Our permit guide covers what each city actually requires.",
      },
    ],
  },
  {
    name: "Materials",
    faqs: [
      {
        q: "Composite or wood — which should I choose?",
        a: "In Colorado, composite wins for most homeowners: our altitude UV, hail, and freeze-thaw age natural wood fast, and capped composite shrugs all three off with 25–50 year warranties and a soap-and-water maintenance schedule. Wood costs less on day one and looks like nothing else — if you'll genuinely re-oil it every year or two. Our materials guide has the full honest comparison.",
      },
      {
        q: "Which composite brands do you install?",
        a: "Deckorators is our go-to line — we're a Deckorators Pro Elite certified installer — plus Trex (Platinum Pro tier) and TimberTech when a specific color, grain, or budget calls for it. Those certification tiers matter beyond the badge: they unlock the longest labor-coverage warranty terms each manufacturer offers.",
      },
      {
        q: "Does composite get too hot for bare feet?",
        a: "Dark boards in full July sun do warm up — it's the honest trade-off. Lighter colors run cooler, mineral-based boards like Deckorators shed heat noticeably better than wood-flour composites, and a pergola over the hottest exposure solves it completely. We factor sun orientation into every design.",
      },
    ],
  },
  {
    name: "Timeline & process",
    faqs: [
      {
        q: "How long does a deck project take?",
        a: "Most decks take 3–10 days of on-site build time, after a 2–4 week permit and HOA window we use to order materials. Bigger builds — covered decks, multi-tier, outdoor kitchens — run 2–4 weeks on site. You get a realistic schedule in writing before you sign, and our process page walks through all six steps.",
      },
      {
        q: "When's the best time of year to build?",
        a: "Earlier than you think. We build nearly year-round in Colorado — composite doesn't need a staining-weather window — and the calendar bottleneck is paperwork, not snow. Sign in fall or winter and you're on the new deck by late spring while everyone else is still waiting on permits.",
      },
      {
        q: "Who will actually be in my yard?",
        a: "Our crew, led day-to-day by the same people you met at the estimate — and Pete, the owner, walks every project personally. You'll always know who's on site and what happens next, and you can reach us directly throughout the build.",
      },
    ],
  },
  {
    name: "Warranty & after",
    faqs: [
      {
        q: "What does your warranty cover?",
        a: "Three layers. Our 2-year written workmanship warranty covers everything about how the deck was built. The manufacturer's warranties cover the boards themselves — 25 years to lifetime on the lines we install. And in practice we've stood behind serious workmanship issues well past the written term, because our name is on the work. One call to us starts any claim; we run it end to end.",
      },
      {
        q: "What happens after the build is done?",
        a: "A final walkthrough, your closed permit and registered warranty paperwork — and then the step nobody else promises: we come back around the one-year mark, after the deck's first Colorado winter, and fix anything we don't think is perfect. Happy is the only finish line we recognize.",
      },
      {
        q: "Do you repair decks you didn't build?",
        a: "Yes. We inspect the structure the way an engineer would — ledger, footings, hangers, framing — and give you a straight written report on whether repair, re-decking over sound framing, or replacement is the honest answer. We take over half-finished DIY projects more often than you'd think, too.",
      },
    ],
  },
];

const ALL_FAQS = CATEGORIES.flatMap((c) => c.faqs);

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "FAQ", path: "/faq" }]} />
      <FaqJsonLd faqs={ALL_FAQS} />

      <Section top="loose" bottom="tight">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Every question, answered straight.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          The questions homeowners across the Denver metro actually ask us — including the one
          about our price. Do the homework. We&apos;ll wait.
        </p>
        <div className="mt-8">
          <ProofBadge />
        </div>
      </Section>

      {CATEGORIES.map((cat) => (
        <Section key={cat.name} top="none" bottom="tight">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <h2 className="font-display text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
                {cat.name}
              </h2>
            </div>
            <div className="w-full">
              {cat.faqs.map((item, i) => (
                <details key={i} className="group border-border/40 not-last:border-b">
                  <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-3 rounded-lg py-2.5 text-left text-lg font-medium tracking-tight hover:underline sm:text-xl [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDownIcon className="text-muted-foreground mt-1.5 size-4 shrink-0 group-open:hidden" />
                    <ChevronUpIcon className="text-muted-foreground mt-1.5 hidden size-4 shrink-0 group-open:inline" />
                  </summary>
                  <p className="text-muted-foreground pb-3 text-base leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section top="none" bottom="tight">
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          Deeper answers live in our{" "}
          <Link href="/deck-guides-and-tools" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
            free guides
          </Link>{" "}
          — the cost guide, the permit guide, the materials comparison, and the DIY build guide —
          plus pages on{" "}
          <Link href="/process" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
            our process
          </Link>{" "}
          and{" "}
          <Link href="/warranty" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
            our warranty
          </Link>
          . Didn&apos;t find yours?{" "}
          <Link href="/contact" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
            Ask us directly
          </Link>{" "}
          — replies within one business day.
        </p>
      </Section>

      <CtaFinal />
    </>
  );
}
