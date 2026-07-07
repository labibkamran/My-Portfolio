/*
  Shared section header: numbered mono eyebrow + display heading,
  matching the reference design's section rhythm.
*/
export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="mb-4 block font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary">
        {eyebrow}
      </span>
      <h2 className="font-heading text-[clamp(28px,4vw,40px)] leading-[1.12] font-semibold tracking-[-0.015em] text-foreground">
        {title}
      </h2>
    </div>
  );
}
