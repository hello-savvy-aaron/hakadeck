import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { Chip, GuideRow } from "@/components/guides/guide-bits";
import { NewsletterSignup } from "@/components/guides/newsletter-signup";
import { costGuide, guides, GUIDES_HUB } from "@/lib/guides";
import { site } from "@/lib/site";

const title = "Free Deck Guides & Tools — Denver Metro | Haka Decks";
const description =
  "The same references we use on real builds — free, no email required. Deck cost guide, composite vs. hardwood, permits & code, a DIY checklist, and a project gallery.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: GUIDES_HUB },
  openGraph: { title, description, url: `${site.url}${GUIDES_HUB}` },
};

export default function GuidesHubPage() {
  return (
    <>
      <div className="mx-auto max-w-[42.5rem] px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.08em] uppercase">
          Free Guides &amp; Tools
        </p>
        <h1 className="font-display text-foreground mt-2.5 text-[2.125rem] leading-[1.15] font-medium tracking-tight text-balance">
          Do the homework. <span className="text-primary">We&apos;ll wait.</span>
        </h1>
        <p className="text-foreground/85 mt-3 max-w-[33rem] text-[15px] leading-relaxed">
          The same references we use on real builds — free, no email required. Read up on cost,
          materials, and permits, or grab the DIY checklist.
        </p>

        {/* Featured — the cost guide */}
        <p className="text-muted-foreground mt-9 mb-3.5 text-[13px] font-semibold tracking-[0.06em] uppercase">
          Featured
        </p>
        <Link
          href={costGuide.href}
          className="border-border bg-secondary group block rounded-[14px] border p-6"
        >
          <div className="mb-2 flex items-center justify-between gap-2.5">
            <h2 className="font-display text-foreground text-[1.375rem] font-medium tracking-tight">
              {costGuide.hubTitle}
            </h2>
            <Chip tone="bright">GUIDE · PDF</Chip>
          </div>
          <p className="text-foreground/85 mb-3.5 text-sm leading-relaxed">
            Material prices, what installation really adds (50–100% on top), and installed ranges by
            deck size — the honest math behind every bid.
          </p>
          <span className="bg-primary group-hover:bg-primary/85 inline-block rounded-[10px] px-5 py-3 text-sm font-semibold text-white transition-colors">
            Read the cost guide →
          </span>
        </Link>

        {/* Guides list */}
        <p className="text-muted-foreground mt-9 mb-1.5 text-[13px] font-semibold tracking-[0.06em] uppercase">
          Guides
        </p>
        <div className="flex flex-col">
          {guides.map((g, i) => (
            <GuideRow
              key={g.key}
              number={g.number}
              title={g.hubTitle}
              blurb={g.hubBlurb}
              chip={g.chip}
              href={g.href}
              last={i === guides.length - 1}
            />
          ))}
        </div>

        <NewsletterSignup />

        <p className="text-muted-foreground mt-10 text-xs leading-relaxed">
          Haka Decks · Centennial, CO · Serving the south Denver metro since 2017 · 250+ projects ·
          90+ five-star reviews
        </p>
      </div>

      <CtaFinal />
    </>
  );
}
