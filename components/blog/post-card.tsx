import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons/icon";
import type { PostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card group">
      {post.cover ? (
        <div className="bg-muted relative aspect-[16/10] overflow-hidden">
          {/* Decorative: the card heading labels the link, so the thumbnail
              uses an empty alt to avoid duplicating the title for screen readers. */}
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
        <div className="post-card-meta">
          <span>{post.category}</span>
          <span aria-hidden>•</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {post.description}
        </p>
        <div className="post-card-more">
          Read the guide
          <Icon name="arrow-up-right" />
        </div>
      </div>
    </Link>
  );
}
