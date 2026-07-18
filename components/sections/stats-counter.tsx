"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { Eyebrow, Section } from "./section";
import { site } from "@/lib/site";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

const DEFAULT_STATS: Stat[] = [
  { value: 100, suffix: "%", label: "Five-Star Reviews" },
  { value: 250, suffix: "+", label: "Outdoor Projects Built" },
];

export function StatsCounter({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  return (
    <Section id="stats" top="tight" bottom="tight">
      <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_1.6fr]">
        <div>
          <Eyebrow>By the Numbers</Eyebrow>
          <h2 className="font-display mt-4 text-4xl leading-[1.04] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Engineered for Altitude. Built with Pride.
          </h2>
          <p className="text-foreground/70 mt-6 max-w-md text-base leading-relaxed">
            Composite, hardwood, and covered — across the Front Range since 2017.
          </p>
          {/* Same Google Reviews pill as the hero, restyled for the light band. */}
          <a
            href={site.reviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="border-border bg-card text-haka-ink hover:bg-card/80 mt-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm shadow-sm transition-colors"
          >
            <span className="font-semibold">{site.rating.value.toFixed(1)}</span>
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="text-haka-gold h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-foreground/70">({site.rating.count}) Google Reviews</span>
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-x-8">
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

function StatNumber({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  // Initialize to the real value so the server-rendered HTML contains the true
  // number (e.g. "87"), not a literal "0" that JS-free crawlers and some AEO
  // ingestion paths would otherwise read. On the client, `animate` below drives
  // the count-up from 0 via onUpdate once the section scrolls into view; reduced
  // -motion users keep the real number.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span
      ref={ref}
      className="font-display block text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl lg:text-7xl"
    >
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
