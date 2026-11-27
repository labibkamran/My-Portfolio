import { ogCard, ogSize } from "@/lib/og-card";
import { site } from "@/lib/data";

export const alt = `${site.name}, ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: site.name, title: site.tagline, footer: site.role });
}
