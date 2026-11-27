/*
  Components available inside blog MDX. Plain markdown maps to the HTML
  elements below; <Callout> and <Figure> can be used directly in a post.
*/
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function A({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener" {...props} />;
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-white/10">
      <table
        className="w-full border-collapse text-left text-[15px] [&_td]:border-t [&_td]:border-white/[0.07] [&_td]:px-4 [&_td]:py-3 [&_th]:bg-white/[0.04] [&_th]:px-4 [&_th]:py-3 [&_th]:font-mono [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.08em] [&_th]:uppercase [&_th]:text-muted-foreground"
        {...props}
      />
    </div>
  );
}

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-primary/25 bg-primary/[0.06] px-6 py-5">
      {title && (
        <p className="mb-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase text-primary">
          {title}
        </p>
      )}
      <div className="text-[16px] leading-relaxed text-foreground/90 [&_p+p]:mt-3">{children}</div>
    </aside>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- static post images, sized by the author */}
      <img src={src} alt={alt} loading="lazy" className="rounded-xl border border-white/10" />
      {caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents = { a: A, table: Table, Callout, Figure };
