import { Hero } from "@/components/sections/hero";
import { StatsCounter } from "@/components/sections/stats-counter";
import { Certifications } from "@/components/sections/certifications";
import { ServicesPreview } from "@/components/sections/services-preview";
import { ReviewsMarquee } from "@/components/sections/reviews-marquee";
import { Faq } from "@/components/sections/faq";
import { CtaFinal } from "@/components/sections/cta-final";
import { Reveal } from "@/components/reveal";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <Reveal>
        <StatsCounter />
      </Reveal>
      <Reveal>
        <ServicesPreview />
      </Reveal>
      <Reveal>
        <Certifications />
      </Reveal>
      <ReviewsMarquee />
      <Reveal>
        <Faq />
      </Reveal>
      <CtaFinal />
    </>
  );
}
