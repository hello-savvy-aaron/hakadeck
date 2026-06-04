import { FAQS } from "@/lib/faqs";

// FAQPage structured data for the home page. Answer text is pulled from the
// same FAQS array the visible accordion renders, so the schema and the copy
// stay in sync (a Google requirement for FAQ rich results). The `<`
// escape sanitizes any `<` per the Next.js JSON-LD guidance.
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
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
