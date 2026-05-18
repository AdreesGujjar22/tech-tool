// import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "../../../lib/tech-blogs/blog/types";
import { CATEGORIES } from "../../../lib/tech-blogs/blog/categories";
import { Link } from "react-router-dom";

function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={post.cover}
          alt={post.coverAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
            {categoryName(post.category)}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={post.author.avatar} alt="" className="size-6 rounded-full" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{format(new Date(post.publishedAt), "MMM d")}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              {post.readingMinutes}m
            </span>
          </div>
        </div>
      </div>
      <span className="pointer-events-none absolute right-4 top-4 z-20 grid size-9 translate-y-2 place-items-center rounded-full bg-brand text-brand-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>
    </motion.article>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[16/10] animate-pulse bg-muted" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}