"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const VIDEO_SRC = "/assets/projects/ranch-drone/drone.mp4";
const POSTER = "/assets/projects/ranch-drone/drone-poster.jpeg";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        preload="metadata"
        poster={POSTER}
        aria-hidden
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="from-background/85 via-background/20 absolute inset-0 -z-10 bg-gradient-to-t to-transparent"
      />
      <div
        aria-hidden
        className="from-background/50 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-24 lg:pb-32">
        <div className="max-w-4xl">
          <a
            href={site.reviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="border-border/60 bg-background/60 hover:bg-background/80 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm backdrop-blur-md transition-colors"
          >
            <span className="font-semibold">{site.rating.value.toFixed(1)}</span>
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="text-haka-cream h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-foreground/80">
              ({site.rating.count}) Google Reviews
            </span>
          </a>

          <h1 className="font-display mt-8 text-balance text-5xl leading-[0.95] font-medium tracking-tight sm:text-7xl lg:text-[6.5rem] xl:text-[7.5rem]">
            Custom Colorado Decks.
          </h1>

          <p className="text-foreground/85 mt-7 max-w-xl text-lg leading-relaxed sm:text-xl">
            Composite, hardwood, and covered — engineered for altitude,
            built around how Denver homes actually live.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href={site.cta.href}>
                {site.cta.label}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link href="/portfolio">See our work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
