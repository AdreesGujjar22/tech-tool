import { Fragment, type ReactNode } from "react";
import { CodeBlock } from "../../../components/tech-blogs/blog/code-block";

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderInline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    const key = `${keyBase}-${i++}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else {
      const m = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (m) {
        nodes.push(
          <a key={key} href={m[2]} target="_blank" rel="noreferrer noopener">
            {m[1]}
          </a>,
        );
      }
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export interface RenderedMarkdown {
  content: ReactNode;
  headings: Heading[];
}

export function renderHtml(html: string): RenderedMarkdown {
  const headings: Heading[] = [];
  // Extract h2/h3 for TOC and inject ids
  const withIds = html.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi, (_, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugify(text);
    headings.push({ id, text, level: tag === "h2" ? 2 : 3 });
    if (/\sid=/.test(attrs)) return `<${tag}${attrs}>${inner}</${tag}>`;
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
  return {
    content: <div dangerouslySetInnerHTML={{ __html: withIds }} />,
    headings,
  };
}

export function renderContent(src: string, format?: "markdown" | "html"): RenderedMarkdown {
  const isHtml = format === "html" || /^\s*<(p|h[1-6]|ul|ol|pre|blockquote|div|figure|table)/i.test(src);
  return isHtml ? renderHtml(src) : renderMarkdown(src);
}

export function renderMarkdown(src: string): RenderedMarkdown {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  const headings: Heading[] = [];

  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];

    // code fence
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(<CodeBlock key={`b-${key++}`} code={buf.join("\n")} language={lang} />);
      continue;
    }

    // headings
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      const id = slugify(text);
      headings.push({ id, text, level: 2 });
      blocks.push(
        <h2 key={`b-${key++}`} id={id}>
          {text}
        </h2>,
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
      blocks.push(
        <h3 key={`b-${key++}`} id={id}>
          {text}
        </h3>,
      );
      i++;
      continue;
    }

    // blockquote
    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={`b-${key++}`}>{renderInline(buf.join(" "), `b-${key}`)}</blockquote>,
      );
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={`b-${key++}`}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ul-${key}-${idx}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={`b-${key++}`}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ol-${key}-${idx}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph (collect until blank/special)
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={`b-${key++}`}>{renderInline(buf.join(" "), `p-${key}`)}</p>,
    );
  }

  return {
    content: (
      <>
        {blocks.map((b, idx) => (
          <Fragment key={idx}>{b}</Fragment>
        ))}
      </>
    ),
    headings,
  };
}