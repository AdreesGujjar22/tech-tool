import { ArrowRight, Zap } from "lucide-react";
import { BlogCard } from "../tech-blogs/blog/blog-card";
import { getAllPosts, getFeaturedPost } from "../../lib/tech-blogs/blog/posts";
import { Link } from "react-router-dom";

function BlogSection() {
  const featured = getFeaturedPost();
  const latest = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Featured */}
      {featured && (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Featured
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              This week's must-read
            </h2>
          </div>
        </div>
        <Link
          to={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 lg:grid-cols-2"
        >
          <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
            <img
              src={featured.cover}
              alt={featured.coverAlt}
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {/* <Zap className="size-3" /> */}
              Featured deep dive
            </span>
            <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              {featured.title}
            </h3>
            <p className="text-muted-foreground">{featured.excerpt}</p>
            <div className="flex items-center gap-3 text-sm">
              <img src={featured.author.avatar} alt="" className="size-9 rounded-full" />
              <div>
                <div className="font-medium">{featured.author.name}</div>
                <div className="text-xs text-muted-foreground">
                  {featured.readingMinutes} min read
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
      )}

      {/* Latest */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Latest
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              Fresh from the desk
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            View all 
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

export default BlogSection