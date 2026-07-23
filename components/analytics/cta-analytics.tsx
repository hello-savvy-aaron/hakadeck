"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { trackGa } from "@/lib/gtag";
import { trackAdsConversion } from "@/lib/google-ads";
import { trackReddit } from "@/lib/reddit";
import { site } from "@/lib/site";

// Site-wide click tracking for the two primary CTAs — "Call" and "Get a Quote".
//
// Both render across a dozen server and client components (header, hero, final
// CTA, service/location pages, footer, FAQ), always pointing at the same two
// destinations. Rather than thread an onClick into every one, we listen once at
// the document and classify clicks by where the anchor points:
//   • any `tel:` link      → a "Call" (every phone link is call intent)
//   • any `mailto:` link   → an "Email" (footer + contact page both link the
//     one address; every mailto on the site is contact intent)
//   • any link to /contact → a "Get a Quote" (the CTA is the only thing that
//     routes there — verified no other /contact links exist)
//
// Each click is reported to both GA4 (via gtag — free, unlimited custom events;
// this is where the counts actually land for reporting) and Vercel Web
// Analytics (custom events need a paid plan, so a no-op on Hobby but harmless).
// Every event is tagged with the page it fired on, so Pete can see which pages
// drive calls and quote requests.
//
// Phone clicks additionally fire the Google Ads "Click to call" conversion
// (site.googleAdsConversions.call) so the Ads account records calls started from
// the site, matching the conversion action set up in Google Ads.
//
// Call and email clicks are additionally mirrored to Reddit Ads as a `Lead`
// conversion. Most quote requests arrive by phone or email, not through the
// form, so without this the ad platform only ever sees the minority of leads
// that submit `contact-form.tsx` and badly undercounts campaign performance.
// Both are terminal actions — nothing else fires afterwards — so each maps to
// exactly one `Lead`. Quote clicks are deliberately NOT mirrored: they only
// signal intent to open /contact, and the form fires its own `Lead` on actual
// submit — counting both would double-report a single lead.
export function CtaAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      if (anchor.protocol === "tel:") {
        trackGa("call_click", { source: pathname });
        track("Call clicked", { source: pathname });
        trackReddit("Lead");
        // Google Ads "Click to call" conversion. Value mirrors Google's event
        // snippet; every tel: click is call intent (see the tel: note above).
        trackAdsConversion(site.googleAdsConversions.call, {
          value: 1.0,
          currency: "USD",
        });
      } else if (anchor.protocol === "mailto:") {
        trackGa("email_click", { source: pathname });
        track("Email clicked", { source: pathname });
        trackReddit("Lead");
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
