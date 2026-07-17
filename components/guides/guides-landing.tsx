import Link from "next/link";
import { Chip, GuideRow } from "@/components/guides/guide-bits";
import { costGuide, guides, GUIDES_HUB } from "@/lib/guides";

// Homepage "Free Guides & Tools" section — sits below the hero. White band on
// the smoke page, 1080px column, header row + two-column grid (featured cost
// card / guides list). Stacks to a single column on mobile, card first.
const PRICE_ROWS = [
  { label: "12×16 composite, installed", value: "$8k – $13k" },
  { label: "16×20 composite, installed", value: "$13k – $25k" },
  { label: "20×24 composite, installed", value: "$19k – $37k" },
];

// The three downloadable guides (the gallery lives on the hub, linked below).
const LANDING_GUIDES = guides.filter((g) => g.chip === "GUIDE · PDF");

export function GuidesLanding() {
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[600px]">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.08em] uppercase">
              Free Guides &amp; Tools
            </p>
            <h2 className="font-display text-foreground mt-2.5 text-3xl leading-[1.13] font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.625rem]">
              Do the homework. <span className="text-primary">We&apos;ll wait.</span>
            </h2>
          </div>
          <Link
            href={GUIDES_HUB}
            className="text-foreground border-primary hover:text-haka-pine border-b-2 pb-0.5 text-sm font-semibold whitespace-nowrap"
          >
            All guides &amp; tools →
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:gap-14">
          {/* Featured cost card */}
          <div className="bg-secondary flex flex-col gap-4 rounded-[14px] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2.5">
              <h3 className="font-display text-foreground text-[1.375rem] font-medium tracking-tight">
                {costGuide.landingTitle}
              </h3>
              <Chip tone="bright">GUIDE · PDF</Chip>
            </div>
            <p className="text-foreground/85 text-[14.5px] leading-relaxed">
              Most online numbers are materials only — real bids land at roughly double. Our cost
              guide shows the honest math: material prices, what installation adds, and what each
              deck size actually runs installed.
            </p>
            <div className="bg-card flex flex-col gap-2 rounded-[10px] px-4 py-4">
              {PRICE_ROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={
                    i === 0
                      ? "flex justify-between text-sm"
                      : "border-border/60 flex justify-between border-t pt-2 text-sm"
                  }
                >
                  <span className="text-muted-foreground">{r.label}</span>
                  <b className="text-foreground font-semibold whitespace-nowrap">{r.value}</b>
                </div>
              ))}
            </div>
            <Link
              href={costGuide.href}
              className="bg-primary hover:bg-primary/85 rounded-[10px] px-4 py-3.5 text-center text-[15px] font-semibold text-white transition-colors"
            >
              Read the cost guide →
            </Link>
            <p className="text-muted-foreground text-center text-xs">
              Free PDF included. No email needed.
            </p>
          </div>

          {/* Guides list */}
          <div className="flex flex-col">
            {LANDING_GUIDES.map((g, i) => (
              <GuideRow
                key={g.key}
                number={g.number}
                title={g.landingTitle}
                blurb={g.landingBlurb}
                chip={g.chip}
                href={g.href}
                last={i === LANDING_GUIDES.length - 1}
              />
            ))}
            <p className="text-muted-foreground pt-4 text-[13px] leading-relaxed">
              + more on the{" "}
              <Link href={GUIDES_HUB} className="text-primary hover:text-haka-pine font-semibold">
                resources page
              </Link>
              , including the{" "}
              <Link
                href="/deck-design-ideas-colorado"
                className="text-primary hover:text-haka-pine font-semibold"
              >
                design idea gallery
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
