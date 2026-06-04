import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
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

// Lead with the primary category + city so the home <title> matches local
// "deck builder in Centennial" searches (per the GMB audit). Spelled-out
// "Custom … Colorado" lands the title in the 50–60 char SERP sweet spot.
const homeTitle = `${site.name} — Custom Deck Builder in ${site.address.city}, Colorado`;

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
  alternates: { canonical: "/" },
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
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground font-sans flex min-h-full flex-col">
        {children}
        <Analytics />
        <GoogleAnalytics gaId={site.gaId} />
      </body>
    </html>
  );
}
