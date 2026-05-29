import Image from "next/image";
import { Star } from "lucide-react";
import { Eyebrow, Section } from "./section";
import { site } from "@/lib/site";

const REVIEWS = [
  "/assets/reviews/review-1.png",
  "/assets/reviews/review-2.png",
  "/assets/reviews/review-3.png",
  "/assets/reviews/review-5.png",
  "/assets/reviews/review-6.png",
  "/assets/reviews/review-7.png",
  "/assets/reviews/review-8.png",
  "/assets/reviews/review-jc.png",
  "/assets/reviews/review-derrick.png",
  "/assets/reviews/review-brad.png",
  "/assets/reviews/review-louis.png",
  "/assets/reviews/review-sue.png",
];

export function ReviewsMarquee() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <Section className="bg-haka-pine overflow-hidden text-white" innerClassName="!px-0 max-w-none">
      <div className="mx-auto mb-14 max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-white/90">What homeowners say</Eyebrow>
            <h2 className="font-display mt-4 max-w-2xl text-balance text-4xl leading-[1.06] font-medium tracking-tight sm:text-5xl">
              A handshake, a walkthrough, and a homeowner who can&apos;t wait to host.
            </h2>
          </div>
          <a
            href={site.reviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm backdrop-blur transition-colors hover:bg-white/20"
          >
            <span className="font-semibold">{site.rating.value.toFixed(1)}</span>
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="text-haka-almond h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-white/90">({site.rating.count}) on Google</span>
          </a>
        </div>
      </div>

      <div className="marquee group relative" data-pausable>
        <div className="marquee-track">
          {doubled.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt=""
              width={520}
              height={320}
              className="bg-card border-border/40 mx-4 h-auto w-[340px] shrink-0 rounded-xl border object-cover shadow-2xl shadow-black/30 sm:w-[460px]"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
