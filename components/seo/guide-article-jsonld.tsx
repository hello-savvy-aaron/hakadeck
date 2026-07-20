import { site } from "@/lib/site";

// Article JSON-LD for standalone guide pages (non-/blog paths). Same shape as
// the blog's ArticleJsonLd but takes the full site-relative path.
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
    headline: title,
    description,
    image: image ? `${site.url}${image}` : `${site.url}/images/brand/haka-badge.png`,
    datePublished,
    dateModified,
    author: { "@type": "Person", name: "Pete Borlase", url: `${site.url}/about` },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/brand/haka-badge.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
