/*
  Home page: composes all portfolio sections; marks the page as the
  ProfilePage for the Person entity defined in the root layout.
*/
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { CaseStudies } from "@/components/case-studies";
import { GithubActivity } from "@/components/github-activity";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";
import { site } from "@/lib/data";
import { JsonLd, personId } from "@/lib/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${site.url}/#profile`,
          url: site.url,
          name: `${site.name} · ${site.role}`,
          mainEntity: { "@id": personId },
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(900px_520px_at_10%_-8%,rgba(233,180,76,0.08),transparent_60%),radial-gradient(820px_620px_at_102%_12%,rgba(95,159,224,0.055),transparent_55%)]" />
      <div className="relative z-10">
        <SiteNav />
        <main>
          <Hero />
          <About />
          <CaseStudies />
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
