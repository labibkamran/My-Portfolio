# labibkamran.com

Personal site and blog of Labib Kamran. Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui. Deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonicals, sitemap, RSS, JSON-LD and social cards. Defaults to the Vercel URL. Set it to `https://www.labibkamran.com` when the domain is live, then redeploy. |
| `GITHUB_TOKEN` | Optional. Lets `/api/github-stats` include private contributions in the GitHub section. |

Site copy (roles, case studies, skills, experience) lives in `src/lib/data.ts`.

## Writing a blog post

1. Add `content/blog/<slug>.mdx`. The file name becomes the URL: `/blog/<slug>`.
2. Start it with this header:

   ```yaml
   ---
   title: "Post title, ideally under 65 characters"
   description: "One or two sentences for search results and link previews. Under 170 characters."
   date: 2026-12-05
   updated: 2026-12-20   # optional
   tags: [mcp, go, kubernetes]
   draft: true            # optional: visible in `npm run dev`, hidden in production
   ---
   ```

3. Write Markdown below it. Code blocks get syntax highlighting; add a file name with ` ```go title="main.go" ` and highlight lines with `{2,4-6}`. Tables, links and `## headings` (which feed the table of contents) work as normal. Two components are available: `<Callout title="Note">...</Callout>` and `<Figure src="/blog/<slug>/diagram.png" alt="..." caption="..." />`. Put images in `public/blog/<slug>/`.

The build fails with a clear message if the header is missing a field or has a bad date.

Each post automatically gets a page, an Open Graph image, BlogPosting JSON-LD, and entries in `/sitemap.xml`, `/rss.xml` and `/llms.txt`.

## SEO files

| Path | Source |
| --- | --- |
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/robots.txt` | `src/app/robots.ts` (search and AI crawlers allowed) |
| `/rss.xml` | `src/app/rss.xml/route.ts` |
| `/llms.txt` | `src/app/llms.txt/route.ts` |
| Open Graph images | `src/app/opengraph-image.tsx`, `src/app/blog/[slug]/opengraph-image.tsx` |
| JSON-LD | `src/lib/json-ld.tsx` (Person + WebSite on every page) |

After publishing a post: request indexing for its URL in Google Search Console, and submit it in Bing Webmaster Tools.
