import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./section";

// Seasonal band (fall/winter 2026): routes the small-jobs pipeline — repairs,
// railings, covers, small decks — that the Q4 marketing push books. Sits
// directly under the hero. Swap the copy (or remove the band) when the spring
// full-build season returns.
const JOBS = [
  { label: "Deck repairs", href: "/services/deck-repair" },
  { label: "Railing replacement", href: "/services/railings" },
  { label: "Covers & pergolas", href: "/services/pergolas-patio-covers" },
  { label: "Small & ground-level decks", href: "/small-deck-builder-denver" },
];

export function SeasonBand() {
  return (
    <section aria-label="Seasonal projects" className="bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:py-12">
        <div className="max-w-md shrink-0">
          <Eyebrow>This season</Eyebrow>
          <h2 className="font-display mt-3 text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
            Fall &amp; winter is small-project season.
          </h2>
          <p className="text-foreground/75 mt-3 text-sm leading-relaxed sm:text-base">
            Repairs, railings, and covers are one-to-two-week jobs that fit between storms — and
            this is when the calendar has the most room. On the deck by the first warm weekend.
          </p>
        </div>
        <ul className="grid w-full gap-3 sm:grid-cols-2">
          {JOBS.map((job) => (
            <li key={job.href}>
              <Link
                href={job.href}
                className="border-border/50 bg-card hover:border-foreground/30 group flex h-full items-center justify-between gap-3 rounded-xl border px-5 py-4 transition-colors"
              >
                <span className="font-display text-base font-medium tracking-tight sm:text-lg">
                  {job.label}
                </span>
                <ArrowRight className="text-foreground/60 group-hover:text-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
