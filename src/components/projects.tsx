/*
  Projects: real shipped work as glass cards — problem, outcome, stack, and a live link.
*/
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" aria-label="Selected work">
      <div className="mx-auto max-w-[1120px] px-6 py-[92px] sm:px-8">
        <SectionHeading
          eyebrow="02 / Selected work"
          title="Problems solved, and what changed because of it."
          className="mb-11 [&>h2]:max-w-[18ch]"
        />
        <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card
              key={p.title}
              className="gap-0 rounded-[20px] border-white/10 bg-white/[0.045] p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="flex flex-1 flex-col gap-3.5 p-6 pb-7">
                <span className="font-mono text-[11.5px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                  {p.kicker}
                </span>
                <h3 className="font-heading text-[22px] leading-[1.2] font-semibold tracking-[-0.01em] text-foreground">
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {p.problem}
                </p>
                <p className="text-[15px] leading-relaxed text-foreground/85">
                  {p.outcome}
                </p>
                <div className="mt-0.5 flex flex-wrap gap-[7px]">
                  {p.stack.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-full border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-end border-t border-white/[0.06] pt-4">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="font-heading text-[13.5px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {p.linkLabel}
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
