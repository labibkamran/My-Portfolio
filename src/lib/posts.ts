/*
  Blog content loader. Each post is content/blog/<slug>.mdx with a YAML header;
  the file name is the slug. Headers are validated here, so a post with a
  missing title or a bad date fails the build instead of shipping broken.
*/
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import GithubSlugger from "github-slugger";
import { mdxComponents } from "@/components/mdx";

const DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  tags: string[];
  readingMinutes: number;
};

export type Heading = { id: string; text: string };

function toDay(v: unknown, field: string, file: string): string {
  // YAML turns an unquoted 2026-12-05 into a Date; accept both forms.
  const s = v instanceof Date ? v.toISOString().slice(0, 10) : v;
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    throw new Error(`${file}: "${field}" must be a date like 2026-12-05`);
  }
  return s;
}

function validate(slug: string, fm: Record<string, unknown>, body: string) {
  const file = `content/blog/${slug}.mdx`;
  const { title, description, tags, draft } = fm;
  if (typeof title !== "string" || !title.trim()) throw new Error(`${file}: "title" is required`);
  if (typeof description !== "string" || !description.trim())
    throw new Error(`${file}: "description" is required`);
  if (description.length > 170)
    throw new Error(`${file}: "description" is ${description.length} chars; keep it under 170 for search snippets`);
  if (!Array.isArray(tags) || !tags.every((t) => typeof t === "string"))
    throw new Error(`${file}: "tags" must be a list of strings`);
  const meta: PostMeta = {
    slug,
    title,
    description,
    date: toDay(fm.date, "date", file),
    updated: fm.updated === undefined ? undefined : toDay(fm.updated, "updated", file),
    tags,
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 230)),
  };
  return { meta, draft: draft === true };
}

async function readSource(slug: string) {
  const raw = await fs.readFile(path.join(DIR, `${slug}.mdx`), "utf8");
  const body = raw.replace(/^---[\s\S]*?---/, "");
  return { raw, body };
}

/** All published posts, newest first. Drafts show only in `next dev`. */
export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const files = (await fs.readdir(DIR).catch(() => [] as string[])).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (f) => {
      const slug = f.replace(/\.mdx$/, "");
      const { raw, body } = await readSource(slug);
      // Header only: no plugins, so listing stays fast.
      const { frontmatter } = await compileMDX<Record<string, unknown>>({
        source: raw,
        options: { parseFrontmatter: true },
      });
      return validate(slug, frontmatter, body);
    })
  );
  return posts
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
});

/** One post, compiled with syntax highlighting and linkable headings. */
export const getPost = cache(async (slug: string) => {
  const { raw, body } = await readSource(slug);
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }],
        ],
      },
    },
  });
  const { meta } = validate(slug, frontmatter, body);

  // Same slugger rehype-slug uses, so TOC links match the heading ids.
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  for (const line of body.replace(/```[\s\S]*?```/g, "").split("\n")) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, "").trim();
    const id = slugger.slug(text);
    if (m[1] === "##") headings.push({ id, text });
  }

  return { meta, content, headings };
});
