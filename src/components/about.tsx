/*
  About: working principles in a two-column split.
*/
import { SectionHeading } from "@/components/section-heading";

const principles = [
  "Understand the real problem before writing a line of code.",
  "Keep the architecture simple. Complexity is a cost you pay forever.",
  "Measure it. A number beats an opinion in every design review.",
];

export function About() {
  return (
    <section id="about" aria-label="About">
      <div className="mx-auto max-w-[1120px] px-6 py-[92px] sm:px-8">
        <div className="flex flex-wrap gap-14">
          <SectionHeading
            eyebrow="01 / About"
            title="I care about the problem, not just the code."
            className="max-w-[390px] flex-[1_1_280px]"
          />
          <div className="flex flex-[2_1_440px] flex-col gap-5">
            <p className="text-lg leading-[1.7] text-foreground/85">
              I take systems from a rough idea to production and keep them
              running there. At NCAI that meant a sovereign AI system where case
              data never leaves the client&apos;s own network. Elsewhere it has
              meant an MCP server that cut tool tokens by 83% and a cloud bill
              cut in half.
            </p>
            <p className="text-lg leading-[1.7] text-muted-foreground">
              Most days I work in Go, Node.js, Kubernetes and Google Cloud, with
              Next.js on the front end. I&apos;m in my final year of Computer
              Science at NUST and have been shipping production software since
              2024.
            </p>
            <ul className="mt-2 flex flex-col gap-3.5">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-3.5">
                  <span className="mt-2 size-[7px] flex-none rounded-[2px] bg-primary shadow-[0_0_10px_rgba(233,180,76,0.6)]" />
                  <span className="text-base leading-[1.55] font-medium text-foreground">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
