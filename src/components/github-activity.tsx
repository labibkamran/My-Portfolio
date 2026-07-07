"use client";

/*
  Live GitHub activity: contribution heatmap + streak stats + 30-day sparkline.
  Tries our own /api/github-stats route first (server-side token, includes
  private-repo contributions); if that's not configured it falls back to the
  public GitHub REST API (repos/followers) and the github-contributions-api.jogruber.de
  proxy (public contributions only). A deterministic mock renders first so the
  section never looks broken while either source loads or if both are unreachable.
*/
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/data";

const MS = 86400000;
const LEVEL_COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(233,180,76,0.30)",
  "rgba(233,180,76,0.52)",
  "rgba(233,180,76,0.76)",
  "#E9B44C",
];

type ByDate = Record<string, number>;
type Cell = { level: number; future: boolean };
type Stats = {
  total: number;
  current: number;
  longest: number;
  repos: number;
  followers: number;
};

function fmt(d: Date) {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${d.getFullYear()}-${m < 10 ? "0" + m : m}-${day < 10 ? "0" + day : day}`;
}

function today() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

function levelFor(count: number) {
  return count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;
}

function buildMock(): ByDate {
  const t = today();
  let a = 20260707 >>> 0;
  const rng = () => {
    a = (a + 0x6d2b79f5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  const byDate: ByDate = {};
  for (let i = 370; i >= 0; i--) {
    const d = new Date(t.getTime() - i * MS);
    const recency = (370 - i) / 370;
    const weekend = d.getDay() === 0 || d.getDay() === 6 ? 0.5 : 1;
    let count = 0;
    if (rng() < (0.34 + 0.42 * recency) * weekend) {
      count = 1 + Math.floor(rng() * (2 + 13 * recency));
    }
    if (rng() < 0.05) count += Math.floor(rng() * 7);
    byDate[fmt(d)] = Math.min(count, 18);
  }
  return byDate;
}

function buildWeeks(byDate: ByDate) {
  const t = today();
  const start = new Date(t);
  start.setDate(t.getDate() - t.getDay() - 52 * 7);
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weeks: Cell[][] = [];
  const months: { index: number; label: string }[] = [];
  let prev = -1;
  const cur = new Date(start);
  for (let w = 0; w < 53; w++) {
    const col: Cell[] = [];
    for (let d = 0; d < 7; d++) {
      col.push({ level: levelFor(byDate[fmt(cur)] ?? 0), future: cur.getTime() > t.getTime() });
      cur.setTime(cur.getTime() + MS);
    }
    const first = new Date(start.getTime() + w * 7 * MS);
    if (first.getMonth() !== prev && first.getDate() <= 7) {
      months.push({ index: w, label: MON[first.getMonth()] });
      prev = first.getMonth();
    }
    weeks.push(col);
  }
  return { weeks, months };
}

function computeStats(byDate: ByDate) {
  const t = today();
  let total = 0;
  let longest = 0;
  let run = 0;
  for (let i = 364; i >= 0; i--) {
    const c = byDate[fmt(new Date(t.getTime() - i * MS))] ?? 0;
    total += c;
    if (c > 0) {
      run++;
      if (run > longest) longest = run;
    } else run = 0;
  }
  let current = 0;
  for (let i = 0; i < 400; i++) {
    const c = byDate[fmt(new Date(t.getTime() - i * MS))] ?? 0;
    if (c > 0) current++;
    else break;
  }
  return { total, longest, current };
}

function computeSpark(byDate: ByDate) {
  const t = today();
  const arr: number[] = [];
  for (let i = 29; i >= 0; i--) {
    arr.push(byDate[fmt(new Date(t.getTime() - i * MS))] ?? 0);
  }
  return arr;
}

function fnum(n: number) {
  return (n || 0).toLocaleString("en-US");
}

function Sparkline({ data }: { data: number[] }) {
  const W = 760;
  const H = 84;
  const pad = 6;
  const max = Math.max(1, ...data);
  const pts = data.map((v, i) => [
    pad + i * ((W - 2 * pad) / (data.length - 1)),
    H - pad - (v / max) * (H - 2 * pad),
  ]);
  const line = pts
    .map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1))
    .join(" ");
  const area = `${line} L ${W - pad} ${H - pad} L ${pad} ${H - pad} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={84} preserveAspectRatio="none" className="block">
      <defs>
        <linearGradient id="spk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9B44C" stopOpacity={0.32} />
          <stop offset="1" stopColor="#E9B44C" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spk)" />
      <path d={line} fill="none" stroke="#E9B44C" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Heatmap({ weeks, months }: { weeks: Cell[][]; months: { index: number; label: string }[] }) {
  const cols = weeks.length
    ? weeks
    : Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => ({ level: 0, future: false })));
  const monthAt: Record<number, string> = {};
  months.forEach((m) => (monthAt[m.index] = m.label));
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  return (
    <div className="inline-block">
      <div className="ml-[30px] flex h-[15px]">
        {cols.map((_, i) => (
          <div key={i} className="w-[15px] flex-none font-mono text-[11px] font-medium whitespace-nowrap text-muted-foreground/75">
            {monthAt[i] || ""}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="mr-1.5 flex w-6 flex-col gap-[3px]">
          {dayLabels.map((l, i) => (
            <div key={i} className="h-3 text-right font-mono text-[10px] leading-3 font-medium text-muted-foreground/75">
              {l}
            </div>
          ))}
        </div>
        <div className="flex gap-[3px]">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-[3px]">
              {col.map((c, ri) => (
                <div
                  key={ri}
                  className="size-3 rounded-[3px]"
                  style={{ background: LEVEL_COLORS[c.level], opacity: c.future ? 0 : 1 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GithubActivity() {
  const [stats, setStats] = useState<Stats>({ total: 0, current: 0, longest: 0, repos: 0, followers: 0 });
  const [weeks, setWeeks] = useState<Cell[][]>([]);
  const [months, setMonths] = useState<{ index: number; label: string }[]>([]);
  const [spark, setSpark] = useState<number[]>([]);
  const targets = useRef<Stats>({ total: 0, current: 0, longest: 0, repos: 0, followers: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const animate = (t: Stats) => {
      cancelAnimationFrame(raf.current);
      const from = { ...targets.current };
      targets.current = t;
      const dur = 950;
      const st = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - st) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setStats({
          total: Math.round(from.total + (t.total - from.total) * e),
          current: Math.round(from.current + (t.current - from.current) * e),
          longest: Math.round(from.longest + (t.longest - from.longest) * e),
          repos: Math.round(from.repos + (t.repos - from.repos) * e),
          followers: Math.round(from.followers + (t.followers - from.followers) * e),
        });
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    };

    const apply = (byDate: ByDate, extra?: { repos: number; followers: number }) => {
      const built = buildWeeks(byDate);
      const s = computeStats(byDate);
      setWeeks(built.weeks);
      setMonths(built.months);
      setSpark(computeSpark(byDate));
      animate({
        ...s,
        repos: extra?.repos ?? targets.current.repos,
        followers: extra?.followers ?? targets.current.followers,
      });
    };

    apply(buildMock());

    (async () => {
      try {
        const r = await fetch("/api/github-stats");
        if (r.ok) {
          const j = await r.json();
          if (j?.byDate) {
            apply(j.byDate, { repos: j.repos, followers: j.followers });
            return;
          }
        }
      } catch {}

      let extra: { repos: number; followers: number } | undefined;
      try {
        const r = await fetch(`https://api.github.com/users/${site.githubUser}`);
        if (r.ok) {
          const j = await r.json();
          extra = { repos: j.public_repos, followers: j.followers };
        }
      } catch {}
      try {
        const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`);
        if (r.ok) {
          const j = await r.json();
          if (Array.isArray(j?.contributions)) {
            const byDate: ByDate = {};
            for (const c of j.contributions) byDate[c.date] = c.count;
            apply(byDate, extra);
            return;
          }
        }
      } catch {}
      if (extra) animate({ ...targets.current, ...extra });
    })();

    return () => cancelAnimationFrame(raf.current);
  }, []);

  const tiles = [
    { value: fnum(stats.total), label: "contributions · last year", accent: true },
    { value: fnum(stats.current), label: "day current streak" },
    { value: fnum(stats.longest), label: "day longest streak" },
    { value: fnum(stats.repos), label: "public repositories" },
  ];

  return (
    <section id="github" aria-label="GitHub activity" className="relative">
      <div className="relative mx-auto max-w-[1120px] px-6 py-[92px] sm:px-8">
        <div className="pointer-events-none absolute top-10 right-[6%] h-[340px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(233,180,76,0.14),transparent_62%)] blur-[50px]" />
        <div className="relative mb-10">
          <SectionHeading eyebrow="03 / GitHub activity" title="Building in the open." />
          <p className="mt-3.5 text-[17px] leading-relaxed text-muted-foreground">
            A live snapshot from{" "}
            <a href={site.github} target="_blank" rel="noopener" className="text-primary hover:text-primary/80">
              @{site.githubUser}
            </a>
            . It refreshes itself, and falls back gracefully if GitHub is unreachable.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_28px_70px_-34px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:p-[30px]">
          <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-5">
                <div
                  className={`font-heading text-[clamp(30px,4vw,42px)] leading-none font-semibold tracking-[-0.02em] ${t.accent ? "text-primary" : "text-foreground"}`}
                >
                  {t.value}
                </div>
                <div className="mt-2 font-mono text-[12.5px] leading-[1.3] font-medium text-muted-foreground">
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.07] pt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="font-mono text-[12.5px] font-semibold tracking-[0.1em] uppercase text-foreground/85">
                Contributions · last 12 months
              </span>
              <div className="hidden items-center gap-[7px] font-mono text-[11.5px] font-medium text-muted-foreground/75 sm:flex">
                <span>Less</span>
                {LEVEL_COLORS.map((c) => (
                  <span key={c} className="size-[11px] rounded-[3px]" style={{ background: c }} />
                ))}
                <span>More</span>
              </div>
            </div>
            <div className="overflow-x-auto pb-1">
              <Heatmap weeks={weeks} months={months} />
            </div>
          </div>

          <div className="mt-6 border-t border-white/[0.07] pt-[22px]">
            <span className="mb-3.5 block font-mono text-[12.5px] font-semibold tracking-[0.1em] uppercase text-foreground/85">
              Daily commits · last 30 days
            </span>
            <Sparkline data={spark.length ? spark : new Array(30).fill(0)} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5 border-t border-white/[0.07] pt-5">
            <span className="font-mono text-[13px] font-medium text-muted-foreground">
              @{site.githubUser} · {fnum(stats.followers)} followers
            </span>
            <a
              href={site.github}
              target="_blank"
              rel="noopener"
              className="font-heading text-[13.5px] font-semibold text-primary hover:text-primary/80"
            >
              View profile →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
