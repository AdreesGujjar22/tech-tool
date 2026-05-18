import { Link } from "react-router-dom";
import { Github, Linkedin, Terminal, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 section-bg-alt">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-[#E2DFFF] font-bold text-2xl tracking-tight shrink-0"
            >
              <img src="/images/web-logo.png" alt="Tech tool logo" className="h-12" />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Deep dives, tutorials, and reviews on the tools shaping modern software engineering.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-[#C7C4D8] text-xs font-semibold tracking-[0.48px] hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-[#C7C4D8] text-xs font-semibold tracking-[0.48px] hover:text-white transition-colors hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Follow</h4>
            <div className="mt-3 flex gap-2">
              <a href="#" aria-label="Twitter" className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <Twitter className="size-4" />
              </a>
              <a href="#" aria-label="GitHub" className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <Github className="size-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tech Tools. All rights reserved.</p>
          <p>Built for engineers who ship.</p>
        </div>
      </div>
    </footer>
  );
}
