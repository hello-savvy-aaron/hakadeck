import { FIG, Figure } from "@/components/guides/figure";

// Chart figures for the guides — see figure.tsx for the shared conventions.
// All numbers here restate figures already published in the surrounding page
// copy (that text is the accessible/data fallback); keep the two in sync.

// ---------------------------------------------------------------------------
// The ten-year math — cumulative cost of a 320 sq ft deck, wood vs composite.
// Wood: ~$9,000 build + $400–900 per hired-out clean-and-restain every other
// year (charted at the $650 midpoint). Composite: ~$16,000 build + soap.
// Used on /deck-cost-guide-denver.
// ---------------------------------------------------------------------------
export function TenYearCostFigure() {
  const X0 = 52; // plot left
  const X1 = 548; // plot right (year 10)
  const Y0 = 210; // $0 baseline
  const x = (year: number) => X0 + (year / 10) * (X1 - X0);
  const y = (dollars: number) => Y0 - (dollars / 18000) * 192;

  const wood: [number, number][] = [0, 2, 4, 6, 8, 10].map((yr, i) => [yr, 9000 + i * 650]);
  const woodPath = wood.map(([yr, v]) => `${x(yr)},${y(v).toFixed(1)}`).join(" ");

  return (
    <Figure
      caption={
        <>
          Cumulative cost of a 320 sq ft deck over ten years, Denver metro planning numbers:
          pressure-treated at ~$9,000 built plus a $400–900 hired-out clean-and-restain every
          other year (charted at the midpoint, repairs not included) versus capped composite at
          ~$16,000 built and soap-and-water upkeep. The gap most people compare on day one is a
          third of itself by year ten.
        </>
      }
    >
      <svg
        viewBox="0 0 620 240"
        role="img"
        aria-label="Line chart: cumulative ten-year cost of a 320 square foot deck. Capped composite stays flat at $16,000. Pressure-treated wood starts at $9,000 and climbs past $12,000 by year ten as staining costs accumulate."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Gridlines at $0 / 5k / 10k / 15k */}
        {[0, 5000, 10000, 15000].map((v) => (
          <g key={v}>
            <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} stroke={FIG.grid} strokeWidth="1" />
            <text x={X0 - 8} y={y(v) + 3.5} textAnchor="end" fontSize="11" fill={FIG.muted}>
              {v === 0 ? "$0" : `$${v / 1000}k`}
            </text>
          </g>
        ))}

        {/* Composite — flat line */}
        <line
          x1={X0}
          x2={X1}
          y1={y(16000)}
          y2={y(16000)}
          stroke={FIG.green}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={X1} cy={y(16000)} r="3.5" fill={FIG.green} />
        <text x={X0 + 8} y={y(16000) - 9} fontSize="12.5" fontWeight="600" fill={FIG.green}>
          Capped composite — built once, soap after
        </text>
        <text x={X1 + 8} y={y(16000) + 4} fontSize="12" fontWeight="600" fill={FIG.green}>
          $16,000
        </text>

        {/* Wood — climbing line with per-restain points */}
        <polyline
          points={woodPath}
          fill="none"
          stroke={FIG.amber}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {wood.map(([yr, v]) => (
          <circle key={yr} cx={x(yr)} cy={y(v)} r="3.5" fill={FIG.amber} />
        ))}
        <text x={X0 + 8} y={y(9000) + 20} fontSize="12.5" fontWeight="600" fill={FIG.amber}>
          Pressure-treated — plus staining every other year
        </text>
        <text x={X1 + 8} y={y(12250) + 4} fontSize="12" fontWeight="600" fill={FIG.amber}>
          ≈ $12,300
        </text>

        {/* Year axis */}
        {[0, 2, 4, 6, 8, 10].map((yr) => (
          <text key={yr} x={x(yr)} y={228} textAnchor="middle" fontSize="11" fill={FIG.muted}>
            {yr === 0 ? "Built" : `Yr ${yr}`}
          </text>
        ))}
      </svg>
    </Figure>
  );
}

// ---------------------------------------------------------------------------
// Installed $/sq ft ranges by surface — the five surfaces the materials guide
// walks through, on one scale. Used on /composite-vs-hardwood-decking-colorado.
// ---------------------------------------------------------------------------
const SURFACE_RANGES: { label: string; low: number; high: number }[] = [
  { label: "Pressure-treated pine", low: 20, high: 35 },
  { label: "Cedar / redwood", low: 25, high: 45 },
  { label: "Thermally-modified ash", low: 40, high: 60 },
  { label: "Capped composite", low: 40, high: 70 },
  { label: "PVC / mineral board", low: 50, high: 85 },
];

