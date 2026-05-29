import Image from "next/image";
import { Award, Calendar, Hammer } from "lucide-react";
import { Eyebrow, Section } from "./section";

const PILLARS = [
  {
    icon: Award,
    title: "Pro Elite with Deckorators",
    body:
      "Deckorators Certified Pro Elite Installer. We install the most trusted composite brands in the industry — backed by 25-year manufacturer warranties on top of our own craftsmanship guarantee.",
  },
  {
    icon: Calendar,
    title: "Serving Denver since 2017",
    body:
      "Nearly a decade designing and building outdoor spaces engineered for Colorado's freeze-thaw, hail, and high-altitude UV.",
  },
  {
    icon: Hammer,
    title: "The Haka Construction Family",
    body:
      "Haka Deck is the residential outdoor arm of Haka Construction — a full-service team with the bench depth to handle structural work most deck builders subcontract out.",
  },
];

const LOGOS = [
  { src: "/assets/certs/deckorators-pro-elite.jpg", alt: "Deckorators Pro Elite Installer" },
  { src: "/assets/certs/trex-platinum.png", alt: "Trex Platinum Pro" },
  { src: "/assets/certs/timber-tech.jpg", alt: "TimberTech Authorized Dealer" },
  { src: "/assets/certs/trex-logo.jpg", alt: "Trex" },
];

export function Certifications() {
  return (
    <Section className="bg-card/40 border-border/30 border-y" id="certifications">
      <Eyebrow>Credentials</Eyebrow>
      <h2 className="font-display mt-4 max-w-3xl text-balance text-4xl leading-[1.06] font-medium tracking-tight sm:text-5xl lg:text-[3.5rem]">
        Certified by the people who make the materials we build with.
      </h2>

      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="space-y-4">
            <p.icon className="text-haka-cream h-7 w-7" strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-medium tracking-tight">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="border-border/40 mt-20 flex flex-wrap items-center justify-around gap-x-12 gap-y-8 border-t pt-12 opacity-90">
        {LOGOS.map((logo) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={160}
            height={64}
            className="h-12 w-auto object-contain grayscale opacity-70 transition hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </Section>
  );
}
