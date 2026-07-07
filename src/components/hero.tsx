/*
  Hero: the page's single h1, availability badge, primary CTAs, and stack facts.
*/
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";

const facts = [
  { label: "Stack", value: "Node.js · Google Cloud · React" },
  { label: "Focus", value: "Full-stack & cloud architecture" },
  { label: "Working", value: "Remote · worldwide" },
];

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 size-[540px] rounded-full bg-[radial-gradient(circle,rgba(233,180,76,0.20),transparent_62%)] blur-[46px]" />
      <div className="pointer-events-none absolute -right-16 -bottom-44 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(95,159,224,0.13),transparent_60%)] blur-[54px]" />
      <div className="relative mx-auto max-w-[1120px] px-6 pt-24 pb-24 sm:px-8 sm:pt-[124px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs font-semibold tracking-[0.22em] uppercase text-primary">
            {site.name} — {site.role}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md">
            <span className="size-2 rounded-full bg-[#3ecf8e] shadow-[0_0_10px_#3ecf8e]" />
            <span className="font-mono text-[12.5px] font-medium text-muted-foreground">
              Open to new projects
            </span>
          </span>
        </div>
        <h1 className="max-w-[16ch] font-heading text-[clamp(44px,7.6vw,86px)] leading-[1.03] font-semibold tracking-[-0.022em] text-foreground">
          {site.tagline}
        </h1>
        <p className="mt-7 max-w-[58ch] text-[19px] leading-[1.65] text-muted-foreground">
          {site.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <a
            href="#projects"
            className={cn(
              buttonVariants(),
              "h-auto rounded-xl border-primary/50 px-6 py-3.5 font-heading text-[15px] font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(233,180,76,0.55)]"
            )}
          >
            View my work →
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-auto rounded-xl border-white/10 bg-white/5 px-6 py-3.5 font-heading text-[15px] font-semibold text-foreground backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:bg-white/[0.09]"
            )}
          >
            Get in touch
          </a>
        </div>
        <div className="mt-14 flex flex-wrap gap-11 border-t border-white/[0.07] pt-8">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-2">
              <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
                {f.label}
              </span>
              <span className="text-[15px] font-medium text-foreground">
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
