import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/faqs";

const title = "Deck Financing in Colorado — The Honest Options | Haka Decks";
const description =
  "How Denver-metro homeowners actually pay for a $15k–$50k deck: HELOCs, home equity loans, personal loans, phased builds, and cash — with the honest trade-offs of each and no pressure toward any of them.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/financing" },
  openGraph: { title, description, url: `${site.url}/financing` },
};

// Rendered below AND fed to FaqJsonLd — schema must match visible copy.
const FAQS: Faq[] = [
  {
    q: "Does Haka Decks offer in-house financing?",
    a: "Not currently — and that's deliberate. Contractor-arranged financing in home improvement often carries promotional terms that don't survive comparison with your own bank, and we'd rather compete on the deck than on the loan. What we do provide is an itemized, fixed quote you can take to any lender, and honest guidance on which routes tend to fit which project sizes.",
  },
  {
    q: "What credit options work best for a deck project?",
    a: "For most Denver-metro homeowners it comes down to home equity — a HELOC or home equity loan — because rates run well below unsecured borrowing and Front Range homes tend to carry real equity. Personal home-improvement loans make sense for smaller projects where speed matters more than rate. And phasing the project — deck now, cover later, designed for it from day one — is the option people overlook most.",
  },
  {
    q: "Can I get a quote before talking to a lender?",
    a: "That's exactly the right order. Lenders want a number, and a guess isn't one. Our free on-site consultation produces an itemized written quote — every line visible, fixed scope — that you can hand directly to a bank or credit union. The cost calculator on our site gets you a planning range even earlier, in about thirty seconds.",
  },
];

const OPTIONS = [
  {
    title: "Home equity line of credit",
    tag: "Most common",
    body: "Borrow against your equity as needed, typically at rates well below personal loans — and Front Range homeowners tend to have real equity to work with. The trade-off: your house secures the debt, and variable rates can move.",
  },
  {
    title: "Home equity loan",
    tag: "Fixed & predictable",
    body: "A fixed lump sum at a fixed rate. Suits a deck well because our itemized quote tells you the cost before you borrow — you're not guessing at a number.",
  },
  {
    title: "Personal / home-improvement loan",
    tag: "Fast, unsecured",
    body: "No lien on the house and quick to arrange, priced accordingly with higher rates and shorter terms. Reasonable for smaller totals — a re-deck, a pergola addition — where speed matters.",
  },
  {
    title: "Phase the project",
    tag: "The quiet favorite",
    body: "Deck this year, cover or kitchen next. We design for the later phases up front — footings and framing placed so the pergola can land on them — which beats both retrofitting and financing the whole vision at once.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Financing", path: "/financing" }]} />
      <FaqJsonLd faqs={FAQS} />

      <Section top="loose" bottom="tight">
        <Eyebrow>Paying for it</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Financing a deck, without the sales pitch.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          A quality composite deck in the Denver metro runs $15,000–$50,000+, and most homeowners
          don&apos;t pay that from a checking account. Here are the routes Colorado homeowners
          actually take — wherever in the metro you are, the options and the math are the same.
          One thing up front: we build decks, we don&apos;t give financial advice — treat this as
          a map, and talk to your bank about which route fits your situation.
        </p>
      </Section>

      <Section top="tight" bottom="tight">
        <ul className="grid gap-6 sm:grid-cols-2">
          {OPTIONS.map((o) => (
            <li key={o.title} className="border-border/40 bg-card/40 rounded-2xl border p-7">
              <span className="text-muted-foreground text-xs tracking-widest uppercase">
                {o.tag}
              </span>
              <h2 className="font-display mt-2 text-xl font-medium tracking-tight">{o.title}</h2>
              <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">{o.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Worth borrowing for?</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              Two honest points before you decide.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              First, decks hold resale value well — cost-vs-value studies consistently put deck
              additions among the stronger outdoor returns, and in Colorado&apos;s outdoor-living
              market a quality composite build reads as a straight asset. Second, the cheap deck
              is often the expensive one: a builder-grade deck that needs replacing in twelve
              years costs more per year of service than an engineered build that runs thirty. If
              borrowing is the difference between building once and building twice, the math can
              genuinely favor borrowing — run it for your own numbers.
            </p>
            <p>
              Whatever the route, start with a real figure instead of a guess. The{" "}
              <Link href="/deck-cost-calculator" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                cost calculator
              </Link>{" "}
              gives you a 2026 planning range in thirty seconds, our{" "}
              <Link href="/blog/deck-financing-options-colorado" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                full financing guide
              </Link>{" "}
              goes deeper on every option above (including the fine print on contractor-arranged
              &ldquo;same-as-cash&rdquo; offers), and a free on-site consultation turns the range
              into an itemized quote you can actually take to a lender.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href={site.cta.href}>
              Get the itemized number first
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section top="none" bottom="tight">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="font-display text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
              Financing questions, answered straight.
            </h2>
          </div>
          <div className="w-full">
            {FAQS.map((item, i) => (
              <details key={i} className="group border-border/40 not-last:border-b">
                <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-3 rounded-lg py-2.5 text-left text-lg font-medium tracking-tight hover:underline sm:text-xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                </summary>
                <p className="text-muted-foreground pb-3 text-base leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
