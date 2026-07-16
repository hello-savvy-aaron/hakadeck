"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

// 2026 Denver-metro installed $/sq ft ranges. Keep in sync with the published
// cost guides (blog/composite-deck-cost-denver quotes $40–$70 for composite).
const MATERIALS = [
  { key: "composite", label: "Capped composite", low: 40, high: 70 },
  { key: "cedar", label: "Cedar / redwood", low: 35, high: 55 },
  { key: "hardwood", label: "Exotic hardwood", low: 55, high: 85 },
] as const;

// Elevation drives structure: taller posts, bigger footings, engineered
// railing loads. Multipliers applied to the base $/sq ft range.
const HEIGHTS = [
  { key: "ground", label: "Ground-level", factor: 1 },
  { key: "elevated", label: "Elevated (walk-up)", factor: 1.15 },
  { key: "second", label: "Second-story / walk-out", factor: 1.3 },
] as const;

// Flat add-on ranges (installed).
const SHADE = [
  { key: "none", label: "No cover", low: 0, high: 0 },
  { key: "pergola", label: "Pergola", low: 8000, high: 16000 },
  { key: "roof", label: "Solid roof cover", low: 15000, high: 30000 },
] as const;

const EXTRAS = [
  { key: "teardown", label: "Tear off an existing deck", low: 1500, high: 3500 },
  { key: "stairs", label: "Stairs to grade", low: 2000, high: 4500 },
  { key: "railing", label: "Premium railing (cable / glass)", low: 3500, high: 7500 },
] as const;

function money(n: number) {
  return `$${(Math.round(n / 500) * 500).toLocaleString()}`;
}

export function DeckCostCalculator() {
  const [sqft, setSqft] = useState(350);
  const [material, setMaterial] = useState<(typeof MATERIALS)[number]>(MATERIALS[0]);
  const [height, setHeight] = useState<(typeof HEIGHTS)[number]>(HEIGHTS[0]);
  const [shade, setShade] = useState<(typeof SHADE)[number]>(SHADE[0]);
  const [extras, setExtras] = useState<Set<string>>(new Set());

  const extraLow = EXTRAS.filter((e) => extras.has(e.key)).reduce((s, e) => s + e.low, 0);
  const extraHigh = EXTRAS.filter((e) => extras.has(e.key)).reduce((s, e) => s + e.high, 0);
  const low = sqft * material.low * height.factor + shade.low + extraLow;
  const high = sqft * material.high * height.factor + shade.high + extraHigh;

  function toggleExtra(key: string) {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="border-border/40 bg-card/40 rounded-2xl border p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-7">
          <Field label={`Deck size — ${sqft.toLocaleString()} sq ft`}>
            <input
              type="range"
              min={100}
              max={800}
              step={25}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="accent-haka-cream w-full"
              aria-label="Deck size in square feet"
            />
            <div className="text-muted-foreground mt-1 flex justify-between text-xs">
              <span>100</span>
              <span>800+</span>
            </div>
          </Field>

          <Field label="Decking material">
            <ToggleRow options={MATERIALS} value={material.key} onSelect={(o) => setMaterial(o)} />
          </Field>

          <Field label="Deck height">
            <ToggleRow options={HEIGHTS} value={height.key} onSelect={(o) => setHeight(o)} />
          </Field>

          <Field label="Shade structure">
            <ToggleRow options={SHADE} value={shade.key} onSelect={(o) => setShade(o)} />
          </Field>

          <Field label="Extras">
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((e) => (
                <button
                  key={e.key}
                  type="button"
                  onClick={() => toggleExtra(e.key)}
                  aria-pressed={extras.has(e.key)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    extras.has(e.key)
                      ? "border-foreground/60 bg-foreground/10"
                      : "border-border/40 hover:border-foreground/30",
                  )}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="border-border/40 flex flex-col justify-between rounded-2xl border p-6">
          <div>
            <p className="text-foreground/60 text-xs font-medium tracking-[0.18em] uppercase">
              Estimated installed cost
            </p>
            <p className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
              {money(low)}–{money(high)}
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              2026 planning range for the Denver metro — materials, labor, permits, and cleanup.
              Site conditions (slope, access, soil) move real quotes within and sometimes past
              these numbers.
            </p>
          </div>
          <div className="mt-8">
            <Button asChild size="lg" className="h-12 w-full px-6 text-base">
              <Link href={site.cta.href}>
                Get a real number
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-muted-foreground mt-3 text-center text-xs">
              Free on-site design consultation — no obligation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-foreground/85 mb-3 text-sm font-medium">{label}</p>
      {children}
    </div>
  );
}

function ToggleRow<T extends { key: string; label: string }>({
  options,
  value,
  onSelect,
}: {
  options: readonly T[];
  value: string;
  onSelect: (option: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onSelect(o)}
          aria-pressed={value === o.key}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            value === o.key
              ? "border-foreground/60 bg-foreground/10"
              : "border-border/40 hover:border-foreground/30",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
