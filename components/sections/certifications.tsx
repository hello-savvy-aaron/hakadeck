import Image from "next/image";
import { Award, ShieldCheck, Sparkles } from "lucide-react";
import { Eyebrow, Section } from "./section";

const PILLARS = [
  {
    icon: Award,
    title: "Pro Elite with Deckorators",
    body:
      "Deckorators Certified Pro Elite Installer. We build with the most trusted composite brands in the industry — and every install is backed by our own craftsmanship guarantee.",
  },
  {
    icon: ShieldCheck,
    title: "All Work Guaranteed",
    body:
      "We guarantee everything we build. If something isn't right, we make it right — no fine print, no fight. Our name goes on every project, so we stand behind all of it.",
  },
  {
    icon: Sparkles,
    title: "We Don't Stop Until You're Happy",
    body:
      "We're perfectionists. If we think the work isn't perfect, we'll come back a year later to fix it. We won't quit until you're thrilled — happy is the only finish line.",
  },
];

const LOGOS: { src: string; alt: string; invert?: boolean }[] = [
  { src: "/images/certs/deckorators-pro-elite.jpg", alt: "Deckorators Certified Pro Elite Installer badge" },
  { src: "/images/certs/trex-platinum.png", alt: "Trex Platinum Pro contractor badge" },
  { src: "/images/certs/timber-tech.jpg", alt: "TimberTech Authorized Dealer badge" },
  {
    src: "/images/brand/haka-badge.png",
    alt: "Haka Decks logo — custom deck builder in Centennial, Colorado",
    invert: true,
  },
];

export function Certifications() {
  return (
    <Section id="certifications">
      <Eyebrow>Credentials</Eyebrow>
      <h2 className="font-display mt-4 max-w-3xl text-balance text-4xl leading-[1.06] font-medium tracking-tight sm:text-5xl lg:text-[3.5rem]">
        Certified by the people who make the materials we build with.
      </h2>

      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="space-y-4">
            <p.icon className="text-haka-cream h-11 w-11" strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-medium tracking-tight">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {LOGOS.map((logo) => (
          <div
            key={logo.src}
            className="border-border/50 bg-card flex h-32 items-center justify-center rounded-2xl border px-6 py-5"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={240}
              height={96}
              className={`h-16 w-auto max-w-[90%] object-contain ${logo.invert ? "invert" : ""}`}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
