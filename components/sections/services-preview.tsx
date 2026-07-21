"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Section } from "./section";
import { shouldLoadHeavyVideo } from "@/lib/heavy-media";

const VIDEO_SRC = "/images/projects/double-decker/drone.mp4";
const POSTER = "/images/projects/double-decker/drone-poster.jpeg";

const TILES = [
  { title: "Composite & Hardwood Decks", body: "Single-level, multi-tier, wraparound." },
  { title: "Pergolas & Covered Decks", body: "Year-round shade structures and pavilion roofs." },
  { title: "Outdoor Kitchens & Bars", body: "Built-in grills, counters, sinks, and bar tops." },
  { title: "Railing Systems", body: "Cable, aluminum, glass, and composite designs." },
];

export function ServicesPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ships sourceless (see shouldLoadHeavyVideo); the source is attached on first
  // intersection so the clip costs nothing to visitors who never scroll this far.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !shouldLoadHeavyVideo()) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            v.pause();
            return;
          }
          if (!v.src) v.src = VIDEO_SRC;
          v.play().catch(() => {});
        });
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="services" className="bg-haka-sky">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Eyebrow>What we build</Eyebrow>
          <h2 className="font-display mt-4 text-4xl leading-[1.04] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Decks, Pergolas &amp; Outdoor Living — designed for how you actually live.
          </h2>
          <p className="text-foreground/75 mt-6 max-w-xl text-base leading-relaxed">
            Every Haka build starts with a conversation about how you use your backyard — and ends
            with an outdoor space your neighbors ask about.
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {TILES.map((t) => (
              <li key={t.title}>
                <p className="font-display text-lg font-medium tracking-tight">{t.title}</p>
                <p className="text-foreground/70 mt-1 text-sm leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/portfolio">
                View Portfolio
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 px-6 text-base">
              <Link href="/services">All services</Link>
            </Button>
          </div>
        </div>

        <div className="border-border/40 relative aspect-[5/6] overflow-hidden rounded-2xl border shadow-2xl shadow-black/30">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            muted
            loop
            preload="none"
            poster={POSTER}
            aria-hidden
          />
          <div
            aria-hidden
            className="from-background/40 absolute inset-0 bg-gradient-to-t to-transparent"
          />
        </div>
      </div>
    </Section>
  );
}
