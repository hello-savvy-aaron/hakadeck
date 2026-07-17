import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { RedditPixel } from "@/components/analytics/reddit-pixel";
import { CtaAnalytics } from "@/components/analytics/cta-analytics";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Lead with the primary category + "Denver" (the head-term the site was
// ranking ~#60 for with no strong target). The /locations/denver hub owns the
// deep "custom decks denver" intent; the homepage just stops hiding "Denver"
// behind "Denver Tech Center" (which still leads the local-intro + NAP copy).
// Lands the title in the 50–60 char SERP sweet spot.
const homeTitle = `${site.name} — Custom Deck Builder in Denver, CO`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Pete Borlase" }],
  creator: site.name,
  publisher: site.name,
  // No canonical here on purpose. Next merges metadata root → leaf, so a
  // canonical set on the root layout is *inherited* by every child route that
  // doesn't override it — pointing them all at "/". Each route now declares its
  // own self-referencing canonical instead (home included).
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: homeTitle,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
  },
  verification: {
    // Bing Webmaster Tools — must stay in place to keep the site verified.
    other: {
      "msvalidate.01": "19724853BB7CB3D0C416D573EA9E0F02",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f0f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={site.gaId} />
        <RedditPixel pixelId={site.redditPixelId} />
        <CtaAnalytics />
      </body>
    </html>
  );
}
