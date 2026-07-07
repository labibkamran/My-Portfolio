/*
  Skills: grouped badge clusters by area.
*/
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills">
      <div className="mx-auto max-w-[1120px] px-6 py-[92px] sm:px-8">
        <SectionHeading eyebrow="04 / Skills" title="What I work with." className="mb-11" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(232px,1fr))] gap-x-11 gap-y-10">
          {skillGroups.map((g) => (
            <div key={g.area} className="flex flex-col gap-4">
              <h3 className="font-mono text-xs font-semibold tracking-[0.14em] uppercase text-primary">
                {g.area}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="h-auto rounded-[10px] border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-white/[0.06]"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
