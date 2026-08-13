// Shared chrome for the guide figures — the inline SVG visual aids that
// accompany each guide and tool. One figure per page, each drawn for its
// content (see figure-charts.tsx, figure-diagrams.tsx, figure-process.tsx).
//
// Conventions the figures share:
// - Editorial, print-like figures: every mark is directly labeled, so they
//   carry no hover layer; the data always also exists as text on the page
//   (a table, stat rows, or prose) for screen readers and skimmers.
// - SVGs scale to the guide column via viewBox + width:100%.
// - Ink/text colors come from the site palette; where a figure needs series
//   identity (two lines on one chart), it uses the validated pair below
//   rather than the brand's muted tones, which read as gray in a chart.

/** Chart ink — series identity, validated as a pair on white (CVD-safe). */
export const FIG = {
  /** Composite / "the modern answer" series. */
  green: "#2e8b57",
  /** Wood / "the classic answer" series. */
  amber: "#b07818",
  /** Structure and single-hue marks — brand pine. */
  pine: "#4f6e56",
  /** Brand teal, for secondary structure fills. */
  teal: "#729b79",
  /** Text ink. */
  ink: "#22302a",
  /** Muted text. */
  muted: "#586860",
  /** Grid / hairlines. */
  grid: "rgba(34,48,42,0.10)",
  /** Light structure fill (wood tones in diagrams). */
  board: "#e8ddd0",
  /** Warn accent — red-flag callouts only. */
  warn: "#a05252",
} as const;

export function Figure({
  caption,
  children,
}: {
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="border-border bg-haka-smoke/60 mb-5 rounded-[10px] border px-4 pt-4 pb-3.5 sm:px-5">
      {children}
      <figcaption className="text-muted-foreground mt-2.5 text-[12.5px] leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
