import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js). Mounted once in the root layout so it loads on
 * every route. GA4 enhanced measurement reports client-side navigations as
 * pageviews automatically, so no manual route tracking is needed.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
