import type { BlogPost } from "./types";
import { getPostsSnapshot } from "./store";

export function getAllPosts(): BlogPost[] {
  return [...getPostsSnapshot()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.status !== "draft");
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPostsSnapshot().find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const pub = getPublishedPosts();
  return pub.find((p) => p.featured) ?? pub[0];
}

export function getTrendingPosts(limit = 4): BlogPost[] {
  return getPublishedPosts().filter((p) => p.trending).slice(0, limit);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return getPublishedPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = p.category === current.category ? 2 : 0;
      return { post: p, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export interface FilterOptions {
  category?: string;
  query?: string;
  page?: number;
  pageSize?: number;
  includeDrafts?: boolean;
}

export interface FilterResult {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function filterPosts(opts: FilterOptions = {}): FilterResult {
  const { category = "all", query = "", page = 1, pageSize = 6, includeDrafts = false } = opts;
  const q = query.trim().toLowerCase();
  const source = includeDrafts ? getAllPosts() : getPublishedPosts();

  const filtered = source.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const posts = filtered.slice(start, start + pageSize);

  return { posts, total, page: safePage, pageSize, totalPages };
}
