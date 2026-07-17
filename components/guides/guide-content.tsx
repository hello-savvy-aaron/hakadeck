import { cn } from "@/lib/utils";

// Editorial primitives for the inside of a guide's white content card. Compact,
// deliberately not `prose` — the design uses tighter type than the blog. First
// child drops its top margin so the card padding controls the top inset.

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground text-[15px] leading-[1.65] [&:not(:first-child)]:mt-5">
      {children}
    </p>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-foreground mt-6 mb-2.5 text-[1.3125rem] font-medium tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-foreground mb-3.5 text-[14.5px] leading-[1.65]">{children}</p>;
}

export function Muted({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground mb-3 text-[14px] leading-relaxed">{children}</p>;
}

// Sky-background orientation note — the "this is planning data, not a bid" box.
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary text-muted-foreground rounded-lg px-3.5 py-3 text-[13px] leading-relaxed">
      {children}
    </div>
  );
}

// Stat rows — Cream pills with a label and a bold right-aligned value.
export function StatRows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className="bg-haka-smoke flex items-center justify-between gap-3.5 rounded-lg px-3.5 py-2.5 text-sm"
        >
          <span className="text-foreground">{r.label}</span>
          <b className="text-foreground font-semibold whitespace-nowrap">{r.value}</b>
        </div>
      ))}
    </div>
  );
}

// Data table with a Sky header row. `cols` sets the grid template (defaults to
// the 3-column layout the guides use).
export function DataTable({
  headers,
  rows,
  cols = "auto 1fr 1fr",
}: {
  headers: string[];
  rows: string[][];
  cols?: string;
}) {
  return (
    <div
      className="border-border mb-5 grid overflow-hidden rounded-[10px] border text-[13.5px]"
      style={{ gridTemplateColumns: cols }}
    >
      {headers.map((h, i) => (
        <div key={`h${i}`} className="bg-secondary text-foreground px-3.5 py-3 font-semibold">
          {h}
        </div>
      ))}
      {rows.map((row, ri) =>
        row.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            className={cn(
              "border-border text-foreground border-t px-3.5 py-3",
              ci === 0 && "font-semibold",
            )}
          >
            {cell}
          </div>
        )),
      )}
    </div>
  );
}

// The "where the money goes" weighted breakdown bar.
export function CostBar({
  eyebrow,
  segments,
  caption,
}: {
  eyebrow: string;
  segments: { weight: number; className: string }[];
  caption: React.ReactNode;
}) {
  return (
    <div className="bg-secondary mb-5 rounded-lg px-4 py-3.5">
      <div className="text-foreground/60 mb-2 text-xs tracking-[0.06em] uppercase">{eyebrow}</div>
      <div className="mb-1.5 flex gap-1">
        {segments.map((s, i) => (
          <div
            key={i}
            className={cn("h-2.5 rounded-full", s.className)}
            style={{ flexGrow: s.weight }}
          />
        ))}
      </div>
      <div className="text-foreground text-xs leading-relaxed">{caption}</div>
    </div>
  );
}

// Numbered steps (permit process) — serif teal numeral + body.
export function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="mb-5 flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-[auto_1fr] items-baseline gap-3.5">
          <span className="font-display text-primary font-semibold">{i + 1}</span>
          <span className="text-foreground text-[14.5px] leading-[1.55]">{item}</span>
        </div>
      ))}
    </div>
  );
}
