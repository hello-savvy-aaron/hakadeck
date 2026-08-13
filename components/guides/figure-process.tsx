import { FIG, Figure } from "@/components/guides/figure";
import { cn } from "@/lib/utils";

// Process & comparison figures for the guides — see figure.tsx for the
// shared conventions.

// ---------------------------------------------------------------------------
// Permit timeline — the four steps from the permits guide laid on a clock,
// so the "why does this take a month" question answers itself.
// Used on /deck-permits-south-denver-metro.
// ---------------------------------------------------------------------------
const STATIONS: { title: string; sub: string }[] = [
  { title: "Site & framing plans", sub: "setbacks · spans · footings" },
  { title: "HOA sign-off", sub: "before the city sees it" },
  { title: "City review", sub: "1–3 weeks · $150–500" },
  { title: "Build + inspections", sub: "footings · framing · final" },
  { title: "Final sign-off", sub: "the deck is legal" },
];

export function PermitTimelineFigure() {
  const xs = [70, 195, 320, 445, 565];
  const Y = 58;

  return (
    <Figure
      caption={
        <>
          The whole run, drawings to sign-off. The waits stack in the middle — HOA review and the
          city&apos;s 1–3 weeks happen before anything gets dug, which is why &quot;we can start
          next week&quot; usually means the permit hasn&apos;t been thought about.
        </>
      }
    >
      <svg
        viewBox="0 0 620 130"
        role="img"
        aria-label="Timeline of the deck permit process in five steps: site and framing plans, HOA sign-off, city review taking one to three weeks and $150 to $500, the build with footing, framing, and final inspections, then final sign-off."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <line x1={30} y1={Y} x2={596} y2={Y} stroke={FIG.teal} strokeWidth="2" />
        <path d={`M 590 ${Y - 5} L 600 ${Y} L 590 ${Y + 5}`} fill="none" stroke={FIG.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {STATIONS.map((s, i) => (
          <g key={s.title}>
            <circle cx={xs[i]} cy={Y} r={14} fill={FIG.pine} />
            <text x={xs[i]} y={Y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">
              {i + 1}
            </text>
            <text x={xs[i]} y={Y + 36} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={FIG.ink}>
              {s.title}
            </text>
            <text x={xs[i]} y={Y + 52} textAnchor="middle" fontSize="10.5" fill={FIG.muted}>
              {s.sub}
            </text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

// ---------------------------------------------------------------------------
// The same job, quoted two ways — a lump-sum bid next to an itemized one.
// The line items are the real-bid example from the cost guide. HTML, not SVG:
// it's typography. Used on /questions-to-ask-your-deck-builder.
// ---------------------------------------------------------------------------
const BID_LINES: [string, string][] = [
  ["Plans, permit & HOA", "$900"],
  ["Demo & haul-off", "$2,000"],
  ["Footings & posts", "$2,600"],
  ["Framing, ledger & hardware", "$4,900"],
  ["Composite decking", "$4,300"],
  ["Aluminum railing, 36 lin ft", "$2,300"],
  ["Stairs, 4 risers", "$1,100"],
  ["Lighting & post caps", "$700"],
];

function BidRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn("flex items-baseline gap-2 text-[12.5px]", bold && "font-semibold")}>
      <span className="text-foreground whitespace-nowrap">{label}</span>
      <span className="border-border mb-[3px] flex-1 border-b border-dotted" />
      <span className="text-foreground whitespace-nowrap tabular-nums">{value}</span>
    </div>
  );
}

export function BidComparisonFigure() {
  return (
    <Figure
      caption={
        <>
          The same 16×20 rebuild, quoted two ways. The lump sum isn&apos;t necessarily dishonest —
          it&apos;s just unanswerable: nothing to compare against another bid, and nowhere honest
          for a change order to land. Question 01 exists to turn the left bid into the right one.
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border-border bg-card flex flex-col rounded-[10px] border p-4">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase">
            Bid A — one number
          </p>
          <div className="mt-3">
            <BidRow label="New composite deck, complete" value="$22,000" bold />
          </div>
          <div className="flex-1" />
          <p className="mt-4 text-[12px] leading-relaxed" style={{ color: FIG.warn }}>
            Can&apos;t be compared line for line. Can&apos;t absorb a change order honestly.
            Red flag №1 on this list.
          </p>
        </div>
        <div className="border-border bg-card rounded-[10px] border p-4">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase">
            Bid B — itemized
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            {BID_LINES.map(([label, value]) => (
              <BidRow key={label} label={label} value={value} />
            ))}
            <div className="border-border mt-1 border-t pt-1.5">
              <BidRow label="Total" value="$18,800" bold />
            </div>
          </div>
          <p className="text-haka-pine mt-4 text-[12px] leading-relaxed">
            Every line can be questioned, compared, and priced against another bid.
          </p>
        </div>
      </div>
    </Figure>
  );
}

// ---------------------------------------------------------------------------
// Which deck fits the lot — the gallery's five build types mapped to the site
// conditions that call for them. Used on /deck-design-ideas-colorado.
// ---------------------------------------------------------------------------
const STYLES: { style: string; when: string }[] = [
  { style: "Ground-level deck", when: "flat yard, door at grade" },
  { style: "Elevated / walk-out", when: "door a story up — engineered posts" },
  { style: "Multi-level", when: "sloped lot — stack the living space" },
  { style: "Covered deck or pergola", when: "full sun or three-season plans" },
];

export function DeckStyleChooserFigure() {
  const rows = [28, 82, 136, 190];

  return (
    <Figure
      caption={
        <>
          A shortcut for browsing: the lot usually picks the deck type, and the photos below show
          each one built. Taste picks everything else.
        </>
      }
    >
      <svg
        viewBox="0 0 620 220"
        role="img"
        aria-label="Decision diagram mapping lot conditions to deck types: a flat yard suits a ground-level deck, a door a story up calls for an elevated walk-out deck, a sloped lot suits a multi-level deck, and full sun or three-season plans call for a covered deck or pergola."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <rect x={8} y={84} width={130} height={52} rx={10} fill={FIG.pine} />
        <text x={73} y={106} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#ffffff">
          Your lot &amp;
        </text>
        <text x={73} y={122} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#ffffff">
          sun exposure
        </text>

        {STYLES.map((s, i) => {
          const cy = rows[i];
          return (
            <g key={s.style}>
              <path
                d={`M 138 110 C 190 110 190 ${cy} 240 ${cy}`}
                fill="none"
                stroke={FIG.teal}
                strokeWidth="1.5"
              />
              <rect
                x={240}
                y={cy - 22}
                width={372}
                height={44}
                rx={10}
                fill="#ffffff"
                stroke={FIG.teal}
                strokeWidth="1"
              />
              <text x={256} y={cy - 3} fontSize="12.5" fontWeight="600" fill={FIG.ink}>
                {s.style}
              </text>
              <text x={256} y={cy + 13} fontSize="11" fill={FIG.muted}>
                {s.when}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
