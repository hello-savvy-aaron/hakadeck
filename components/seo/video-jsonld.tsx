import { site } from "@/lib/site";
import { BUSINESS_ID, LOGO_URL } from "@/components/seo/local-business-jsonld";
import type { ProjectVideo } from "@/lib/portfolio";

// VideoObject JSON-LD for a clip's watch page, and only that page: Google
// indexes a video solely where it is the page's main content, and this same
// markup on a page that merely features the clip is what Search Console
// reports as "Video isn't on a watch page". Publisher references the site-wide
// business entity by @id (see LocalBusinessJsonLd).
export function VideoJsonLd({ video }: { video: ProjectVideo }) {
  const url = `${site.url}${video.path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: `${site.url}${video.poster}`,
    contentUrl: `${site.url}${video.src}`,
    encodingFormat: "video/mp4",
    uploadDate: video.uploadDate,
    duration: `PT${video.durationSeconds}S`,
    isFamilyFriendly: true,
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
