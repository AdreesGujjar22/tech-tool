import { Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-8 sm:p-12">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-brand/20 blur-3xl" />
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <Mail className="size-3" />
          The weekly digest
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          New tools, sharper takes, every Tuesday.
        </h2>
        <p className="mt-3 text-muted-foreground">
          One email. The best of what we publish, plus the links worth your time.
        </p>
        <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition focus:ring-2"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gradient px-5 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:scale-[1.02]"
          >
            {sent ? "Subscribed" : "Subscribe"}
            <Send className="size-4" />
          </button>
        </form>
        {sent && (
          <p className="mt-3 text-xs text-brand">Thanks — check your inbox to confirm.</p>
        )}
      </div>
    </section>
  );
}