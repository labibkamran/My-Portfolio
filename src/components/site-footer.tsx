/*
  Footer: copyright and back-to-top.
*/
import { site } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-6 py-6 sm:px-8">
        <span className="font-mono text-[13px] font-medium text-muted-foreground">
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="flex items-center gap-5 font-mono text-[13px] font-medium text-muted-foreground">
          <a href="#top" className="transition-colors hover:text-primary">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
