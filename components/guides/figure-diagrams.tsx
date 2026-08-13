import { FIG, Figure } from "@/components/guides/figure";

// Structural diagrams for the guides — see figure.tsx for shared conventions.
// Both draw the same scene: a section through an attached deck, viewed from
// the side (house at left, joists spanning from the ledger to a beam on
// posts). The anatomy version names the parts for the DIY guide; the
// inspection version drops numbered markers on the six spots the safety
// guide walks through, in the same order as that page's checklist.

/** Small leader line from a label to the part it names. */
function Leader({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={FIG.muted} strokeWidth="1" />
      <circle cx={x2} cy={y2} r="2" fill={FIG.muted} />
    </>
  );
}

/** Decking boards with the small drainage gaps between them. */
function Boards({ from, to, y }: { from: number; to: number; y: number }) {
  const boards: React.ReactNode[] = [];
  for (let x = from; x + 24 <= to; x += 28) {
    boards.push(
      <rect key={x} x={x} y={y} width={24} height={8} rx={1.5} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.35" strokeWidth="0.75" />,
    );
  }
  return <>{boards}</>;
}

// ---------------------------------------------------------------------------
// Deck anatomy — the worked 12×16 example from the DIY guide, labeled.
// Used on /diy-deck-building-checklist.
// ---------------------------------------------------------------------------
export function DeckAnatomyFigure() {
  return (
    <Figure
      caption={
        <>
          The structure the checklist builds, in section: ledger flashed and bolted to the house,
          joists from the ledger to a doubled beam on posts, footings below frost line. Every
          label matches a line in the worked example below.
        </>
      }
    >
      <svg
        viewBox="0 0 620 330"
        role="img"
        aria-label="Cross-section diagram of an attached deck: flashing over a ledger bolted to the house, 2 by 8 joists at 16 inches on center spanning to a doubled 2 by 10 beam, 6 by 6 posts on brackets, concrete footings 30 to 36 inches below grade, decking boards on top, and a guardrail at least 36 inches high."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* House wall */}
        <rect x={30} y={20} width={40} height={230} fill="#e3dfda" stroke={FIG.ink} strokeOpacity="0.3" strokeWidth="1" />
        <text
          x={50}
          y={165}
          fontSize="11"
          fill={FIG.muted}
          textAnchor="middle"
          transform="rotate(-90 50 165)"
          letterSpacing="0.08em"
        >
          HOUSE
        </text>

        {/* Grade line */}
        <line x1={10} y1={250} x2={610} y2={250} stroke={FIG.ink} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="5 4" />
        <text x={12} y={244} fontSize="10.5" fill={FIG.muted}>
          grade
        </text>

        {/* Ledger */}
        <rect x={70} y={108} width={14} height={20} fill={FIG.pine} />

        {/* Joist (side view — one member shown, runs ledger to past the beam) */}
        <rect x={84} y={108} width={452} height={20} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.35" strokeWidth="0.75" />

        {/* Doubled beam */}
        <rect x={452} y={128} width={10} height={24} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />
        <rect x={463} y={128} width={10} height={24} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />

        {/* Post + bracket + footing */}
        <rect x={455} y={152} width={15} height={98} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />
        <rect x={452} y={152} width={21} height={6} fill={FIG.pine} />
        <rect x={447} y={250} width={31} height={48} fill="#d7d4ce" stroke={FIG.ink} strokeOpacity="0.3" strokeWidth="1" />

        {/* Frost-depth arrow */}
        <line x1={520} y1={252} x2={520} y2={296} stroke={FIG.muted} strokeWidth="1" />
        <path d="M 517 256 L 520 251 L 523 256" fill="none" stroke={FIG.muted} strokeWidth="1" />
        <path d="M 517 292 L 520 297 L 523 292" fill="none" stroke={FIG.muted} strokeWidth="1" />
        <text x={528} y={272} fontSize="11" fill={FIG.muted}>
          30–36&quot;
        </text>
        <text x={528} y={286} fontSize="11" fill={FIG.muted}>
          frost depth
        </text>

        {/* Decking */}
        <Boards from={70} to={540} y={100} />

        {/* Flashing — over the ledger and up the wall, painted after the
            boards so the metal reads on top */}
        <path d="M 66 78 L 66 98 L 96 98" fill="none" stroke={FIG.amber} strokeWidth="3" strokeLinecap="round" />

        {/* Guardrail */}
        <rect x={522} y={44} width={12} height={64} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />
        <rect x={440} y={38} width={112} height={8} rx={2} fill={FIG.pine} />
        {[452, 466, 480, 494, 508].map((bx) => (
          <rect key={bx} x={bx} y={46} width={3} height={54} fill={FIG.ink} fillOpacity="0.45" />
        ))}
        <line x1={584} y1={46} x2={584} y2={100} stroke={FIG.muted} strokeWidth="1" />
        <path d="M 581 50 L 584 45 L 587 50" fill="none" stroke={FIG.muted} strokeWidth="1" />
        <path d="M 581 96 L 584 101 L 587 96" fill="none" stroke={FIG.muted} strokeWidth="1" />
        <text x={590} y={70} fontSize="11" fill={FIG.muted}>
          36&quot;
        </text>
        <text x={590} y={84} fontSize="11" fill={FIG.muted}>
          min
        </text>

        {/* Labels — under-deck space is the open zone, so most live there */}
        <text x={110} y={70} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          Flashing over the ledger
        </text>
        <Leader x1={108} y1={74} x2={80} y2={99} />

        <text x={230} y={86} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          Decking
        </text>
        <Leader x1={250} y1={90} x2={260} y2={101} />

        <text x={98} y={152} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          Ledger — bolted,
        </text>
        <text x={98} y={166} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          never nailed
        </text>
        <Leader x1={96} y1={148} x2={80} y2={126} />

        <text x={250} y={190} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          Joists — 2×8 @ 16&quot; OC
        </text>
        <Leader x1={300} y1={186} x2={310} y2={128} />

        <text x={300} y={212} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          Beam — doubled 2×10
        </text>
        <Leader x1={412} y1={208} x2={452} y2={142} />

        <text x={300} y={238} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          6×6 post on a bracket
        </text>
        <Leader x1={418} y1={234} x2={454} y2={200} />

        <text x={100} y={282} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
          Concrete footing, 12&quot; dia
        </text>
        <Leader x1={242} y1={278} x2={445} y2={274} />
      </svg>
    </Figure>
  );
}

