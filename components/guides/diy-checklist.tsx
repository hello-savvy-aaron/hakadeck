"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// The interactive body of the DIY checklist guide. Each item is a tappable row
// (≥44px hit target) that toggles a check; state is client-side only, as the
// design specifies. Every step carries a `detail` line — the actual how-to —
// rendered under the label so the page works as real instructions, not just
// a task list. Static reference tables (spans, materials, tools) live in the
// server page around this component.
type Item = { text: string; detail: string };

const PHASES: { title: string; intro?: string; items: Item[] }[] = [
  {
    title: "Plan & budget",
    intro:
      "An hour of drawing saves a weekend of re-digging. Decide everything on paper first — the lumberyard and the permit office both work from this sketch.",
    items: [
      {
        text: "Measure the space and sketch the footprint to scale",
        detail:
          "Graph paper, 1 square = 1 ft. Size the deck in even 2-ft steps (12×16, 16×20) so it matches stock lumber lengths — a 13-ft joist means buying 14-footers and throwing a foot of each away.",
      },
      {
        text: "Decide attached (ledger) or freestanding",
        detail:
          "Attached decks borrow the house for support and need a proper ledger connection. Freestanding decks add one more beam and row of footings but skip flashing into the wall — often the smarter DIY move on brick, stucco, or cantilevered floors, where a safe ledger attachment gets complicated fast.",
      },
      {
        text: "Pick decking material and railing style",
        detail:
          "Wood is cheaper on day one and wants re-staining every year or two at altitude; capped composite costs more and wants soap and water. Grooved-edge composite lets you use hidden fasteners. Pick the railing now too — it changes post layout and blocking.",
      },
      {
        text: "Plan board direction and joist layout together",
        detail:
          "Deck boards usually run parallel to the house, joists perpendicular to the boards. Boards longer than 16–20 ft need a butt joint over doubled joists — plan a pattern or a center breaker board rather than random seams.",
      },
      {
        text: "Get HOA approval if you have one",
        detail:
          "Most south-metro HOAs want a site plan, elevation sketch, and material/color specs before the city sees anything. Review cycles run on committee meeting schedules — submit before you buy anything.",
      },
      {
        text: "Price it out — then add 15% contingency",
        detail:
          "Run the numbers with our cost guide or estimator for a ballpark. DIY materials typically land at 40–50% of a professional bid, and every first build eats extra hardware, blades, and at least one re-bought board.",
      },
    ],
  },
  {
    title: "Permit",
    intro:
      "On the Front Range essentially every deck over 30 inches needs a permit, and many towns permit lower ones too. The drawings below are what the counter actually asks for.",
    items: [
      {
        text: "Draw the site plan with setbacks",
        detail:
          "Bird's-eye view: property lines, easements, the house, and the deck with distances to each lot line. Your plat map (in your closing documents, or the county assessor's site) has the measurements.",
      },
      {
        text: "Draw the framing plan — footings, beams, joists, ledger",
        detail:
          "Show footing locations and diameter, post sizes, beam makeup (e.g. two 2×10s), joist size and spacing, ledger attachment, and guard height. The span table below this checklist covers the sizes most 1–2 ft decks use.",
      },
      {
        text: "Submit and wait for approval before buying lumber",
        detail:
          "South-metro reviews run days to a few weeks depending on season — spring is slowest. The reviewer may red-line footing sizes or hardware; buying materials first means buying some of them twice.",
      },
      {
        text: "Post the permit card where inspectors can see it",
        detail:
          "Front window or garage door. Know your jurisdiction's inspection list — typically footing holes, rough framing, and final — and how much notice each needs.",
      },
    ],
  },
  {
    title: "Footings & posts",
    intro:
      "Everything above grade is carpentry; this phase is the engineering. Get the holes right and the deck never moves.",
    items: [
      {
        text: "Call 811 for utility locates",
        detail:
          "Free, legally required, and takes 2–3 business days — call before you rent the auger. Locators paint gas, electric, and comm lines; hand-dig anywhere within 18 inches of a mark.",
      },
      {
        text: "Lay out post centers with batter boards and string",
        detail:
          "String the deck's outside edges, then check square with the 3-4-5 triangle (measure 3 ft down one string, 4 ft down the other — the diagonal between marks is exactly 5 ft when square). Confirm by measuring both diagonals of the footprint: equal means square.",
      },
      {
        text: "Dig footings below frost line — 30–36\" on the Front Range",
        detail:
          "Your permit states the required depth and diameter; 10–12 in. diameter is typical for a single-story deck. Rent a two-person auger for more than a couple of holes. Keep the bottom of the hole undisturbed soil — loose backfill under concrete settles.",
      },
      {
        text: "Pass the footing inspection BEFORE pouring concrete",
        detail:
          "The inspector looks at open holes: depth, diameter, soil. Pour first and you may be digging them out again. Schedule the pour for the same day as the pass so holes don't collect water or cave.",
      },
      {
        text: "Pour concrete and set post bases",
        detail:
          "A 12-in. × 36-in. hole takes roughly four 80-lb bags. Crown the top slightly above grade so water sheds away. Set galvanized post-base brackets in the wet concrete (or epoxy anchors later) — never bury a wood post in concrete, even pressure-treated.",
      },
      {
        text: "Set 6×6 posts plumb, braced in two directions",
        detail:
          "Cut long, brace with scrap 2×4s to stakes, and check plumb on two faces. You'll cut them to final height off a level line once the beam layout is set — much more accurate than trying to pre-cut.",
      },
    ],
  },
  {
    title: "Framing",
    intro:
      "The ledger is the connection most collapsed decks failed at. Slow down here; everything else in this phase is repetition.",
    items: [
      {
        text: "Flash and bolt the ledger — most deck failures start here",
        detail:
          "Remove siding to expose the rim joist, run self-adhering membrane plus metal flashing that tucks UNDER the house wrap and OVER the ledger, then fasten with ½-in. structural screws (LedgerLOK / Simpson SDWS) staggered top and bottom roughly every 16 in., into the rim joist — never just the sheathing, and never through brick veneer. No nails, no deck screws.",
      },
      {
        text: "Set the beam in post caps, crown up",
        detail:
          "Build the beam from doubled 2x lumber per your plans, sight down it and put the crown (the slight bow) up, and set it in galvanized post-cap brackets. Cut posts to height off a laser or string line level with the ledger, minus the joist depth if joists sit on top.",
      },
      {
        text: "Hang joists 16\" on center, crowns up",
        detail:
          "Mark the layout on ledger and beam at the same end so joists run parallel. Joist hangers on the ledger side, every hanger hole filled with proper hanger nails — not screws unless they're rated structural. Crown every joist up; it flattens under decking.",
      },
      {
        text: "Add blocking and the rim joist",
        detail:
          "A row of blocking at mid-span stops joists from twisting and stiffens the whole floor. Cap joist ends with the rim, check the frame is square one last time, and add extra blocking wherever railing posts will bolt.",
      },
      {
        text: "Cut and hang stair stringers",
        detail:
          "Total rise ÷ number of steps = riser height, max 7¾ in., treads 10 in. minimum. Cut from 2×12s; use three stringers for a 36-in. stair with wood treads, and 12-in. spacing for composite treads, which flex more. The bottom lands on concrete, not dirt.",
      },
      {
        text: "Pass the rough framing inspection",
        detail:
          "Before one deck board goes down — the inspector needs to see the ledger, hangers, and hardware, and decking hides all of it. This is the inspection DIYers most often fail; the fix list is almost always hardware, not lumber.",
      },
    ],
  },
  {
    title: "Decking & railing",
    intro:
      "The visible 20% of the project. Composite and wood behave differently here — read the manufacturer's install sheet; the warranty depends on following it.",
    items: [
      {
        text: "Run the first board straight and square",
        detail:
          "Snap a chalk line — don't trust the house wall to be straight. Every other board references this one. Leave the manufacturer's specified gap at the wall for drainage and movement.",
      },
      {
        text: "Fasten with consistent gaps",
        detail:
          "Grooved composite: hidden fastener clips, one per joist. Wood: two screws per joist, pre-drilled near board ends, ⅛-in. side gaps. Composite end-to-end gaps depend on the temperature the day you install — the install sheet has the chart. Cold day, bigger gap.",
      },
      {
        text: "Bolt railing posts through the rim with carriage bolts",
        detail:
          "Two ½-in. through-bolts per post with blocking behind the rim — lag screws alone work loose and a guard post has to take a real shove. Guards 36 in. minimum in Colorado, no opening a 4-in. sphere can pass through.",
      },
      {
        text: "Install railing panels, then the stair rail",
        detail:
          "Stairs need a graspable handrail 34–38 in. above the tread nosings, continuous for the full run — a 2×6 laid flat doesn't qualify; a round or shaped profile does. The guard-to-stair-rail transition is the fussiest joint of the whole build.",
      },
      {
        text: "Trim fascia and skirting",
        detail:
          "Fascia covers the rim; leave ventilation gaps if you skirt the underside — composite especially wants airflow underneath. A gravel strip under the deck beats landscape fabric alone for keeping the weeds down.",
      },
    ],
  },
  {
    title: "Finish",
    intro: "The victory lap — one inspection and one patience test.",
    items: [
      {
        text: "Pass the final inspection",
        detail:
          "The inspector checks guard heights, baluster spacing, stair geometry, and the handrail. Pass, and the permit closes — keep the paperwork; the next buyer's inspector will ask for it.",
      },
      {
        text: "Wood only: wait, then seal",
        detail:
          "New pressure-treated lumber is too wet to take stain — wait 4–8 weeks until water stops beading on the surface, then apply a penetrating oil or stain. Composite needs nothing, ever. That was the point.",
      },
      {
        text: "Furniture, lights, first barbecue",
        detail: "You earned it. Send us a photo — genuinely, we love seeing these.",
      },
    ],
  },
];

export function DiyChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <div className="mt-5 flex flex-col gap-6">
      {PHASES.map(({ title, intro, items }, pi) => (
        <div key={title}>
          <div className="mb-1.5 flex items-baseline gap-2.5">
            <span className="font-display text-primary text-[15px] font-semibold">
              {String(pi + 1).padStart(2, "0")}
            </span>
            <h2 className="font-display text-foreground text-xl font-medium tracking-tight">
              {title}
            </h2>
          </div>
          {intro ? (
            <p className="text-muted-foreground mb-2.5 ml-[26px] text-[13.5px] leading-relaxed">
              {intro}
            </p>
          ) : null}
          <ul className="flex flex-col gap-1.5">
            {items.map(({ text, detail }, ii) => {
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
                    <span className="flex-1">
                      <span
                        className={cn(
                          "text-foreground block text-[14.5px] leading-[1.5] font-medium",
                          on && "text-foreground/60",
                        )}
                      >
                        {text}
                      </span>
                      <span
                        className={cn(
                          "text-muted-foreground mt-0.5 block text-[13px] leading-[1.55]",
                          on && "text-muted-foreground/60",
                        )}
                      >
                        {detail}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
