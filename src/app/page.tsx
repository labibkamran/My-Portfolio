/*
  Home page: composes all portfolio sections and injects JSON-LD Person schema.
*/
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { GithubActivity } from "@/components/github-activity";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "Node.js",
    "TypeScript",
    "Google Cloud",
    "React",
    "Next.js",
    "DevOps",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National University of Sciences and Technology (NUST)",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(900px_520px_at_10%_-8%,rgba(233,180,76,0.08),transparent_60%),radial-gradient(820px_620px_at_102%_12%,rgba(95,159,224,0.055),transparent_55%)]" />
      <div className="relative z-10">
        <SiteNav />
        <main>
          <Hero />
          <About />
          <Projects />
          <GithubActivity />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
