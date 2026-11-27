/*
  Blog index: every published post, newest first, plus Blog + Breadcrumb JSON-LD.
*/
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/data";
import { JsonLd, personId, websiteId } from "@/lib/json-ld";

const description =
  "Notes from production: DevOps, Go, Kubernetes, MCP servers and the AI systems I build, with real numbers and the trade-offs behind them.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Blog · ${site.name}`, description, url: "/blog", type: "website" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <div className="mx-auto max-w-[820px] px-6 pt-20 pb-24 sm:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${site.url}/blog#blog`,
              url: `${site.url}/blog`,
              name: `${site.name}'s blog`,
              description,
              isPartOf: { "@id": websiteId },
              author: { "@id": personId },
              blogPost: posts.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: `${site.url}/blog/${p.slug}`,
                datePublished: p.date,
                author: { "@id": personId },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
              ],
            },
          ],
        }}
      />
      <span className="mb-4 block font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary">
        Blog
      </span>
      <h1 className="font-heading text-[clamp(36px,6vw,56px)] leading-[1.06] font-semibold tracking-[-0.02em] text-foreground">
        Notes from production.
      </h1>
      <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-14 flex flex-col gap-5">
        {posts.length === 0 && <p className="text-muted-foreground">The first post is on its way.</p>}
        {posts.map((p) => (
          <article
            key={p.slug}
            className="group relative rounded-[20px] border border-white/10 bg-white/[0.035] p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 sm:p-7"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12.5px] font-medium text-muted-foreground">
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span aria-hidden>·</span>
              <span>{p.readingMinutes} min read</span>
            </div>
            <h2 className="mt-3 font-heading text-[clamp(21px,2.6vw,26px)] leading-[1.2] font-semibold tracking-[-0.01em] text-foreground group-hover:text-primary">
              <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                {p.title}
              </Link>
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-[7px]">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
