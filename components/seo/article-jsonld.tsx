import { site } from "@/lib/site";

// BlogPosting JSON-LD for blog detail pages — makes posts eligible for
// Article rich results (author, published date, publisher). Pairs with the
// BreadcrumbList emitted separately on the same page.
export function ArticleJsonLd({
  title,
  description,
  date,
  slug,
  cover,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  cover?: string;
}) {
  const url = `${site.url}/blog/${slug}`;
  const image = cover
    ? cover.startsWith("http")
      ? cover
      : `${site.url}${cover}`
    : `${site.url}/images/brand/haka-badge.png`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    datePublished: date,
    dateModified: date,
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
