"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { shouldLoadHeavyVideo } from "@/lib/heavy-media";
import type { ProjectVideo } from "@/lib/portfolio";

// The flyover as the project page's hero: an ambient muted loop on desktop
// visits that can absorb it, the poster everywhere else (shouldLoadHeavyVideo —
// the same rule as the homepage hero). The markup ships sourceless on purpose:
// Google indexes a video only where it is the page's main content, so the
// clip's crawlable home is the watch page this links to, and this element
// never exposes the file for a crawler to flag as "not on a watch page".
export function ProjectFlyover({ video }: { video: ProjectVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !shouldLoadHeavyVideo()) return;
    v.src = video.src;
    v.play().catch(() => {});
  }, [video.src]);

  return (
    <div className="border-border/40 relative aspect-[16/9] overflow-hidden rounded-2xl border">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
        loop
        preload="none"
        poster={video.poster}
        aria-hidden
      />
      <Link
        href={video.path}
        className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-black/80 sm:bottom-6 sm:left-6"
      >
        <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
        Watch the drone flyover ({video.durationLabel})
      </Link>
    </div>
  );
}
