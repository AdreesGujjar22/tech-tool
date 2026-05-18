import type { BlogCategory } from "./types";

export const CATEGORIES: BlogCategory[] = [
  { slug: "all", name: "All", description: "Every story we've published." },
  { slug: "ai", name: "AI & ML", description: "Models, agents, and the toolchain around them." },
  { slug: "devtools", name: "Dev Tools", description: "Editors, CLIs, and the tools that ship code." },
  { slug: "frontend", name: "Frontend", description: "The modern web: React, performance, design systems." },
  { slug: "backend", name: "Backend", description: "APIs, databases, and distributed systems." },
  { slug: "devops", name: "DevOps", description: "Pipelines, infra, observability." },
  { slug: "security", name: "Security", description: "Application and platform security." },
];