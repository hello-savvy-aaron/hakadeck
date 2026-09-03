import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { PostCard } from "@/components/blog/post-card";
import { CtaFinal } from "@/components/sections/cta-final";
import { getAllPosts, type PostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Plain-spoken guides on decking materials, Colorado climate, warranties, and what actually breaks decks here.",
  alternates: { canonical: "/blog" },
};

// Render order for the category sections. Every post carries one of these
// categories (content:validate doesn't enforce it, so unknown categories fall
// through to the end rather than vanish).
const CATEGORY_ORDER = [
  "Repair & Maintenance",
  "Cost & Budget",
  "Design & Materials",
  "Covers & Pergolas",
  "Hiring, Permits & Warranties",
];

const CATEGORY_BLURBS: Record<string, string> = {
  "Repair & Maintenance": "Symptoms, fixes, and honest repair-vs-replace calls for aging decks.",
  "Cost & Budget": "Real 2026 Denver-metro numbers — per-square-foot ranges, labor, financing.",
  "Design & Materials": "Composite vs. wood, brand comparisons, and designs that fit Colorado lots.",
  "Covers & Pergolas": "Roofs, pergolas, and screened rooms — what shelter actually costs and solves.",
  "Hiring, Permits & Warranties": "How to vet a builder, what your city requires, what's covered.",
};

function categoryAnchor(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function BlogIndex() {
  const posts = await getAllPosts();

  const grouped = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const list = grouped.get(post.category) ?? [];
    list.push(post);
    grouped.set(post.category, list);
  }
  const categories = [
    ...CATEGORY_ORDER.filter((c) => grouped.has(c)),
    ...[...grouped.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Field Notes</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-8xl">
          What we&apos;ve learned building decks here.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Plain-spoken guides on materials, climate, warranties, and the questions homeowners ask
          Pete most.
        </p>

        <nav aria-label="Post categories" className="mt-8 flex flex-wrap gap-2.5">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${categoryAnchor(category)}`}
              className="border-border/60 text-foreground/85 hover:border-foreground/40 hover:text-foreground rounded-full border px-4 py-1.5 text-sm transition-colors"
            >
              {category}
              <span className="text-muted-foreground ml-1.5">{grouped.get(category)!.length}</span>
            </a>
          ))}
        </nav>
      </Section>

      {categories.map((category, i) => (
        <Section key={category} id={categoryAnchor(category)} top="none" bottom={i === categories.length - 1 ? undefined : "tight"}>
          <Eyebrow>{category}</Eyebrow>
          <SectionHeading className="mt-3 text-2xl sm:text-3xl">
            {CATEGORY_BLURBS[category] ?? ""}
          </SectionHeading>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.get(category)!.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <CtaFinal
        heading="Got a question we haven't answered yet?"
        body="If you've got a question about Colorado decks that isn't covered above, send it our way. Pete reads every message."
      />
    </>
  );
}
