import type { BlogPost } from "./types";

const ALEX = {
  name: "Alex Marlowe",
  role: "Staff Engineer",
  avatar: "https://i.pravatar.cc/120?img=12",
};
const SARA = {
  name: "Sara Okonkwo",
  role: "AI Researcher",
  avatar: "https://i.pravatar.cc/120?img=47",
};
const RYU = {
  name: "Ryu Tanaka",
  role: "Platform Lead",
  avatar: "https://i.pravatar.cc/120?img=33",
};
const MIA = {
  name: "Mia Hernandez",
  role: "DX Engineer",
  avatar: "https://i.pravatar.cc/120?img=5",
};

export const SEED_POSTS: BlogPost[] = [
  {
    slug: "ship-faster-with-bun-and-vite",
    title: "Ship Faster: The Bun + Vite Stack That Cut Our Build Times by 70%",
    excerpt:
      "We replaced our legacy Node + Webpack toolchain with Bun and Vite. Here is exactly what changed, what broke, and the numbers we measured.",
    cover:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Developer laptop with code editor",
    category: "devtools",
    tags: ["bun", "vite", "performance", "tooling"],
    author: ALEX,
    publishedAt: "2026-05-10T09:00:00.000Z",
    readingMinutes: 8,
    featured: true,
    trending: true,
    content: `
## Why we moved off Webpack

Our cold builds had crept past 90 seconds and HMR was a memory hog. The team was losing
flow on every save. We knew there was something better — we just needed evidence.

## Picking the new stack

We evaluated four candidates: Turbopack, esbuild, Rspack, and Vite + Bun. The decision
came down to three constraints:

- A first-class TypeScript story without a separate type-check step on hot reload.
- ESM-first, because half our internal packages already shipped ESM only.
- A runtime we could share between dev server, scripts, and tests.

Vite handled the bundler story. Bun handled the runtime, package install, and test runner.

\`\`\`ts
// bunfig.toml
[install]
exact = true

[test]
preload = ["./test/setup.ts"]
\`\`\`

## The migration in three steps

1. Replace \`npm install\` with \`bun install\`. Lockfile converted cleanly.
2. Swap the dev server to Vite. Move env var prefixes to \`VITE_\`.
3. Port jest tests to \`bun test\`. About 95% ran unchanged.

## Numbers

> Cold build: 92s → 27s. HMR: 1.4s → 90ms. CI: 6m12s → 2m05s.

The CI win surprised us most — Bun's installer is dramatically faster than npm even on
warm caches.

## What we'd do differently

We tried to migrate the entire monorepo in one PR. Don't. Migrate one app at a time and
keep the old pipeline running until you trust the new one.
`,
  },
  {
    slug: "agents-that-actually-work",
    title: "Building Agents That Actually Work in Production",
    excerpt:
      "Most agent demos break the moment they leave a notebook. Here's the architecture pattern we use to keep them reliable at scale.",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Abstract AI visual",
    category: "ai",
    tags: ["ai", "agents", "llm", "architecture"],
    author: SARA,
    publishedAt: "2026-05-05T08:00:00.000Z",
    readingMinutes: 11,
    featured: true,
    trending: true,
    content: `
## The demo-to-prod gap

LLM agents are charismatic in a demo. Real users break them in 30 seconds. The pattern
we ship looks nothing like the popular tutorials.

## The architecture

We treat the agent as a typed state machine, not a free-form loop:

\`\`\`ts
type AgentState =
  | { kind: "planning"; goal: string }
  | { kind: "tool_call"; tool: string; args: unknown }
  | { kind: "awaiting_user"; question: string }
  | { kind: "done"; result: unknown };
\`\`\`

Every transition is logged, every tool call is idempotent, and every model call is
budgeted in tokens and dollars before it executes.

## Three rules

1. **Bound everything**: max steps, max tokens, max wall-clock time.
2. **Fail loud**: surface tool errors to the user instead of letting the model
   hallucinate a recovery.
3. **Replay-first debugging**: store the full trace; nothing else is debuggable.

## A worked example

We built an internal support agent on this pattern. P95 latency dropped from 22s to 4s,
and the hallucination rate on policy questions fell from 14% to 0.8%.
`,
  },
  {
    slug: "react-server-components-mental-model",
    title: "A Mental Model for React Server Components",
    excerpt:
      "Server components feel weird until they don't. This is the framing that finally made them click for our team.",
    cover:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "React code on screen",
    category: "frontend",
    tags: ["react", "rsc", "next"],
    author: MIA,
    publishedAt: "2026-04-28T10:00:00.000Z",
    readingMinutes: 7,
    trending: true,
    content: `
## Stop thinking "server vs client"

Think instead: **which boundary owns the data, and which owns the interaction?**

## The boundary

Server components own data. Client components own interaction. Props cross the boundary;
state and event handlers do not.

\`\`\`tsx
// server component
export default async function Posts() {
  const posts = await db.posts.list();
  return <PostList posts={posts} />;
}

// client component
"use client";
export function PostList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState("");
  // ...
}
\`\`\`

## Why it matters

You stop shipping the database client to the browser. You stop hand-rolling fetch
waterfalls. The mental tax is real for a week — then it's gone.
`,
  },
  {
    slug: "postgres-is-all-you-need",
    title: "Postgres Is (Still) All You Need",
    excerpt:
      "Queues, full-text search, vector search, pub/sub. Before you reach for a new service, see how far one Postgres can take you.",
    cover:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Server room",
    category: "backend",
    tags: ["postgres", "databases", "architecture"],
    author: RYU,
    publishedAt: "2026-04-22T07:30:00.000Z",
    readingMinutes: 9,
    content: `
## One database to rule them all

A single Postgres instance can handle:

- A durable job queue with \`SELECT ... FOR UPDATE SKIP LOCKED\`
- Full-text search with \`tsvector\`
- Vector similarity search with \`pgvector\`
- Realtime fan-out with \`LISTEN/NOTIFY\`

## The queue

\`\`\`sql
SELECT id, payload
FROM jobs
WHERE status = 'pending'
ORDER BY created_at
FOR UPDATE SKIP LOCKED
LIMIT 1;
\`\`\`

This pattern scales to thousands of workers without a broker.

## When to graduate

When you genuinely outgrow one box. Not before. The complexity tax of adding Kafka,
Redis, and Elasticsearch on day one is enormous.
`,
  },
  {
    slug: "the-observability-stack-we-actually-use",
    title: "The Observability Stack We Actually Use",
    excerpt:
      "Traces, metrics, logs — and the OpenTelemetry setup that ties them together without breaking the bank.",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Dashboard charts",
    category: "devops",
    tags: ["observability", "otel", "monitoring"],
    author: RYU,
    publishedAt: "2026-04-15T12:00:00.000Z",
    readingMinutes: 10,
    content: `
## The three pillars, ranked

1. **Traces** are the most valuable signal you're underusing.
2. **Metrics** are cheap to store and answer the "is it broken?" question.
3. **Logs** are expensive and best treated as a tracing detail, not a primary tool.

## A minimal OTel setup

\`\`\`ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: process.env.OTEL_URL }),
  instrumentations: [getNodeAutoInstrumentations()],
}).start();
\`\`\`

That's the whole bootstrap. Span attributes are where the magic happens.
`,
  },
  {
    slug: "supply-chain-security-2026",
    title: "Supply Chain Security in 2026: What Actually Changed",
    excerpt:
      "SBOMs, sigstore, provenance. We separate the regulatory theatre from the practices that actually reduce risk.",
    cover:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Padlock on circuit board",
    category: "security",
    tags: ["security", "supply-chain", "sbom"],
    author: ALEX,
    publishedAt: "2026-04-08T15:00:00.000Z",
    readingMinutes: 6,
    content: `
## What's real

- Signed artifacts with Sigstore are now default in major registries.
- SBOM generation is a build-time concern, not an audit-time scramble.

## What's theatre

- "AI-powered" vulnerability scanners that re-emit CVE feeds.
- Compliance dashboards that don't block a deploy.

## The minimum bar

\`\`\`yaml
- name: sign
  uses: sigstore/cosign-installer@v3
- run: cosign sign --yes $IMAGE
\`\`\`

Sign your artifacts. Verify them on pull. Everything else is layered on top.
`,
  },
  {
    slug: "designing-cli-tools-people-love",
    title: "Designing CLI Tools People Actually Love",
    excerpt:
      "Great CLIs feel inevitable. We break down the small ergonomic choices that separate a tolerable CLI from a beloved one.",
    cover:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Terminal window",
    category: "devtools",
    tags: ["cli", "dx", "design"],
    author: MIA,
    publishedAt: "2026-04-01T11:00:00.000Z",
    readingMinutes: 5,
    content: `
## The four rules

1. **Be predictable.** Same flag means the same thing across subcommands.
2. **Be quiet by default.** Reserve stdout for the answer, stderr for the noise.
3. **Be scriptable.** \`--json\` and a stable exit code system.
4. **Be guessable.** \`--help\` should answer 80% of questions.

## A small touch that matters

\`\`\`bash
$ mycli deploy
✓ Built in 2.1s
✓ Uploaded 14 files
→ https://app.example.com/deploys/abc123
\`\`\`

Three lines. One URL the user can click. That's the bar.
`,
  },
  {
    slug: "vector-search-without-the-hype",
    title: "Vector Search Without the Hype",
    excerpt:
      "When embeddings beat BM25, when they don't, and the hybrid pattern that wins more often than either alone.",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Network of nodes",
    category: "ai",
    tags: ["search", "embeddings", "rag"],
    author: SARA,
    publishedAt: "2026-03-25T09:00:00.000Z",
    readingMinutes: 7,
    content: `
## Embeddings aren't magic

They're great at semantic similarity, mediocre at exact-match recall, and terrible at
freshness. BM25 is the opposite. Combine them.

## The hybrid recipe

\`\`\`python
results = reciprocal_rank_fusion([
    bm25.search(query, k=50),
    vector.search(embed(query), k=50),
])
\`\`\`

Reciprocal rank fusion is shockingly hard to beat with anything fancier.

## When to skip vectors entirely

If your corpus is small and exact-match works, you don't need them. Stop being trendy.
`,
  },
  {
    slug: "edge-runtimes-explained",
    title: "Edge Runtimes Explained for People Who Have a Day Job",
    excerpt:
      "Workers, Functions, Lambdas. A practical map of what runs where, with the gotchas that will bite you on Friday at 5pm.",
    cover:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Global network of light",
    category: "backend",
    tags: ["edge", "serverless", "platform"],
    author: RYU,
    publishedAt: "2026-03-18T14:00:00.000Z",
    readingMinutes: 8,
    content: `
## A working definition

An "edge runtime" is a tiny isolate that boots in milliseconds, runs close to your user,
and has a deliberately limited API surface.

## The catch

That limited API surface is the catch. \`fs\`, \`child_process\`, and most native modules
are off-limits. Plan accordingly.

\`\`\`ts
// works at the edge
const res = await fetch(url);

// does not
import { readFileSync } from "fs";
\`\`\`

## When to use them

For latency-sensitive read paths. For auth checks. For caching layers. Not for your
data-heavy report generator.
`,
  },
];
