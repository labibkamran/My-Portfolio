/*
  Shared chrome for /blog pages: same nav, background glow and footer as home.
*/
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(900px_520px_at_10%_-8%,rgba(233,180,76,0.08),transparent_60%),radial-gradient(820px_620px_at_102%_12%,rgba(95,159,224,0.055),transparent_55%)]" />
      <div className="relative z-10">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
