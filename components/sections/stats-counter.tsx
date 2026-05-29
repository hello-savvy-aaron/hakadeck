"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Eyebrow, Section } from "./section";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

const DEFAULT_STATS: Stat[] = [
  { value: 87, label: "5-Star Google Reviews" },
  { value: 100, suffix: "+", label: "Decks Built in Denver" },
  { value: 9, label: "Years in the south Denver metro" },
  { value: 25, label: "Year Manufacturer Warranties" },
];

export function StatsCounter({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  return (
    <Section id="stats" className="bg-haka-sky">
      <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_1.6fr]">
        <div>
          <Eyebrow>By the Numbers</Eyebrow>
          <h2 className="font-display mt-4 text-balance text-4xl leading-[1.04] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Engineered for Altitude. Built with Pride.
          </h2>
          <p className="text-foreground/70 mt-6 max-w-md text-base leading-relaxed">
            Composite, hardwood, and covered — across the south Denver metro
            since 2017.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2">
          {stats.map((stat) => (
            <li key={stat.label}>
              <StatNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-foreground/70 mt-2 text-sm leading-snug">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function StatNumber({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const shown = reduce && inView ? value : display;

  return (
    <span
      ref={ref}
      className="font-display block text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl lg:text-7xl"
    >
      {prefix}
      {shown.toLocaleString()}
      {suffix}
    </span>
  );
}
