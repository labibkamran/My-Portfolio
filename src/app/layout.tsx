/*
  Root layout: self-hosted fonts, SEO metadata, and the dark theme the design
  is built around (html.dark — light tokens exist in globals.css for a future toggle).
*/
import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.labibkamran.com"),
  title: "Labib Kamran | Software Engineer, Node.js, TypeScript & Google Cloud",
  description:
    "Software engineer turning messy, complex problems into clean, scalable products. Full-stack web and cloud applications for startups and global clients, built with Node.js, TypeScript, Google Cloud, React, and Next.js.",
  keywords: [
    "Labib Kamran",
    "Software Engineer",
    "Full-Stack Developer",
    "Node.js",
    "TypeScript",
    "Google Cloud",
    "React",
    "Next.js",
    "DevOps",
  ],
  openGraph: {
    title: "Labib Kamran, Software Engineer",
    description:
      "Full-stack web and cloud applications for startups and global clients. Node.js · TypeScript · Google Cloud · React.",
    url: "https://www.labibkamran.com",
    siteName: "Labib Kamran",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labib Kamran, Software Engineer",
    description:
      "Full-stack web and cloud applications for startups and global clients. Node.js · TypeScript · Google Cloud · React.",
  },
  robots: { index: true, follow: true },
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
