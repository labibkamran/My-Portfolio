"use client";

/*
  Case studies: glass cards that open a detail dialog — an end-to-end journey
  through overview, what was built, and key achievements.
*/
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/section-heading";
import { caseStudies, type CaseStudy } from "@/lib/data";

function JourneyBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-xs font-semibold tracking-[0.16em] uppercase text-primary">
        {label}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="relative pl-5 text-[15px] leading-relaxed text-foreground/85">
            <span className="absolute top-0 left-0 text-primary">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Dialog>
      <Card className="gap-0 rounded-[20px] border-white/10 bg-white/[0.045] p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/30">
        <div className="flex flex-1 flex-col gap-3.5 p-6 pb-7">
          <span className="font-mono text-[11.5px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
            {cs.kicker}
          </span>
          <h3 className="font-heading text-[22px] leading-[1.2] font-semibold tracking-[-0.01em] text-foreground">
            {cs.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {cs.summary}
          </p>
          <div className="mt-0.5 flex flex-wrap gap-[7px]">
            {cs.stack.map((t) => (
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
            <DialogTrigger className="cursor-pointer font-heading text-[13.5px] font-semibold text-foreground transition-colors hover:text-primary">
              Read case study →
            </DialogTrigger>
          </div>
        </div>
      </Card>
      <DialogContent className="max-h-[85vh] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-3xl border-white/10 bg-card p-8 ring-white/10 sm:max-w-2xl sm:p-10">
        <span className="mb-4 block font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary">
          Case study · {cs.kicker}
        </span>
        <DialogTitle className="font-heading text-[clamp(24px,3.5vw,32px)] leading-[1.15] font-semibold tracking-[-0.015em] text-foreground">
          {cs.title}
        </DialogTitle>
        <DialogDescription className="mt-4 text-base leading-[1.7] text-muted-foreground">
          {cs.overview}
        </DialogDescription>
        <div className="mt-8 flex flex-col gap-8">
          <JourneyBlock label="What I built" items={cs.built} />
          <JourneyBlock label="Key achievements" items={cs.outcomes} />
          <div className="flex flex-wrap gap-[7px] border-t border-white/[0.07] pt-6">
            {cs.stack.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="rounded-full border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" aria-label="Case studies">
      <div className="mx-auto max-w-[1120px] px-6 py-[92px] sm:px-8">
        <SectionHeading
          eyebrow="02 / Case studies"
          title="Problems solved, and what changed because of it."
          className="mb-11 [&>h2]:max-w-[18ch]"
        />
        <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.title} cs={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}
