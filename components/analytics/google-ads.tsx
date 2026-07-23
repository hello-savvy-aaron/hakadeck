import Script from "next/script";

/**
 * Google Ads tag. This does NOT load gtag.js again — it reuses the single
 * loader mounted by GoogleAnalytics (see google-analytics.tsx) and just
 * registers the Ads account as an additional destination on the shared
 * `dataLayer`/`gtag` queue. This is Google's "use an existing Google tag"
 * setup: one gtag.js on the page, multiple `config` destinations.
 *
 * Because `dataLayer` is a queue that gtag.js drains once it loads, the order
 * these inline configs run in doesn't matter. The one requirement is that some
 * gtag.js loader is present — i.e. GA4 (site.gaId) stays enabled. If GA4 is
 * ever removed, restore a loader here.
 */
export function GoogleAds({ adsId }: { adsId: string }) {
  if (!adsId) return null;

  return (
    <Script id="gtag-ads-init" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('config', '${adsId}');`}
    </Script>
  );
}
