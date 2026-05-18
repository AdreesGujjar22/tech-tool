import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

let highlighterPromise: Promise<{
  codeToHtml: (code: string, opts: { lang: string; theme: string }) => Promise<string>;
}> | null = null;

async function getShiki() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((m) => ({ codeToHtml: m.codeToHtml }));
  }
  return highlighterPromise;
}

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getShiki().then(async ({ codeToHtml }) => {
      try {
        const out = await codeToHtml(code, {
          lang: language || "text",
          theme: "github-dark-default",
        });
        if (!cancelled) setHtml(out);
      } catch {
        if (!cancelled) setHtml(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border bg-[oklch(0.16_0.02_260)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/60">
        <span className="font-mono uppercase tracking-wider">{language || "code"}</span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {html ? (
        <div
          className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 text-sm text-white/90">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}