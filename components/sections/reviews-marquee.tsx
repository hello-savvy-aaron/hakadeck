import Image from "next/image";
import { Star } from "lucide-react";
import { Eyebrow, Section } from "./section";
import { site } from "@/lib/site";

const REVIEWS = [
  {
    src: "/images/reviews/review-1.png",
    alt: "Five-star Google review for Haka Decks from a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-2.png",
    alt: "Five-star Google review for Haka Decks from a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-3.png",
    alt: "Five-star Google review for Haka Decks from a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-5.png",
    alt: "Five-star Google review for Haka Decks from a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-6.png",
    alt: "Five-star Google review for Haka Decks from a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-7.png",
    alt: "Five-star Google review for Haka Decks from a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-8.png",
    alt: "Five-star Google review for Haka Decks from a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-jc.png",
    alt: "Five-star Google review for Haka Decks from JC, a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-derrick.png",
    alt: "Five-star Google review for Haka Decks from Derrick, a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-brad.png",
    alt: "Five-star Google review for Haka Decks from Brad, a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-louis.png",
    alt: "Five-star Google review for Haka Decks from Louis, a Colorado homeowner",
  },
  {
    src: "/images/reviews/review-sue.png",
    alt: "Five-star Google review for Haka Decks from Sue, a Colorado homeowner",
  },
];

export function ReviewsMarquee() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <Section className="bg-haka-pine overflow-hidden text-white" innerClassName="!px-0 max-w-none">
      <div className="mx-auto mb-14 max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-white/90">What homeowners say</Eyebrow>
            <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.06] font-medium tracking-tight text-balance sm:text-5xl">
              100% 5-star reviews. Satisfaction is truly guaranteed.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm backdrop-blur transition-colors hover:bg-white/20"
            >
              <span className="font-semibold">{site.rating.value.toFixed(1)}</span>
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="text-haka-gold h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="text-white/90">({site.rating.count}) on Google</span>
            </a>
            <a
              href={site.reviewWriteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-haka-pine inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-white/90"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              Leave a review
            </a>
          </div>
        </div>
      </div>

      <div className="marquee group relative" data-pausable>
        <div className="marquee-track">
          {doubled.map((review, i) => {
            // Every image carries descriptive alt for SEO/graders; the duplicate
            // pass that seeds the seamless loop is aria-hidden so assistive tech
            // doesn't announce each review twice.
            const isDuplicate = i >= REVIEWS.length;
            return (
              <Image
                key={`${review.src}-${i}`}
                src={review.src}
                alt={review.alt}
                aria-hidden={isDuplicate || undefined}
                width={520}
                height={320}
                className="bg-card border-border/40 mx-4 h-auto w-[340px] shrink-0 rounded-xl border object-cover shadow-2xl shadow-black/30 sm:w-[460px]"
              />
            );
          })}
        </div>
      </div>
    </Section>
  );
}
