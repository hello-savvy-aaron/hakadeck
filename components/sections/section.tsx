import { cn } from "@/lib/utils";

type Pad = "default" | "tight" | "loose" | "none";

// Padding scales live in globals.css (.sec-t*, .sec-b*, .sec-inner) — a
// class name per section instead of eight utilities, on every section of
// every page. Utilities passed in className still override them.
const TOP: Record<Pad, string> = {
  default: "sec-t",
  tight: "sec-t-tight",
  loose: "sec-t-loose",
  none: "",
};

const BOTTOM: Record<Pad, string> = {
  default: "sec-b",
  tight: "sec-b-tight",
  loose: "sec-b-loose",
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
      <div className={cn("sec-inner", innerClassName)}>{children}</div>
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
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn("section-heading", className)}>{children}</h2>;
}