export function SurfaceCostRangeFigure() {
  const X0 = 170;
  const X1 = 600;
  const x = (v: number) => X0 + ((v - 10) / 80) * (X1 - X0);
  const rowY = (i: number) => 26 + i * 34;

  return (
    <Figure
      caption={
        <>
          Typical installed cost per square foot in the Denver metro, by surface — same engineered
          substructure under all five, so the delta is the boards, not half the deck. Ranges match
          the tables above and in the cost guide.
        </>
      }
    >
      <svg
        viewBox="0 0 620 206"
        role="img"
        aria-label="Range chart of installed cost per square foot by decking surface: pressure-treated pine $20 to $35, cedar or redwood $25 to $45, thermally-modified ash $40 to $60, capped composite $40 to $70, PVC or mineral board $50 to $85."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Vertical gridlines + $ axis */}
        {[20, 40, 60, 80].map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={10} y2={178} stroke={FIG.grid} strokeWidth="1" />
            <text x={x(v)} y={196} textAnchor="middle" fontSize="11" fill={FIG.muted}>
              ${v}
            </text>
          </g>
        ))}
        <text x={0} y={196} fontSize="11" fill={FIG.muted}>
          installed / sq ft
        </text>

        {SURFACE_RANGES.map((r, i) => (
          <g key={r.label}>
            <text
              x={0}
              y={rowY(i) + 4}
              fontSize="12"
              fontWeight="600"
              fill={FIG.ink}
            >
              {r.label}
            </text>
            <rect
              x={x(r.low)}
              y={rowY(i) - 6}
              width={x(r.high) - x(r.low)}
              height={12}
              rx={6}
              fill={FIG.pine}
            />
            <text
              x={x(r.low) - 6}
              y={rowY(i) + 4}
              textAnchor="end"
              fontSize="11"
              fill={FIG.muted}
            >
              ${r.low}
            </text>
            <text x={x(r.high) + 6} y={rowY(i) + 4} fontSize="11" fill={FIG.muted}>
              ${r.high}
            </text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

// ---------------------------------------------------------------------------
// What moves the number — the calculator's own adjustments, drawn. Two panels
// because the two groups work differently: multipliers scale the whole build,
// add-ons land as flat ranges. Numbers mirror the constants in
// components/forms/deck-cost-calculator.tsx — keep in sync.
// Used on /deck-cost-calculator and /deck-cost-estimator-denver.
// ---------------------------------------------------------------------------
const MULTIPLIERS: { label: string; pct: number }[] = [
  { label: "Elevated (walk-up)", pct: 15 },
  { label: "Second-story / walk-out", pct: 30 },
];

const FLAT_ADDONS: { label: string; low: number; high: number }[] = [
  { label: "Tear off an old deck", low: 1500, high: 3500 },
  { label: "Stairs to grade", low: 2000, high: 4500 },
  { label: "Premium railing", low: 3500, high: 7500 },
  { label: "Pergola", low: 8000, high: 16000 },
  { label: "Solid roof cover", low: 15000, high: 30000 },
];

const fmtK = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}k` : `$${v}`;

export function WhatMovesTheNumberFigure() {
  const X0 = 170;
  const X1 = 600;
  const xPct = (v: number) => X0 + (v / 40) * (X1 - X0);
  const xUsd = (v: number) => X0 + (v / 30000) * (X1 - X0);

  return (
    <Figure
      caption={
        <>
          The calculator&apos;s own adjustments, drawn to scale. Height multiplies the whole build
          — taller posts, bigger footings, engineered railing loads — while covers, stairs,
          teardown, and premium railing land as the flat installed ranges we see on real quotes.
        </>
      }
    >
      <svg
        viewBox="0 0 620 300"
        role="img"
        aria-label="Two-panel chart of what moves a deck estimate. Panel one, multipliers on the whole build: elevated adds 15 percent, second-story or walk-out adds 30 percent. Panel two, flat add-ons: teardown $1,500 to $3,500, stairs $2,000 to $4,500, premium railing $3,500 to $7,500, pergola $8,000 to $16,000, solid roof cover $15,000 to $30,000."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Panel A — multiplies the whole build */}
        <text x={0} y={14} fontSize="11" fontWeight="600" letterSpacing="0.06em" fill={FIG.muted}>
          MULTIPLIES THE WHOLE BUILD
        </text>
        {MULTIPLIERS.map((m, i) => {
          const cy = 34 + i * 28;
          return (
            <g key={m.label}>
              <text x={0} y={cy + 4} fontSize="12" fontWeight="600" fill={FIG.ink}>
                {m.label}
              </text>
              <rect
                x={X0}
                y={cy - 6}
                width={xPct(m.pct) - X0}
                height={12}
                rx={6}
                fill={FIG.pine}
              />
              <text x={xPct(m.pct) + 6} y={cy + 4} fontSize="11.5" fontWeight="600" fill={FIG.ink}>
                +{m.pct}%
              </text>
            </g>
          );
        })}

        <line x1={0} x2={620} y1={82} y2={82} stroke={FIG.grid} strokeWidth="1" />

        {/* Panel B — flat add-on ranges. Gridlines first so pills paint over. */}
        <text x={0} y={102} fontSize="11" fontWeight="600" letterSpacing="0.06em" fill={FIG.muted}>
          ADDS A FLAT RANGE
        </text>
        {[10000, 20000, 30000].map((v) => (
          <g key={v}>
            <line x1={xUsd(v)} x2={xUsd(v)} y1={110} y2={262} stroke={FIG.grid} strokeWidth="1" />
            <text x={xUsd(v)} y={280} textAnchor="middle" fontSize="11" fill={FIG.muted}>
              ${v / 1000}k
            </text>
          </g>
        ))}
        {FLAT_ADDONS.map((a, i) => {
          const cy = 122 + i * 28;
          // The widest range would push a right-side label off the canvas —
          // its label sits left of the pill instead.
          const labelLeft = a.high >= 25000;
          return (
            <g key={a.label}>
              <text x={0} y={cy + 4} fontSize="12" fontWeight="600" fill={FIG.ink}>
                {a.label}
              </text>
              <rect
                x={xUsd(a.low)}
                y={cy - 6}
                width={xUsd(a.high) - xUsd(a.low)}
                height={12}
                rx={6}
                fill={FIG.teal}
              />
              <text
                x={labelLeft ? xUsd(a.low) - 6 : xUsd(a.high) + 6}
                y={cy + 4}
                textAnchor={labelLeft ? "end" : "start"}
                fontSize="11"
                fill={FIG.muted}
              >
                {fmtK(a.low)}–{fmtK(a.high)}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
