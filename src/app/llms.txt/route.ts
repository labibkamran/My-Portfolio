/*
  /llms.txt: a plain-text map of the site for AI assistants (llmstxt.org).
  Google ignores it; other assistants may read it. Generated from the same
  data as the site, so it never drifts.
*/
import { site, caseStudies, experience } from "@/lib/data";

export const dynamic = "force-static";

export async function GET() {
  const work = caseStudies
    .map((c) =>
      [
        `### ${c.title}`,
        c.overview,
        `Stack: ${c.stack.join(", ")}`,
        ...c.built.map((b) => `- Built: ${b}`),
        ...c.outcomes.map((o) => `- Outcome: ${o}`),
        ...(c.link ? [`- Link: ${c.link.href.startsWith("/") ? site.url + c.link.href : c.link.href}`] : []),
      ].join("\n")
    )
    .join("\n\n");
  const roles = experience
    .filter((e) => !e.role.startsWith("BS "))
    .map((e) => `- ${e.role}, ${e.org} (${e.period})`)
    .join("\n");

  const body = `# ${site.name}

> ${site.name} is a ${site.role} based in ${site.location}. He builds the backend and LLM layer of NAB Eye, the AI investigation system used by Pakistan's National Accountability Bureau, owns cloud infrastructure at PlutoSec (Toronto, remote), where he cut cloud costs by 50%, and builds MCP servers and developer tooling in Go.

## Key facts
- Current roles: Software Engineer at the National Center of Artificial Intelligence (NCAI), Pakistan, building NAB Eye; Senior Software Engineer at PlutoSec (Toronto, remote).
- Education: BS Computer Science, National University of Sciences and Technology (NUST), 2023 to 2027.
- Shipping production software since 2024.

## Work
${work}

## Experience
${roles}

## Profiles
- [Website](${site.url})
- [LinkedIn](${site.linkedin})
- [GitHub](${site.github})
- [X](${site.x})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
