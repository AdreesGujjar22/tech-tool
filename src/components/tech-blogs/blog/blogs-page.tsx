import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Flame, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { BlogCard, BlogCardSkeleton } from "../../../components/tech-blogs/blog/blog-card";
import { Newsletter } from "../../../components/tech-blogs/blog/newsletter";
import { CATEGORIES } from "../../../lib/tech-blogs/blog/categories";
import { filterPosts, getTrendingPosts } from "../../../lib/tech-blogs/blog/posts";
import { usePosts } from "../../../lib/tech-blogs/blog/store";
import { cn } from "../../../lib/utils";
import { Link } from "react-router-dom";

const PAGE_SIZE = 6;

function BlogsPage() {
  const allPosts = usePosts();
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const result = useMemo(
    () => filterPosts({ category, query, page, pageSize: PAGE_SIZE }),
    [category, query, page, allPosts],
  );
  const trending = useMemo(() => getTrendingPosts(3), [allPosts]);

  // Simulate skeleton on filter change for the look — short delay.
  const handleCategory = (slug: string) => {
    setLoading(true);
    setCategory(slug);
    setPage(1);
    setTimeout(() => setLoading(false), 250);
  };

  const handleQuery = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  return (
    <>
      {/* Heading */}
      <section className="border-b border-border/60 mt-[120px]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              The Stackwise Blog
            </span>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Stories from the toolchain.
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Filter by topic, search by tag, and find the deep dives that match the
              problem you're solving today.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_300px] lg:gap-12 lg:px-8">
        {/* Main */}
        <div>
          {/* Search + categories */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => handleQuery(e.target.value)}
                placeholder="Search articles, tags, topics…"
                className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-10 text-sm outline-none ring-ring transition focus:ring-2"
              />
              {query && (
                <button
                  onClick={() => handleQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategory(cat.slug)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                    category === cat.slug
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-brand/50 hover:text-foreground",
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : result.posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <p className="font-display text-lg font-semibold">No matching articles</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {result.posts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {result.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {result.page} of {result.totalPages} · {result.total} articles
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={result.page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" /> Prev
                </button>
                {Array.from({ length: result.totalPages }).map((_, i) => {
                  const n = i + 1;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={cn(
                        "size-9 rounded-md border text-sm font-medium transition-colors",
                        n === result.page
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-card hover:bg-accent",
                      )}
                    >
                      {n}
                    </button>
                  );
                })}
                <button
                  disabled={result.page === result.totalPages}
                  onClick={() =>
                    setPage((p) => Math.min(result.totalPages, p + 1))
                  }
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          <div className="mt-16">
            <Newsletter />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Flame className="size-4 text-brand" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
                Trending now
              </h3>
            </div>
            <ol className="space-y-4">
              {trending.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex gap-3"
                  >
                    <span className="font-display text-2xl font-bold text-muted-foreground/40">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-snug transition-colors group-hover:text-brand">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {post.readingMinutes} min read
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              Topics
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.slug !== "all").map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategory(cat.slug)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default BlogsPage