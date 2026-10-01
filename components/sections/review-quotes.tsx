import Link from "next/link";
import { Icon } from "@/components/icons/icon";
import { Section } from "./section";
import { quotesFor } from "@/lib/reviews";
import { site } from "@/lib/site";

// Compact proof strip for the sitewide badge: "5.0★ · 89 Google reviews ·
// 250+ decks built". Links out to the Google profile — the rating claim
// always resolves to its third-party source.
export function ProofBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.reviewsUrl}
      target="_blank"
      rel="noreferrer"
      className={`border-border/50 bg-card/60 text-foreground/85 hover:border-foreground/30 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] transition-colors ${className}`}
    >
      <span className="font-semibold">{site.rating.value.toFixed(1)}</span>
      <Icon name="star" className="text-haka-gold h-3.5 w-3.5 fill-current" aria-hidden />
      <span>· {site.rating.count} Google reviews · 250+ decks built</span>
    </a>
  );
}

// Two real review pull-quotes (server-rendered text, crawlable) + the proof
// badge, for service and location pages. `seed` (usually the page slug)
// picks a stable pair so pages don't all repeat the same quotes.
export function ReviewQuotes({ seed }: { seed: string }) {
  const quotes = quotesFor(seed);
  return (
    <Section top="none" bottom="tight">
      <div className="grid gap-6 lg:grid-cols-2">
        {quotes.map((q) => (
          <figure key={q.name} className="hub-card">
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon name="star" key={i} className="star-gold" />
              ))}
            </div>
            <blockquote className="text-foreground/90 mt-4 flex-1 text-base leading-relaxed">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="text-muted-foreground mt-4 text-sm">
              {q.name} · Google review
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <ProofBadge />
        <Link
          href="/warranty"
          className="border-border/50 bg-card/60 text-foreground/85 hover:border-foreground/30 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] transition-colors"
        >
          <Icon name="shield-check" className="text-haka-cream h-3.5 w-3.5" aria-hidden />
          Everything we build is guaranteed
        </Link>
      </div>
    </Section>
  );
}
