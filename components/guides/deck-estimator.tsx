"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

// Phase-two 7-step estimator wizard. Pricing model ported verbatim from the
// design prototype: per-sqft base by material, height multiplier, railing per
// linear foot (√area × 3), stairs $2.5–4k/run, lump ranges for overhead/extras,
// rounded to $500. Deliberately more detailed than /deck-cost-calculator.

type Range = [number, number];

const MATERIALS: [string, string, string][] = [
  ["composite", "Composite", "$95–125 / sq ft"],
  ["hardwood", "Hardwood", "$115–150 / sq ft"],
  ["redwood", "Redwood / cedar", "$85–110 / sq ft"],
];
const RAILINGS: [string, string, string][] = [
  ["cable", "Cable", "+$70–90 / lin ft"],
  ["aluminum", "Aluminum", "+$55–75 / lin ft"],
  ["glass", "Glass", "+$95–130 / lin ft"],
  ["composite", "Composite", "+$60–80 / lin ft"],
  ["none", "No railing needed", "$0"],
];
const HEIGHTS: [string, string, string][] = [
  ["ground", "Ground level", "baseline"],
  ["mid", "2–6 ft up", "+~8%"],
  ["walkout", "Walk-out (6 ft+)", "+~20%"],
];
const OVERHEADS: [string, string, string][] = [
  ["none", "Nothing", "$0"],
  ["pergola", "Pergola", "+$6k–12k"],
  ["covered", "Covered roof", "+$15k–28k"],
];
const EXTRAS: [ExtraKey, string, string][] = [
  ["tearout", "Tear out the old deck", "+$1.5k–3.5k"],
  ["lighting", "Deck lighting", "+$1.2k–3k"],
  ["kitchen", "Outdoor kitchen / bar", "+$8k–25k"],
];

type ExtraKey = "tearout" | "lighting" | "kitchen";

const STEP_NAMES = ["Size", "Material", "Railing", "Height", "Stairs", "Overhead", "Extras"];
const TITLES: Record<number, string> = {
  1: "How big is the deck?",
  2: "Decking material?",
  3: "Railing style?",
  4: "Height off grade?",
  5: "Stairs?",
  6: "Anything overhead?",
  7: "Any extras?",
};
const SUBS: Record<number, string> = {
  1: "Best guess is fine — you can drag this later.",
  2: "Composite is ~90% of what we build. Zero staining, 25-year warranties.",
  3: "Cable is our most-requested — clean look, keeps the view.",
  4: "Higher decks need bigger posts, beams, and railing everywhere.",
  5: "Flights of steps down to grade.",
  6: "Shade structures change the framing underneath.",
  7: "Toggle anything that applies.",
};

const money = (v: number) => "$" + (Math.round(v / 500) * 500).toLocaleString("en-US");