// ---------------------------------------------------------------------------
// Inspection map — the same deck with the six checkpoints numbered in the
// order the safety guide checks them. Used on /deck-safety-inspection-guide.
// ---------------------------------------------------------------------------
function Marker({ n, cx, cy }: { n: number; cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={12} fill={FIG.pine} stroke="#ffffff" strokeWidth="2" />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="#ffffff"
      >
        {n}
      </text>
    </g>
  );
}

export function InspectionMapFigure() {
  return (
    <Figure
      caption={
        <>
          Where the ten minutes go — the numbers match the six checks below, in inspection order:
          ① the ledger, ② footings &amp; posts, ③ joists &amp; framing, ④ railings, ⑤ stairs,
          ⑥ the surface. Everything before ④ needs the flashlight; it&apos;s all underneath.
        </>
      }
    >
      <svg
        viewBox="0 0 620 300"
        role="img"
        aria-label="Side-view diagram of an attached deck with six numbered inspection points: 1 the ledger where the deck meets the house, 2 the footings and posts, 3 the joists underneath, 4 the railing, 5 the stairs, and 6 the walking surface."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* House wall */}
        <rect x={30} y={16} width={40} height={234} fill="#e3dfda" stroke={FIG.ink} strokeOpacity="0.3" strokeWidth="1" />
        <text
          x={50}
          y={160}
          fontSize="11"
          fill={FIG.muted}
          textAnchor="middle"
          transform="rotate(-90 50 160)"
          letterSpacing="0.08em"
        >
          HOUSE
        </text>

        {/* Grade */}
        <line x1={10} y1={250} x2={610} y2={250} stroke={FIG.ink} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="5 4" />
        <text x={12} y={264} fontSize="10.5" fill={FIG.muted}>
          grade
        </text>

        {/* Ledger, joist, beam, post, footing */}
        <rect x={70} y={108} width={14} height={20} fill={FIG.pine} />
        <rect x={84} y={108} width={440} height={20} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.35" strokeWidth="0.75" />
        <rect x={440} y={128} width={10} height={24} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />
        <rect x={451} y={128} width={10} height={24} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />
        <rect x={443} y={152} width={15} height={98} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />
        <rect x={435} y={250} width={31} height={34} fill="#d7d4ce" stroke={FIG.ink} strokeOpacity="0.3" strokeWidth="1" />

        {/* Decking */}
        <Boards from={70} to={532} y={100} />

        {/* Guardrail (stops where the stairs start) */}
        <rect x={500} y={44} width={12} height={64} fill={FIG.board} stroke={FIG.ink} strokeOpacity="0.4" strokeWidth="0.75" />
        <rect x={420} y={38} width={96} height={8} rx={2} fill={FIG.pine} />
        {[432, 446, 460, 474, 488].map((bx) => (
          <rect key={bx} x={bx} y={46} width={3} height={54} fill={FIG.ink} fillOpacity="0.45" />
        ))}

        {/* Stairs to grade */}
        <path
          d="M 532 108 h 20 v 35 h 20 v 35 h 20 v 35 h 20 v 37 h -80 z"
          fill={FIG.board}
          stroke={FIG.ink}
          strokeOpacity="0.35"
          strokeWidth="0.75"
        />
        {/* Stair handrail — parallels the nosing line, posts down to treads */}
        <line x1={538} y1={80} x2={616} y2={218} stroke={FIG.pine} strokeWidth="5" strokeLinecap="round" />
        <line x1={550} y1={101} x2={550} y2={143} stroke={FIG.ink} strokeOpacity="0.45" strokeWidth="3" />
        <line x1={586} y1={165} x2={586} y2={213} stroke={FIG.ink} strokeOpacity="0.45" strokeWidth="3" />

        {/* Numbered checkpoints — same order as the checklist below */}
        <Marker n={1} cx={92} cy={140} />
        <Marker n={2} cx={450} cy={230} />
        <Marker n={3} cx={280} cy={140} />
        <Marker n={4} cx={468} cy={42} />
        <Marker n={5} cx={560} cy={224} />
        <Marker n={6} cx={200} cy={90} />
      </svg>
    </Figure>
  );
}
