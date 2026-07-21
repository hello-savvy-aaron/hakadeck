/**
 * The two drone clips are ~8MB each. They're decoration, not content — the
 * poster frame says the same thing — so we only fetch them when the visit can
 * absorb the cost. Call this from a client effect (it reads window/navigator)
 * before assigning a video `src`; the markup ships sourceless with `preload="none"`.
 */
export function shouldLoadHeavyVideo(): boolean {
  if (typeof window === "undefined") return false;

  // Someone who asked for less motion doesn't need an autoplaying drone shot.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  // Phones get the poster. The clips are landscape drone footage that ends up
  // heavily cropped in a portrait viewport anyway, so the payload buys little.
  if (!window.matchMedia("(min-width: 768px)").matches) return false;

  // Chromium-only, and absent elsewhere — treat "unknown" as fine and only bail
  // on an explicit signal that the connection is metered or genuinely slow.
  // Deliberately NOT an allow-list of ["4g"]: effectiveType is derived from
  // observed RTT and Chrome reports "3g" on plenty of healthy connections
  // (including early in page load), so allow-listing would quietly drop the
  // video for a large share of desktop visitors.
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return false;

  return true;
}
