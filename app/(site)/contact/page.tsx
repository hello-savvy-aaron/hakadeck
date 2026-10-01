import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Eyebrow, Section } from "@/components/sections/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote — Free Deck Estimates in Denver",
  description:
    "Get a free deck estimate from Haka Decks, a deck builder in the Denver Tech Center — call, or leave a number or email and we'll get back to you with an honest, itemized quote.",
  alternates: { canonical: "/contact" },
};

// The form is the page; everything under it answers the questions people
// have before they fill it in (what happens next, what to have ready, where
// and when we work). It also keeps this page from reading as a bare form to
// crawlers — Semrush flagged it for word count with the form alone.
const STEPS = [
  {
    title: "We call or text back",
    body: "to hear what you have in mind — a rough idea is plenty — and set a time to come out.",
  },
  {
    title: "A free site visit",
    body: "Pete walks the yard with you, measures, checks the house connection and the grade, and talks through materials, levels, railing and shade.",
  },
  {
    title: "An itemized estimate, in writing",
    body: "structure, surface, railing, roof and permits as separate lines, so you can compare it with any other bid line by line. No pressure, no sales pitch.",
  },
];

const BRING = [
  "A photo or two of the space — the form takes up to three.",
  "A rough size, or the footprint of the deck that is there now.",
  "Whether a cover, pergola, stairs or an outdoor kitchen is on the list.",
  "Your HOA, if you have one. We prepare the architectural submittal.",
];

const QUESTIONS = [
  {
    q: "Is the estimate really free?",
    a: "Yes. The site visit and the written estimate are free anywhere in our service area, with no obligation.",
  },
  {
    q: "How soon can you start?",
    a: "Repairs, railings and covers are one-to-two-week jobs that fit between storms, and fall and winter are when the calendar has the most room. Full builds book further out, especially for spring. Tell us your timing and we'll be straight about ours.",
  },
  {
    q: "Do you build in winter?",
    a: "Yes. Footings and framing go in year-round along the Front Range; composite decking just wants a stretch above freezing for installation. Our winter-build guide covers what changes and what doesn't.",
    href: "/blog/can-you-build-a-deck-in-winter-colorado",
    linkLabel: "Building a deck in winter in Colorado",
  },
];

export default function ContactPage() {
  const { address, hours } = site;
  return (
    <>
      <Section top="loose" bottom="tight">
        <div className="mx-auto max-w-[540px]">
          <Eyebrow className="mb-3.5">Get a quote</Eyebrow>
          <h1 className="font-display text-foreground text-[52px] leading-[1.02] font-medium tracking-tight text-balance">
            Get in touch.
          </h1>
          <p className="text-foreground/70 mt-4 mb-7 text-lg leading-relaxed">
            Call now, or leave your number and we&apos;ll get back to you — free on-site deck
            estimates across the Denver metro.
          </p>

          <ContactForm />

          <p className="text-muted-foreground mt-6 text-center text-sm">
            Serving anywhere within an hour of Denver or Colorado Springs · Prefer email?{" "}
            <a href={site.emailHref} className="text-foreground font-medium">
              {site.email}
            </a>
          </p>
        </div>
      </Section>

      <Section top="tight" bottom="loose">
        <div className="border-border/40 mx-auto max-w-5xl border-t pt-12 sm:pt-14">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            <div>
              <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                What happens next
              </h2>
              <ol className="mt-5 space-y-4">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-3 text-sm leading-relaxed">
                    <span className="font-display text-haka-pine w-5 shrink-0 text-base font-medium tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground font-medium">{step.title}</strong>{" "}
                      {step.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                Before you reach out
              </h2>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                Nothing is required, but a few things make the first call more useful:
              </p>
              <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {BRING.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Want a number before we talk? The{" "}
                <Link
                  href="/deck-cost-guide-denver"
                  className="text-foreground font-medium underline underline-offset-4"
                >
                  deck cost guide
                </Link>{" "}
                and the{" "}
                <Link
                  href="/deck-cost-calculator"
                  className="text-foreground font-medium underline underline-offset-4"
                >
                  cost calculator
                </Link>{" "}
                give a planning range in a few minutes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                Where and when
              </h2>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                We build {site.serviceArea}. Our shop is at {address.street}, {address.city},{" "}
                {address.state} {address.zip}, in the {address.district} —{" "}
                <Link
                  href="/locations"
                  className="text-foreground font-medium underline underline-offset-4"
                >
                  see every town we serve
                </Link>
                .
              </p>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {hours.display.map((h) => (
                  <div key={h.label} className="text-muted-foreground contents">
                    <dt className="whitespace-nowrap">{h.label}</dt>
                    <dd className="text-foreground/80 whitespace-nowrap tabular-nums">{h.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Call{" "}
                <a href={site.phoneHref} className="text-foreground font-medium">
                  {site.phone}
                </a>{" "}
                during those hours, or leave a message any time and we&apos;ll return it on the next
                business day.
              </p>
            </div>
          </div>

          <div className="border-border/40 mt-12 grid gap-8 border-t pt-10 sm:grid-cols-3">
            {QUESTIONS.map((item) => (
              <div key={item.q}>
                <h3 className="font-display text-lg font-medium tracking-tight">{item.q}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.a}</p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-foreground mt-2 inline-block text-sm font-medium underline underline-offset-4"
                  >
                    {item.linkLabel}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
