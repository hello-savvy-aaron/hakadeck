"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Lead, Callout } from "@/components/guides/guide-content";
import { cn } from "@/lib/utils";

// The interactive body of the DIY checklist guide. Each item is a tappable row
// (≥44px hit target) that toggles a check; state is client-side only, as the
// design specifies. Sits inside the guide card.
const PHASES: [string, string[]][] = [
  [
    "Plan & budget",
    [
      "Measure the space and sketch the footprint",
      "Pick decking material and railing style",
      "Price it out (use our estimator for a ballpark)",
      "Get HOA approval if you have one",
    ],
  ],
  [
    "Permit",
    [
      "Draw the site plan with setbacks",
      "Draw the framing plan — footings, beams, joists, ledger",
      "Submit to your city; wait for approval before buying lumber",
      "Post the permit where inspectors can see it",
    ],
  ],
  [
    "Footings & posts",
    [
      "Call 811 utility locates (free, required, 2–3 business days)",
      "Lay out post locations with batter boards and string",
      'Dig footings below frost line — 30–36" on the Front Range',
      "Pass the footing inspection BEFORE pouring concrete",
      "Set posts plumb and brace them",
    ],
  ],
  [
    "Framing",
    [
      "Flash and bolt the ledger — most deck failures start here",
      'Set beams and hang joists (16" on center, typically)',
      "Block between joists; add stair stringers",
      "Pass the rough framing inspection",
    ],
  ],
  [
    "Decking & railing",
    [
      "Run deck boards with consistent gaps (hidden fasteners for composite)",
      'Install railing posts, then panels — 36" min height, gaps under 4"',
      "Build stair treads and handrail",
      "Trim fascia and skirting",
    ],
  ],
  [
    "Finish",
    [
      "Pass final inspection",
      "Seal or oil (wood only) once boards dry out",
      "Furniture, lights, first barbecue",
    ],
  ],
];

export function DiyChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <>
      <Lead>
        Building it yourself? Respect. This is the order we run every job in — skip a step and it
        usually costs a weekend (or an inspection). Tap the boxes as you go; download the PDF for the
        garage wall.
      </Lead>

      <div className="mt-5 flex flex-col gap-5">
        {PHASES.map(([title, items], pi) => (
          <div key={title}>
            <div className="mb-2.5 flex items-baseline gap-2.5">
              <span className="font-display text-primary text-[15px] font-semibold">
                {String(pi + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-foreground text-xl font-medium tracking-tight">
                {title}
              </h2>
            </div>
            <ul className="flex flex-col gap-1">
              {items.map((text, ii) => {
                const key = `${pi}-${ii}`;
                const on = !!done[key];
                return (
                  <li key={key}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setDone((d) => ({ ...d, [key]: !d[key] }))}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                        on ? "bg-haka-smoke" : "hover:bg-haka-smoke/60",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-px grid h-[22px] w-[22px] flex-none place-items-center rounded-md transition-colors",
                          on
                            ? "bg-primary text-primary-foreground"
                            : "border-foreground/30 border-[1.5px]",
                        )}
                      >
                        {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                      </span>
                      <span className="text-foreground flex-1 text-[14.5px] leading-[1.5]">
                        {text}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Callout>
          In over your head at any step? No judgment — we take over half-finished decks more often
          than you&apos;d think. The framing inspection is the usual breaking point.
        </Callout>
      </div>
    </>
  );
}
