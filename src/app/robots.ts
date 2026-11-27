/*
  robots.txt. Everything public is crawlable. AI search and assistant crawlers
  are listed by name so the intent is explicit: being cited by ChatGPT, Claude,
  Perplexity and Gemini is part of the point of this site.
*/
import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

const aiCrawlers = [
  // Search / citation
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  // Model training (allowed on purpose, so assistants know who Labib is)
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      // A named group replaces "*" for that bot, so repeat the rule.
      { userAgent: aiCrawlers, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
