/*
  Sticky glass navigation bar with anchor links and the résumé CTA.
*/
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-[34px] place-items-center rounded-[10px] border border-white/10 bg-white/5 font-heading text-sm font-semibold text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            LK
          </span>
          <span className="font-heading text-[15px] font-semibold tracking-[0.01em] text-foreground">
            {site.name}
          </span>
        </a>
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-[9px] px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener"
            className={cn(
              buttonVariants(),
              "ml-2 h-auto rounded-[10px] border-primary/50 px-4 py-2.5 font-heading text-sm font-semibold"
            )}
          >
            Résumé →
          </a>
        </div>
      </div>
    </nav>
  );
}
