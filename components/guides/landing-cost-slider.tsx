"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// The white price box inside the featured "What does a deck really cost?"
// card, upgraded from three static rows into a mini calculator. The slider
// interpolates between the same installed-composite anchors the cost guide's
// size table publishes, so the live range always agrees with the printed
// rows — which stay visible as reference sizes, the nearest one highlighting
// as you drag.

// [sqft, installed low, installed high] — straight from the cost guide table.
const ANCHORS: [number, number, number][] = [
  [192, 8000, 13000],
  [320, 13000, 25000],
  [480, 19000, 37000],
];

const ROWS = [
  { label: "12×16 composite, installed", sqft: 192 },
  { label: "16×20 composite, installed", sqft: 320 },
  { label: "20×24 composite, installed", sqft: 480 },
];

// Piecewise-linear between anchors; outside them, extend at the nearest
// anchor's implied $/sq ft so small and large decks stay proportionate.
function estimate(sqft: number): [number, number] {
  const first = ANCHORS[0];
  const last = ANCHORS[ANCHORS.length - 1];
  if (sqft <= first[0]) return [(first[1] / first[0]) * sqft, (first[2] / first[0]) * sqft];
  if (sqft >= last[0]) return [(last[1] / last[0]) * sqft, (last[2] / last[0]) * sqft];
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [a, aLow, aHigh] = ANCHORS[i];
    const [b, bLow, bHigh] = ANCHORS[i + 1];
    if (sqft <= b) {
      const t = (sqft - a) / (b - a);
      return [aLow + t * (bLow - aLow), aHigh + t * (bHigh - aHigh)];
    }
  }
  return [last[1], last[2]];
}

const money = (v: number) => "$" + (Math.round(v / 500) * 500).toLocaleString("en-US");
// Anchor rows are round thousands, so this renders them exactly as designed
// ("$8k – $13k").
const moneyK = (v: number) => "$" + Math.round(v / 1000) + "k";

export function LandingCostSlider() {
  const [sqft, setSqft] = useState(320);
  const [low, high] = estimate(sqft);
  const nearest = ROWS.reduce((best, r) =>
    Math.abs(r.sqft - sqft) < Math.abs(best.sqft - sqft) ? r : best,
  );

  return (
    <div className="bg-card flex flex-col gap-2 rounded-[10px] px-4 py-4">
      {ROWS.map((r, i) => {
        const [rl, rh] = estimate(r.sqft);
        return (
          <div
            key={r.label}
            className={cn(
              "flex justify-between text-sm",
              i > 0 && "border-border/60 border-t pt-2",
              r === nearest ? "text-foreground" : undefined,
            )}
          >
            <span className={r === nearest ? "text-foreground" : "text-muted-foreground"}>
              {r.label}
            </span>
            <b
              className={cn(
                "font-semibold whitespace-nowrap",
                r === nearest ? "text-primary" : "text-foreground",
              )}
            >
              {moneyK(rl)} – {moneyK(rh)}
            </b>
          </div>
        );
      })}

      <div className="border-border/60 mt-1 border-t pt-3">
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-muted-foreground">
            Your size — <b className="text-foreground font-semibold">{sqft} sq ft</b>
          </span>
          <b className="text-foreground font-semibold whitespace-nowrap">
            {money(low)} – {money(high)}
          </b>
        </div>
        <input
          type="range"
          min={100}
          max={800}
          step={10}
          value={sqft}
          onChange={(e) => setSqft(Number(e.target.value))}
          aria-label="Deck size in square feet"
          className="accent-haka-teal mt-2 h-6 w-full"
        />
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>100</span>
          <span>800+</span>
        </div>
      </div>
    </div>
  );
}
