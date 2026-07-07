/*
  Experience: vertical timeline of roles and education, newest first.
*/
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience">
      <div className="mx-auto max-w-[1120px] px-6 py-[92px] sm:px-8">
        <SectionHeading eyebrow="05 / Experience" title="A short track record." className="mb-12" />
        <div className="flex flex-col">
          {experience.map((e) => (
            <div key={e.role + e.org} className="grid grid-cols-1 gap-2 sm:grid-cols-[132px_1fr] sm:gap-7">
              <div className="pt-0.5 font-mono text-[13px] leading-normal font-semibold text-muted-foreground sm:text-right">
                {e.period}
              </div>
              <div className="relative border-l border-white/10 pb-10 pl-[30px]">
                <span className="absolute top-1 -left-[5px] size-[9px] rounded-full bg-primary shadow-[0_0_0_4px_rgba(233,180,76,0.16)]" />
                <h3 className="font-heading text-[19px] leading-tight font-semibold text-foreground">
                  {e.role}
                </h3>
                <div className="mt-1 font-mono text-[13.5px] font-medium text-muted-foreground">
                  {e.org}
                </div>
                <ul className="mt-3.5 flex flex-col gap-2">
                  {e.points.map((pt) => (
                    <li key={pt} className="relative pl-5 text-[15.5px] leading-relaxed text-muted-foreground">
                      <span className="absolute top-0 left-0 text-primary">→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
