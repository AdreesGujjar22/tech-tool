import { useSyncExternalStore } from "react";
import type { BlogPost } from "./types";
import { SEED_POSTS } from "./seed";

const STORAGE_KEY = "stackwise.blog.posts.v1";

type Listener = () => void;
const listeners = new Set<Listener>();
let posts: BlogPost[] = [];
let initialized = false;

function load(): BlogPost[] {
  if (typeof window === "undefined") return SEED_POSTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_POSTS;
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_POSTS;
    return parsed;
  } catch {
    return SEED_POSTS;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    /* ignore */
  }
}

function ensure() {
  if (!initialized) {
    posts = load();
    initialized = true;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export function getPostsSnapshot(): BlogPost[] {
  ensure();
  return posts;
}

function getServerSnapshot(): BlogPost[] {
  return SEED_POSTS;
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function usePosts(): BlogPost[] {
  return useSyncExternalStore(subscribe, getPostsSnapshot, getServerSnapshot);
}

export function createPost(post: BlogPost) {
  ensure();
  posts = [post, ...posts];
  persist();
  emit();
}

export function updatePost(slug: string, patch: Partial<BlogPost>) {
  ensure();
  posts = posts.map((p) => (p.slug === slug ? { ...p, ...patch } : p));
  persist();
  emit();
}

export function deletePost(slug: string) {
  ensure();
  posts = posts.filter((p) => p.slug !== slug);
  persist();
  emit();
}

export function deletePosts(slugs: string[]) {
  ensure();
  const set = new Set(slugs);
  posts = posts.filter((p) => !set.has(p.slug));
  persist();
  emit();
}

export function resetPosts() {
  posts = SEED_POSTS;
  persist();
  emit();
}
