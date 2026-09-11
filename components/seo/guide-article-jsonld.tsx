import { site } from "@/lib/site";
import { BUSINESS_ID, FOUNDER_ID, LOGO_URL } from "@/components/seo/local-business-jsonld";

// Article JSON-LD for standalone guide pages (non-/blog paths). Same shape as
// the blog's ArticleJsonLd but takes the full site-relative path. Author and
// publisher reference the site-wide entities by @id (see ArticleJsonLd).
export function GuideArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  /** Site-root-relative path, e.g. "/deck-cost-guide-denver". */
  path: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  const url = `${site.url}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    image: image ? `${site.url}${image}` : LOGO_URL,
    datePublished,
    dateModified,
    inLanguage: "en-US",
    isAccessibleForFree: true,
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
