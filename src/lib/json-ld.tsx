/*
  Structured data helpers. Every page shares one Person entity (@id), so Google
  and AI assistants connect the profile, the blog and each post to the same
  author.
*/
import { site } from "@/lib/data";

export const personId = `${site.url}/#person`;
export const websiteId = `${site.url}/#website`;

export const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  worksFor: [
    { "@type": "Organization", name: "National Center of Artificial Intelligence (NCAI)" },
    { "@type": "Organization", name: "PlutoSec" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National University of Sciences and Technology (NUST)",
  },
  knowsAbout: [
    "DevOps",
    "Go",
    "Kubernetes",
    "Google Cloud",
    "Node.js",
    "Next.js",
    "Model Context Protocol (MCP)",
    "LLM integration",
    "CI/CD",
  ],
  sameAs: [site.linkedin, site.github, site.x],
};

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so post text can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
