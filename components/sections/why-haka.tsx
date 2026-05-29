import { Eyebrow, Section } from "./section";

const POINTS = [
  {
    title: "Composite-first, by design.",
    body:
      "We default to Deckorators because it holds up to Colorado weather better than anything else on the market — and we pass the manufacturer's 25-year warranty straight through to you.",
  },
  {
    title: "Engineered for altitude, freeze-thaw, and hail.",
    body:
      "Our framing details and fastener choices are tuned for what actually breaks decks in Colorado. We've seen what fails after ten winters, and we build to outlast it.",
  },
  {
    title: "One conversation, one team.",
    body:
      "Pete walks every project from the first quote to the final walkthrough. You won't get bounced between a salesperson, a project manager, and a crew that's never met you.",
  },
];

export function WhyHaka() {
  return (
    <Section id="why-haka" className="bg-haka-sky">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Eyebrow>Why Denver chooses Haka</Eyebrow>
          <h2 className="font-display mt-4 text-balance text-4xl leading-[1.04] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            We don&apos;t do cookie-cutter.
          </h2>
        </div>
        <ul className="space-y-10">
          {POINTS.map((p, i) => (
            <li key={p.title} className="border-border/40 border-t pt-8">
              <div className="text-foreground/50 text-sm tracking-[0.18em] uppercase tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display mt-3 text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
                {p.title}
              </h3>
              <p className="text-foreground/75 mt-3 max-w-2xl text-base leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
