import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { GuidesLanding } from "@/components/guides/guides-landing";
import { Certifications } from "@/components/sections/certifications";
import { ServicesPreview } from "@/components/sections/services-preview";
import { ReviewsMarquee } from "@/components/sections/reviews-marquee";
import { Faq } from "@/components/sections/faq";
import { CtaFinal } from "@/components/sections/cta-final";
import { Reveal } from "@/components/reveal";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";

export const metadata: Metadata = {
  // Title/description/OG are inherited from the root layout; home only needs to
  // declare its own canonical now that the root no longer sets one.
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd />
      <Hero />
      <Reveal>
        <GuidesLanding />
      </Reveal>
      <ReviewsMarquee />
      <Reveal>
        <ServicesPreview />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <CtaFinal />
      <Reveal>
        <Certifications />
      </Reveal>
    </>
  );
}
