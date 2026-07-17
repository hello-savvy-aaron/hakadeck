import Link from "next/link";
import { cn } from "@/lib/utils";

// Pill chip — "GUIDE · PDF" / "GALLERY". `bright` = Bright Sky accent (featured
// card), `muted` = Sky secondary surface (list rows).
export function Chip({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: "bright" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.06em] whitespace-nowrap",
        tone === "bright" ? "bg-haka-sky text-haka-ink" : "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

// One numbered guide row in the list (landing section + hub). Whole row links to
// the guide; hairline top border, with an optional bottom border on the last.
export function GuideRow({
  number,
  title,
  blurb,
  chip,
  href,
  showBlurb = true,
  last = false,
}: {
  number: string;
  title: string;
  blurb: string;
  chip: string;
  href: string;
  showBlurb?: boolean;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "border-border group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t py-5",
        last && "border-b",
      )}
    >
      <span className="font-display text-primary text-sm">{number}</span>
      <span>
        <span className="font-display text-foreground group-hover:text-haka-pine mb-1 block text-[1.1875rem] font-medium tracking-tight transition-colors">
          {title}
        </span>
        {showBlurb ? (
          <span className="text-muted-foreground mb-1.5 block text-[13.5px] leading-relaxed">
            {blurb}
          </span>
        ) : null}
        <Chip>{chip}</Chip>
      </span>
      <span className="text-primary group-hover:text-haka-pine text-[17px] transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
