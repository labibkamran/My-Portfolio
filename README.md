# labibkamran.com

Personal site of Labib Kamran. Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui. Deployed on Google Cloud Run.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonicals, sitemap, JSON-LD and social cards. Defaults to `https://labibkamran.com`; only set it to override that. |
| `GITHUB_TOKEN` | Optional. Lets `/api/github-stats` include private contributions in the GitHub section. |

Site copy (roles, case studies, skills, experience) lives in `src/lib/data.ts`.

## SEO files

| Path | Source |
| --- | --- |
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/robots.txt` | `src/app/robots.ts` (search and AI crawlers allowed) |
| `/llms.txt` | `src/app/llms.txt/route.ts` |
| Open Graph image | `src/app/opengraph-image.tsx` |
| JSON-LD | `src/lib/json-ld.tsx` (Person + WebSite on every page) |
