/*
  Contact: centered glass CTA panel with email, résumé, and social links.
*/
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact">
      <div className="mx-auto max-w-[1120px] px-6 py-[92px] pb-[100px] sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_70px_-34px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:px-10">
          <div className="pointer-events-none absolute -top-[90px] left-1/2 h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,180,76,0.16),transparent_64%)] blur-[52px]" />
          <div className="relative">
            <SectionHeading
              eyebrow="06 / Contact"
              title="Let's build something that lasts."
              className="[&>h2]:mx-auto [&>h2]:max-w-[16ch] [&>h2]:text-[clamp(30px,4.5vw,46px)]"
            />
            <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-relaxed text-muted-foreground">
              Have a problem worth solving? I&apos;m open to full-stack and cloud
              projects. Tell me what you&apos;re building.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <a
                href={`mailto:${site.email}`}
                className={cn(
                  buttonVariants(),
                  "h-auto rounded-xl border-primary/50 px-6 py-3.5 font-heading text-[15px] font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(233,180,76,0.55)]"
                )}
              >
                Email me →
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-auto rounded-xl border-white/[0.14] bg-white/5 px-6 py-3.5 font-heading text-[15px] font-semibold text-foreground backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:bg-white/[0.09]"
                )}
              >
                Download résumé →
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6 border-t border-white/[0.08] pt-7">
              <a href={site.github} target="_blank" rel="noopener" className="text-[14.5px] font-medium text-muted-foreground transition-colors hover:text-primary">
                GitHub →
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener" className="text-[14.5px] font-medium text-muted-foreground transition-colors hover:text-primary">
                LinkedIn →
              </a>
              <a href={`mailto:${site.email}`} className="text-[14.5px] font-medium text-muted-foreground transition-colors hover:text-primary">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
