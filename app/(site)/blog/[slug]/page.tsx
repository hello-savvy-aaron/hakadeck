import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Eyebrow, Section } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { getAllPosts, getPost } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Section top="loose" bottom="tight">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Field Notes
        </Link>

        <div className="mt-8 max-w-3xl">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="font-display mt-4 text-balance text-4xl leading-[1.04] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <div className="text-muted-foreground mt-6 flex items-center gap-3 text-sm">
            <time dateTime={post.date}>{date}</time>
            <span aria-hidden>•</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </Section>

      {post.cover ? (
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="border-border/40 relative aspect-[16/9] overflow-hidden rounded-2xl border">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(min-width: 1280px) 1100px, 92vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      ) : null}

      <Section top="tight">
        <article className="prose prose-invert prose-haka mx-auto max-w-3xl">
          <MDXRemote source={post.body} />
        </article>
      </Section>

      <CtaFinal />
    </>
  );
}
