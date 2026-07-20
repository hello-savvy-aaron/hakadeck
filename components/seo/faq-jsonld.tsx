import { FAQS, type Faq } from "@/lib/faqs";

// FAQPage structured data. Answer text is pulled from the same array the
// visible <Faq> accordion renders, so the schema and the copy stay in sync
// (a Google requirement for FAQ rich results). Defaults to the home-page
// FAQS; service/location pages pass their own per-page set. The `<`
// escape sanitizes any `<` per the Next.js JSON-LD guidance.
export function FaqJsonLd({ faqs = FAQS }: { faqs?: Faq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
