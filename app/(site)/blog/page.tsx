import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/sections/section";
import { PostCard } from "@/components/blog/post-card";
import { CtaFinal } from "@/components/sections/cta-final";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Plain-spoken guides on decking materials, Colorado climate, warranties, and what actually breaks decks here.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

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
      </Section>

      <Section top="none">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaFinal
        heading="Got a question we haven't answered yet?"
        body="If you've got a question about Colorado decks that isn't covered above, send it our way. Pete reads every message."
      />
    </>
  );
}
