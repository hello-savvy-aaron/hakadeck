import Image from "next/image";

const LOGOS = [
  { src: "/images/certs/trex-logo.jpg", alt: "Trex" },
  { src: "/images/certs/trex-platinum.png", alt: "Trex Platinum Pro" },
  { src: "/images/certs/timber-tech.jpg", alt: "TimberTech" },
  { src: "/images/certs/deckorators-pro-elite.jpg", alt: "Deckorators Pro Elite" },
];

const WORDMARKS = ["Fortress", "Westbury", "AZEK", "Fiberon", "Wolf"];

export function BrandLogoMarquee() {
  const items = [...LOGOS, ...WORDMARKS.map((label) => ({ label }))];
  const doubled = [...items, ...items, ...items];
  return (
    <section
      aria-label="Brands we install"
      className="border-border/30 bg-card/40 overflow-hidden border-y py-10"
    >
      <div className="marquee" data-pausable>
        <div className="marquee-track marquee-slow items-center">
          {doubled.map((item, i) =>
            "src" in item ? (
              <Image
                key={`${item.src}-${i}`}
                src={item.src}
                alt={item.alt}
                width={140}
                height={40}
                className="mx-10 h-7 w-auto shrink-0 object-contain opacity-60 grayscale"
              />
            ) : (
              <span
                key={`${item.label}-${i}`}
                className="text-foreground/40 font-display mx-10 shrink-0 text-2xl font-medium tracking-tight whitespace-nowrap uppercase"
              >
                {item.label}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
