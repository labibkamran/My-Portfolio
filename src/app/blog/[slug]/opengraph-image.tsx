import { ogCard, ogSize } from "@/lib/og-card";
import { getAllPosts, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/data";

export const alt = `Blog post by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return ogCard({
    eyebrow: `${site.name} · Blog`,
    title: meta.title,
    footer: `${formatDate(meta.date)} · ${meta.readingMinutes} min read`,
  });
}
