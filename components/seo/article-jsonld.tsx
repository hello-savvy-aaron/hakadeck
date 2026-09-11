import { site } from "@/lib/site";
import { BUSINESS_ID, FOUNDER_ID, LOGO_URL } from "@/components/seo/local-business-jsonld";

// BlogPosting JSON-LD for blog detail pages — makes posts eligible for
// Article rich results (author, published date, publisher). Pairs with the
// BreadcrumbList emitted separately on the same page. Author and publisher
// point at the site-wide entities by @id (with name inline, which Google's
// Article guidelines still want) so every post credits the same Pete Borlase
// and the same Haka Decks node instead of a per-page copy.
export function ArticleJsonLd({
  title,
  description,
  date,
  updated,
  slug,
  cover,
  category,
  wordCount,
}: {
  title: string;
  description: string;
  date: string;
  /** Last substantive edit, YYYY-MM-DD. Falls back to `date`. */
  updated?: string;
  slug: string;
  cover?: string;
  category?: string;
  wordCount?: number;
}) {
  const url = `${site.url}/blog/${slug}`;
  const image = cover ? (cover.startsWith("http") ? cover : `${site.url}${cover}`) : LOGO_URL;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    image,
    datePublished: date,
    dateModified: updated ?? date,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    ...(category ? { articleSection: category } : {}),
    ...(wordCount ? { wordCount } : {}),
    author: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Pete Borlase",
      url: `${site.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      name: site.name,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
