/*
  Footer: copyright, blog/RSS links and back-to-top.
*/
import Link from "next/link";
import { site } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-6 py-6 sm:px-8">
        <span className="font-mono text-[13px] font-medium text-muted-foreground/60">
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="flex items-center gap-5 font-mono text-[13px] font-medium text-muted-foreground">
          <Link href="/blog" className="transition-colors hover:text-primary">Blog</Link>
          <a href="/rss.xml" className="transition-colors hover:text-primary">RSS</a>
          <a href="#top" className="transition-colors hover:text-primary">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
