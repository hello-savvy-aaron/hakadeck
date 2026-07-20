import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { Lead, H2, P, Muted, Callout } from "@/components/guides/guide-content";
import { GuideArticleJsonLd } from "@/components/seo/guide-article-jsonld";
import { guideBySlug } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = guideBySlug("questions-to-ask-your-deck-builder")!;

const title = "10 Questions to Ask Before You Sign a Deck Contract | Haka Decks";
const description =
  "The questions that expose a weak deck bid — permits, footing specs, warranty terms, payment schedule, who's actually on site — and what a good answer sounds like. Free, ungated, printable.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

const QUESTIONS: { q: string; why: string; good: string }[] = [
  {
    q: "Can I see the bid itemized?",
    why: "A lump-sum number can't be compared to anything, and change orders have nowhere honest to land.",
    good: "Line items for plans and permits, demo, footings, framing, decking, railing, and stairs — so two bids can be compared line for line.",
  },
  {
    q: "Who pulls the permit — you or me?",
    why: "A builder who pushes the permit onto you (or suggests skipping it) is a builder whose work has never been inspected.",
    good: "“We do — drawings, submission, inspections, and corrections.” Full stop.",
  },
  {
    q: "What's the footing and framing spec?",
    why: "“Per code” with no numbers is a shrug in writing. Colorado decks need frost-depth footings and snow-load framing.",
    good: "Actual numbers: footing depth and diameter, joist size and spacing, and how the ledger will be flashed and fastened.",
  },
  {
    q: "Are you licensed and insured — and can I see it?",
    why: "If anything goes wrong on your property, the builder's general liability and workers' comp are what stand between the incident and your homeowner's policy.",
    good: "Certificates on request without flinching, naming real coverage amounts.",
  },
  {
    q: "Who is actually on my site each day?",
    why: "Some outfits sell the job and subcontract the build. You're hiring the crew, not the brochure.",
    good: "A named crew and a named point of contact — and you met them during the estimate. Pete walks every Haka project personally.",
  },
  {
    q: "What manufacturer certifications do you hold?",
    why: "Certification tiers aren't wall decoration — they unlock longer labor-coverage warranty terms from the board manufacturer, at no cost to you.",
    good: "Named tiers (ours: Deckorators Pro Elite, Trex Platinum Pro, TimberTech dealer) and an explanation of what each unlocks.",
  },
  {
    q: "What's your written workmanship warranty?",
    why: "The boards carry 25–50 year manufacturer warranties; the structure underneath only carries what the builder puts in writing.",
    good: "A term in writing (ours is 2 years), what it covers, and a straight answer about how claims have actually been handled.",
  },
  {
    q: "What's the payment schedule?",
    why: "A deposit should cover materials mobilization, not shift the job's whole risk onto you before a post is set.",
    good: "A modest deposit, payments tied to milestones, and the balance due at the final walkthrough — never half down.",
  },
  {
    q: "What's the realistic timeline — in writing?",
    why: "“We can start next week” usually means the permit hasn't been thought about. Front Range approvals run 2–4 weeks.",
    good: "A written schedule that includes the permit window, the on-site days, and what happens when weather interrupts.",
  },
  {
    q: "Can I see recent local work and talk to those homeowners?",
    why: "Photos prove taste; addresses and referrals prove the work holds up through a Colorado winter.",
    good: "Projects you can drive past, reviews you can read, and past clients who'll take your call.",
  },
];

export default function ContractChecklistPage() {
  return (
    <>
      <GuideArticleJsonLd
        title={title}
        description={description}
        path={guide.href}
        datePublished="2026-07-20"
        dateModified="2026-07-20"
      />
      <GuideLayout
        guideKey={guide.key}
        pdfHref={guide.pdf!}
        title="10 questions to ask before you sign."
        meta={`${guide.readLabel} · Updated ${guide.updated}`}
        crossLink={{ href: "/deck-cost-guide-denver", label: "Cost guide →" }}
        nextUp={{ href: "/process", label: "What working with Haka actually looks like" }}
      >
        <Lead>
          About to sign a deck contract? Good — ask these ten questions first, whoever the builder
          is. They take five minutes, they expose the weak bids fast, and any builder worth hiring
          will enjoy answering them. No email required for the PDF; do the homework, we&apos;ll
          wait.
        </Lead>

        <div className="mt-5 flex flex-col gap-5">
          {QUESTIONS.map((item, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-primary text-[15px] font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-foreground text-lg font-medium tracking-tight">
                  {item.q}
                </h2>
              </div>
              <p className="text-muted-foreground mt-1.5 ml-[26px] text-[13.5px] leading-relaxed">
                <strong className="text-foreground/80 font-semibold">Why it matters: </strong>
                {item.why}
              </p>
              <p className="text-muted-foreground mt-1 ml-[26px] text-[13.5px] leading-relaxed">
                <strong className="text-foreground/80 font-semibold">A good answer: </strong>
                {item.good}
              </p>
            </div>
          ))}
        </div>

        <H2>Why we publish this</H2>
        <P>
          Because we win every question on this list, and we&apos;d rather you ask them everywhere
          than sign somewhere that hopes you won&apos;t. Bring the printed version to every
          estimate — including ours. If you want the deeper background first, the{" "}
          <Link href="/deck-cost-guide-denver" className="text-primary font-semibold hover:underline">
            cost guide
          </Link>{" "}
          shows what an itemized bid looks like line by line, and the{" "}
          <Link href="/deck-permits-south-denver-metro" className="text-primary font-semibold hover:underline">
            permit guide
          </Link>{" "}
          covers what your city will require regardless of who builds.
        </P>
        <Muted>
          Fair disclosure: this checklist is also how we&apos;d like to be judged.{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Put us on the spot
          </Link>
          .
        </Muted>

        <Callout>
          Red-flag shorthand, if you only remember three: a lump-sum bid, &ldquo;half down,&rdquo;
          and &ldquo;you can pull the permit yourself to save money.&rdquo; Any one of them is
          your cue to keep shopping.
        </Callout>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
