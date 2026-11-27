import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/blog`,
      lastModified: posts[0]?.date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.updated ?? p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
