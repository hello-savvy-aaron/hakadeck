import { cn } from "@/lib/utils";

type Pad = "default" | "tight" | "loose" | "none";

const TOP: Record<Pad, string> = {
  default: "pt-14 sm:pt-20 lg:pt-24",
  tight: "pt-12 sm:pt-16 lg:pt-20",
  loose: "pt-32 sm:pt-40 lg:pt-44",
  none: "",
};

const BOTTOM: Record<Pad, string> = {
  default: "pb-14 sm:pb-20 lg:pb-24",
  tight: "pb-8 sm:pb-12 lg:pb-16",
  loose: "pb-32 sm:pb-40 lg:pb-44",
  none: "",
};

export function Section({
  id,
  className,
  children,
  innerClassName,
  top = "default",
  bottom = "default",
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  innerClassName?: string;
  top?: Pad;
  bottom?: Pad;
}) {
  return (
    <section id={id} className={cn(TOP[top], BOTTOM[bottom], className)}>
      <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", innerClassName)}>{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-foreground/60 text-xs font-medium tracking-[0.18em] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-4xl leading-[1.04] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
