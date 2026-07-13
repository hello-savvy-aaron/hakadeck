"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { trackGa } from "@/lib/gtag";
import { site } from "@/lib/site";

// Site-wide click tracking for the two primary CTAs — "Call" and "Get a Quote".
//
// Both render across a dozen server and client components (header, hero, final
// CTA, service/location pages, footer, FAQ), always pointing at the same two
// destinations. Rather than thread an onClick into every one, we listen once at
// the document and classify clicks by where the anchor points:
//   • any `tel:` link      → a "Call" (every phone link is call intent)
//   • any link to /contact → a "Get a Quote" (the CTA is the only thing that
//     routes there — verified no other /contact links exist)
//
// Each click is reported to both GA4 (via gtag — free, unlimited custom events;
// this is where the counts actually land for reporting) and Vercel Web
// Analytics (custom events need a paid plan, so a no-op on Hobby but harmless).
// Every event is tagged with the page it fired on, so Pete can see which pages
// drive calls and quote requests.
export function CtaAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      if (anchor.protocol === "tel:") {
        trackGa("call_click", { source: pathname });
        track("Call clicked", { source: pathname });
      } else if (
        (anchor.protocol === "http:" || anchor.protocol === "https:") &&
        anchor.pathname === site.cta.href
      ) {
        trackGa("quote_click", { source: pathname });
        track("Get a Quote clicked", { source: pathname });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
