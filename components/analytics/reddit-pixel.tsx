"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackReddit } from "@/lib/reddit";

/**
 * Reddit Ads Pixel. Mounted once in the root layout so it loads on every route.
 *
 * The inline snippet is Reddit's standard base code: it defines the `rdt`
 * command queue, async-loads pixel.js, runs `init`, and fires the first
 * `PageVisit`. Unlike GA4's enhanced measurement, the Reddit pixel does not
 * auto-track client-side navigations, so we re-fire `PageVisit` on each pathname
 * change — skipping the initial render, which the inline snippet already counted.
 */
export function RedditPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!pixelId) return;
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    trackReddit("PageVisit");
  }, [pathname, pixelId]);

  if (!pixelId) return null;

  return (
    <Script id="reddit-pixel" strategy="afterInteractive">
      {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${pixelId}');rdt('track','PageVisit');`}
    </Script>
  );
}
