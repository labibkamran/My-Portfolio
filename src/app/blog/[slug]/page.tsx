/*
  A single post: header, article body with sticky table of contents on wide
  screens, author box, and BlogPosting + Breadcrumb JSON-LD.
*/
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { site, rssFeed } from "@/lib/data";
import { JsonLd, personId } from "@/lib/json-ld";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.tags,
    alternates: { canonical: `/blog/${slug}`, types: rssFeed },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/blog/${slug}`,
      siteName: site.name,
      type: "article",
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [site.url],
      tags: meta.tags,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { meta, content, headings } = await getPost(slug);
  const url = `${site.url}/blog/${slug}`;

  return (
    <div className="mx-auto max-w-[1120px] px-6 pt-16 pb-24 sm:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${url}#article`,
              mainEntityOfPage: url,
              url,
              headline: meta.title,
              description: meta.description,
              image: `${url}/opengraph-image`,
              datePublished: meta.date,
              dateModified: meta.updated ?? meta.date,
              keywords: meta.tags.join(", "),
              inLanguage: "en",
              author: { "@id": personId },
              publisher: { "@id": personId },
              isPartOf: { "@id": `${site.url}/blog#blog` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
                { "@type": "ListItem", position: 3, name: meta.title, item: url },
              ],
            },
          ],
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-10 font-mono text-[13px] font-medium text-muted-foreground">
        <Link href="/blog" className="transition-colors hover:text-primary">
          ← All posts
        </Link>
      </nav>

      <header className="max-w-[760px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] font-medium text-muted-foreground">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.updated && (
            <>
              <span aria-hidden>·</span>
              <span>
                Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
              </span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{meta.readingMinutes} min read</span>
        </div>
        <h1 className="mt-5 font-heading text-[clamp(34px,5.4vw,54px)] leading-[1.07] font-semibold tracking-[-0.02em] text-foreground">
          {meta.title}
        </h1>
        <p className="mt-5 text-[19px] leading-[1.6] text-muted-foreground">{meta.description}</p>
        <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-6">
          <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 font-heading text-sm font-semibold text-primary">
            LK
          </span>
          <div className="text-sm leading-snug">
            <Link href="/" className="font-semibold text-foreground hover:text-primary">
              {site.name}
            </Link>
            <div className="text-muted-foreground">{site.role}</div>
          </div>
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,760px)_1fr]">
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-semibold prose-headings:tracking-[-0.01em] prose-headings:scroll-mt-24 prose-h2:mt-14 prose-h2:text-[28px] prose-h3:text-[21px] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-headings:prose-a:text-foreground prose-strong:text-foreground prose-code:rounded-md prose-code:bg-white/[0.07] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-[0.86em] prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#1c2128] prose-blockquote:border-l-primary prose-blockquote:text-foreground/80 prose-li:marker:text-primary prose-hr:border-white/10">
          {content}
        </article>

        {headings.length > 1 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 font-mono text-xs font-semibold tracking-[0.16em] uppercase text-primary">
                On this page
              </p>
              <ul className="flex flex-col gap-2 border-l border-white/10 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>

      <section
        aria-label="About the author"
        className="mt-16 max-w-[760px] rounded-3xl border border-white/10 bg-white/[0.04] p-7"
      >
        <p className="font-mono text-xs font-semibold tracking-[0.16em] uppercase text-primary">Written by</p>
        <p className="mt-3 font-heading text-xl font-semibold text-foreground">{site.name}</p>
        <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{site.description}</p>
        <div className="mt-4 flex flex-wrap gap-5 text-[14.5px] font-medium">
          <a href={site.linkedin} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary">
            LinkedIn →
          </a>
          <a href={site.github} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary">
            GitHub →
          </a>
          <a href={site.x} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary">
            X →
          </a>
          <Link href="/blog" className="text-muted-foreground hover:text-primary">
            More posts →
          </Link>
        </div>
      </section>
    </div>
  );
}
