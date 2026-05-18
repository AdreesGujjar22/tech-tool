export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string; // ISO
  readingMinutes: number;
  featured?: boolean;
  trending?: boolean;
  status?: "draft" | "published";
  /** "markdown" (legacy) or "html" (TipTap output). Defaults to markdown. */
  contentFormat?: "markdown" | "html";
  views?: number;
  /** Markdown-ish content rendered by our lightweight renderer. */
  content: string;
}