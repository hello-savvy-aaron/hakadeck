import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group border-border/40 bg-card/40 hover:border-border block overflow-hidden rounded-2xl border transition-colors"
    >
      {post.cover ? (
        <div className="bg-muted relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="space-y-3 p-6">
        <div className="text-muted-foreground flex items-center gap-3 text-xs tracking-widest uppercase">
          <span>{post.category}</span>
          <span aria-hidden>•</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3 className="font-display text-balance text-xl leading-tight font-medium tracking-tight sm:text-2xl">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>
        <div className="text-foreground/80 group-hover:text-foreground inline-flex items-center gap-1.5 pt-2 text-sm font-medium">
          Read the guide
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
