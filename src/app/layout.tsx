/*
  Root layout: self-hosted fonts, site-wide SEO metadata, WebSite + Person
  JSON-LD on every page, and the dark theme the design is built around
  (light tokens exist in globals.css for a future toggle).
*/
import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";
import { JsonLd, person, websiteId } from "@/lib/json-ld";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const description =
  "DevOps and full-stack engineer in Islamabad. I build the backend and LLM layer of NAB Eye, MCP servers, and cloud systems in Go, Kubernetes and Google Cloud.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Labib Kamran",
    "DevOps Engineer",
    "Full-Stack Engineer",
    "Go",
    "Kubernetes",
    "Google Cloud",
    "MCP server",
    "AI systems",
    "NAB Eye",
    "Islamabad",
  ],
  openGraph: {
    title: `${site.name} · ${site.role}`,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": websiteId,
                url: site.url,
                name: site.name,
                description,
                inLanguage: "en",
                publisher: { "@id": person["@id"] },
              },
              person,
            ],
          }}
        />
        {children}
      </body>
    </html>
  );
}
