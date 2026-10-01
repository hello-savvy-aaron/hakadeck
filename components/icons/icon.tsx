import type { CSSProperties, SVGProps } from "react";
import { cn } from "@/lib/utils";
import type { IconName } from "./icon-names";

// A lucide icon drawn from the site sprite (public/icons.svg) with one <use>
// instead of lucide-react's inline paths. Every server-rendered icon used to
// cost ~400 bytes of HTML; a <use> costs ~90, and the sprite itself is one
// cached request shared by every page. The lucide presentation defaults
// (24px, no fill, 2px round strokes) live in the `.lucide` rule in
// globals.css, where ordinary Tailwind utilities (h-4, size-4, fill-current)
// still override them. Icons are decorative — they always sit next to text —
// so they are hidden from assistive tech, as lucide-react's were.
//
// Add a name to components/icons/icon-names.ts and run `npm run icons` to
// bring a new icon into the sprite.
export function Icon({
  name,
  className,
  strokeWidth,
  style,
  ...props
}: {
  name: IconName;
  strokeWidth?: number;
} & Omit<SVGProps<SVGSVGElement>, "name" | "strokeWidth">) {
  const merged: CSSProperties | undefined = strokeWidth ? { ...style, strokeWidth } : style;
  return (
    <svg className={cn("lucide", className)} aria-hidden="true" style={merged} {...props}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
