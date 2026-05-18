import { format } from "date-fns";
import { ArrowLeft, Clock, Share2, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { BlogCard } from "../../../components/tech-blogs/blog/blog-card";
import { Newsletter } from "../../../components/tech-blogs/blog/newsletter";
import { CATEGORIES } from "../../../lib/tech-blogs/blog/categories";
import { renderContent } from "../../../lib/tech-blogs/blog/markdown";
import { getPostBySlug, getRelatedPosts } from "../../../lib/tech-blogs/blog/posts";
import { usePosts } from "../../../lib/tech-blogs/blog/store";
import { cn } from "../../..//lib/utils";
import { Link, useParams } from "react-router-dom";

function SingleBlog() {
  const { slug } =useParams();
  const allPosts = usePosts();
  const post = useMemo(() => getPostBySlug(slug), [slug, allPosts]);
  const related = useMemo(() => (post ? getRelatedPosts(post.slug, 3) : []), [post, allPosts]);
  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">This article may have been removed.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-3 text-sm font-semibold text-brand-foreground">
          Back to the blog
        </Link>
      </div>
    );
  }
  const rendered = useMemo(
    () => renderContent(post.content, post.contentFormat),
    [post.content, post.contentFormat],
  );
  const categoryName = CATEGORIES.find((c) => c.slug === post.category)?.name ?? post.category;

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (rendered.headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0.1 },
    );
    rendered.headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [rendered.headings]);

  const share = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <article>
        {/* Hero */}
        <header className="relative overflow-hidden border-b border-border/60  mt-[120px]">
          <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back to blog
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                {categoryName}
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt="" className="size-10 rounded-full" />
                  <div className="text-sm">
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-xs text-muted-foreground">{post.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" /> {post.readingMinutes} min read
                  </span>
                  <button
                    onClick={share}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Share2 className="size-3" /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={post.cover}
                alt={post.coverAlt}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Body + TOC */}
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_240px] lg:gap-16 lg:px-8">
          <div className="prose-blog max-w-none">{rendered.content}</div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            {rendered.headings.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  On this page
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {rendered.headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                      <a
                        href={`#${h.id}`}
                        className={cn(
                          "block border-l-2 border-transparent pl-3 transition-colors",
                          activeId === h.id
                            ? "border-brand text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Twitter className="size-4" /> Share on X
            </a>
          </aside>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border/60 bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Keep reading</h2>
            <p className="mt-1 text-muted-foreground">
              More stories like this one.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Newsletter />
      </section>
    </>
  );
}

export default SingleBlog