export function DeckEstimator() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState(320);
  const [material, setMaterial] = useState("composite");
  const [railing, setRailing] = useState("cable");
  const [height, setHeight] = useState("mid");
  const [stairs, setStairs] = useState(1);
  const [overhead, setOverhead] = useState("none");
  const [extras, setExtras] = useState<Record<ExtraKey, boolean>>({
    tearout: false,
    lighting: false,
    kitchen: false,
  });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const A = size;
  const base: Range = { composite: [95, 125], hardwood: [115, 150], redwood: [85, 110] }[
    material
  ] as Range;
  const hm = { ground: 1, mid: 1.08, walkout: 1.2 }[height]!;
  const deck: Range = [base[0] * A * hm, base[1] * A * hm];
  const lf = Math.round(Math.sqrt(A) * 3);
  const rr: Range = {
    cable: [70, 90],
    aluminum: [55, 75],
    glass: [95, 130],
    composite: [60, 80],
    none: [0, 0],
  }[railing] as Range;
  const rail: Range = [rr[0] * lf, rr[1] * lf];
  const ov: Range = { none: [0, 0], pergola: [6000, 12000], covered: [15000, 28000] }[
    overhead
  ] as Range;
  const st: Range = [stairs * 2500 + ov[0], stairs * 4000 + ov[1]];
  const ex: Range = [0, 0];
  if (extras.tearout) {
    ex[0] += 1500;
    ex[1] += 3500;
  }
  if (extras.lighting) {
    ex[0] += 1200;
    ex[1] += 3000;
  }
  if (extras.kitchen) {
    ex[0] += 8000;
    ex[1] += 25000;
  }
  const lo = deck[0] + rail[0] + st[0] + ex[0];
  const hi = deck[1] + rail[1] + st[1] + ex[1];
  const rangeText = `${money(lo)} – ${money(hi)}`;

  const extrasLabel = (["tearout", "lighting", "kitchen"] as ExtraKey[])
    .filter((k) => extras[k])
    .map((k) => ({ tearout: "tear-out", lighting: "lighting", kitchen: "outdoor kitchen" })[k])
    .join(", ");
  const summaryText = [
    `${size} sq ft ${material}`,
    railing !== "none" ? `${railing} railing` : "",
    stairs > 0 ? `${stairs} stair run${stairs > 1 ? "s" : ""}` : "",
    overhead !== "none" ? overhead : "",
    extrasLabel,
  ]
    .filter(Boolean)
    .join(" · ");

  const mids = [deck, rail, st, ex].map((p) => (p[0] + p[1]) / 2);
  const barColors = ["bg-primary", "bg-primary/50", "bg-haka-sky", "bg-foreground/20"];

  const isResults = step === 8;

  function next() {
    if (step === 7) track("Estimator completed", { material, size });
    setStep((s) => s + 1);
  }

  async function sendEstimate() {
    if (!/\S+@\S+\.\S+/.test(email.trim())) return;
    setSent(true);
    try {
      await fetch("/api/guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), guide: "estimator" }),
      });
      track("Estimator lead", { material });
    } catch {
      /* best-effort */
    }
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-[14px] border shadow-[0_1px_3px_rgba(34,48,42,0.06)]">
      {!isResults ? (
        <>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between gap-2.5">
              <h2 className="font-display text-foreground text-[1.375rem] font-medium tracking-tight">
                {TITLES[step]}
              </h2>
              <span className="text-muted-foreground text-xs font-semibold">{step} of 7</span>
            </div>

            {/* progress */}
            <div className="flex gap-1.5">
              {STEP_NAMES.map((_, i) => (
                <div
                  key={i}
                  className={cn("h-1 flex-1 rounded-full", i < step ? "bg-primary" : "bg-muted")}
                />
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-snug">{SUBS[step]}</p>

            {step === 1 && (
              <div className="flex flex-col gap-2.5">
                <div className="font-display text-foreground text-center text-3xl font-semibold">
                  {size}
                  {size >= 800 ? "+" : ""} sq ft
                </div>
                <input
                  type="range"
                  min={100}
                  max={800}
                  step={10}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="accent-haka-teal h-8 w-full"
                  aria-label="Deck size in square feet"
                />
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>100 sq ft</span>
                  <span>800+ sq ft</span>
                </div>
                <p className="bg-haka-smoke text-muted-foreground rounded-lg px-3.5 py-2.5 text-[13px]">
                  For reference: a 12×16 deck is ~192 sq ft; 16×20 is ~320.
                </p>
              </div>
            )}

            {step === 2 && (
              <OptionList options={MATERIALS} value={material} onSelect={setMaterial} />
            )}
            {step === 3 && <OptionList options={RAILINGS} value={railing} onSelect={setRailing} />}
            {step === 4 && <OptionList options={HEIGHTS} value={height} onSelect={setHeight} />}
            {step === 6 && (
              <OptionList options={OVERHEADS} value={overhead} onSelect={setOverhead} />
            )}

            {step === 5 && (
              <>
                <div className="flex items-center justify-center gap-6 py-3.5">
                  <Stepper
                    label="−"
                    onClick={() => setStairs((s) => Math.max(0, s - 1))}
                    disabled={stairs === 0}
                  />
                  <div className="font-display text-foreground min-w-[120px] text-center text-[1.625rem] font-semibold">
                    {stairs === 0 ? "None" : `${stairs} run${stairs > 1 ? "s" : ""}`}
                  </div>
                  <Stepper
                    label="+"
                    onClick={() => setStairs((s) => Math.min(4, s + 1))}
                    disabled={stairs === 4}
                  />
                </div>
                <p className="bg-haka-smoke text-muted-foreground rounded-lg px-3.5 py-2.5 text-center text-[13px]">
                  A &quot;run&quot; is one flight of steps down to grade — roughly $2,500–4,000 each.
                </p>
              </>
            )}

            {step === 7 && (
              <div className="flex flex-col gap-2.5">
                {EXTRAS.map(([key, label, hint]) => {
                  const on = extras[key];
                  return (
                    <OptionRow
                      key={key}
                      selected={on}
                      label={`${on ? "✓ " : ""}${label}`}
                      hint={hint}
                      onClick={() => setExtras((e) => ({ ...e, [key]: !e[key] }))}
                    />
                  );
                })}
              </div>
            )}

            <div className="mt-1 flex gap-2.5">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="border-input text-foreground rounded-[10px] border px-4.5 py-3.5 text-[15px] font-semibold"
                >
                  ← Back
                </button>
              )}
              <button
                type="button"
                onClick={next}
                className="bg-primary hover:bg-primary/85 flex-1 rounded-[10px] px-4.5 py-3.5 text-center text-[15px] font-semibold text-white transition-colors"
              >
                {step < 7 ? `Next: ${STEP_NAMES[step]} →` : "See my estimate →"}
              </button>
            </div>
          </div>

          {/* running ballpark */}
          <div className="bg-secondary border-border flex items-center justify-between border-t px-6 py-4">
            <div>
              <div className="text-foreground/60 text-[11px] tracking-[0.05em] uppercase">
                Running ballpark
              </div>
              <div className="font-display text-foreground text-[1.3125rem] font-semibold">
                {rangeText}
              </div>
            </div>
            <div className="text-foreground/60 text-right text-xs">
              updates as
              <br />
              you answer
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5 p-6">
          <div>
            <div className="text-muted-foreground text-xs tracking-[0.06em] uppercase">
              Your ballpark
            </div>
            <div className="font-display text-foreground text-4xl font-semibold">{rangeText}</div>
            <div className="text-muted-foreground mt-1.5 text-[13.5px]">{summaryText}</div>
          </div>

          <div>
            <div className="flex gap-1">
              {mids.map((m, i) => (
                <div
                  key={i}
                  className={cn("h-2 rounded-full", barColors[i])}
                  style={{ flexGrow: Math.max(m, 1) }}
                />
              ))}
            </div>
            <div className="text-muted-foreground mt-1.5 flex justify-between text-[10.5px]">
              <span>Decking &amp; structure</span>
              <span>Railing</span>
              <span>Stairs &amp; overhead</span>
              <span>Extras</span>
            </div>
          </div>

          <p className="bg-haka-smoke text-muted-foreground rounded-lg px-3.5 py-3 text-[13px] leading-relaxed">
            This is a planning range, not a bid — site access, soil, and design details move real
            numbers. It&apos;s built from what our last 250+ projects actually cost.
          </p>

          {!sent ? (
            <div className="bg-secondary flex flex-col gap-2.5 rounded-[10px] p-4.5">
              <div className="text-foreground text-sm font-semibold">
                Want this estimate in your inbox?
              </div>
              <div className="text-foreground/60 text-[13px]">
                With the line-item breakdown. Optional — the range is yours either way.
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-input text-foreground bg-card min-w-0 flex-1 rounded-lg border px-3.5 py-3 text-sm outline-none"
                  aria-label="Email address"
                />
                <button
                  type="button"
                  onClick={sendEstimate}
                  className="bg-primary hover:bg-primary/85 rounded-lg px-4.5 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors"
                >
                  Send it
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-secondary text-foreground rounded-[10px] p-4.5 text-sm">
              <strong className="font-semibold">Sent.</strong> Check your inbox in a few minutes —
              we&apos;ll follow up with the line-item breakdown.
            </div>
          )}

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setSent(false);
              }}
              className="border-input text-foreground rounded-[10px] border px-4 py-3 text-sm font-semibold"
            >
              Start over
            </button>
            <button
              type="button"
              onClick={() => setStep(7)}
              className="border-input text-foreground rounded-[10px] border px-4 py-3 text-sm font-semibold"
            >
              ← Adjust answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OptionList({
  options,
  value,
  onSelect,
}: {
  options: [string, string, string][];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {options.map(([val, label, hint]) => (
        <OptionRow
          key={val}
          selected={value === val}
          label={label}
          hint={hint}
          onClick={() => onSelect(val)}
        />
      ))}
    </div>
  );
}

function OptionRow({
  selected,
  label,
  hint,
  onClick,
}: {
  selected: boolean;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-center justify-between gap-2.5 rounded-[10px] px-4 py-3.5 text-left transition-colors",
        selected
          ? "bg-secondary border-foreground border-2"
          : "border-input bg-card hover:border-foreground/30 border",
      )}
    >
      <span
        className={cn("text-foreground text-[15px]", selected ? "font-semibold" : "font-normal")}
      >
        {label}
      </span>
      <span className="text-muted-foreground text-[13px]">{hint}</span>
    </button>
  );
}

function Stepper({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label === "+" ? "Add a stair run" : "Remove a stair run"}
      className="border-input text-foreground bg-card grid h-13 w-13 place-items-center rounded-[10px] border text-2xl transition-colors disabled:opacity-40"
    >
      {label}
    </button>
  );
}

// "Keep planning" cross-links shown under the estimator card.
export function EstimatorFooterLinks() {
  const links = [
    {
      href: "/composite-vs-hardwood-decking-colorado",
      label: "Composite vs. hardwood — which is right for you?",
    },
    { href: "/deck-permits-south-denver-metro", label: "Permits & code in the south Denver metro" },
    { href: "/diy-deck-building-checklist", label: "The DIY build checklist" },
  ];
  return (
    <div className="mt-7">
      <p className="text-muted-foreground mb-2.5 text-[13px] font-semibold tracking-[0.06em] uppercase">
        Keep planning
      </p>
      <div className="flex flex-col gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-primary hover:text-haka-pine text-sm font-semibold"
          >
            {l.label} →
          </Link>
        ))}
      </div>
    </div>
  );
}
