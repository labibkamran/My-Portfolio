/*
  All site content in one place. Experience and summary match the LinkedIn
  profile; projects are real shipped work. Blog posts live in content/blog.
*/

export const site = {
  name: "Labib Kamran",
  role: "DevOps & Full-Stack Engineer",
  tagline: "I ship AI systems to production.",
  description:
    "I build the backend and LLM layer of NAB Eye, the AI investigation system Pakistan's National Accountability Bureau uses, and I own cloud infrastructure for a Toronto company, where I cut cloud costs by 50%. Most of my work is Go, Node.js, Kubernetes and Google Cloud, with Next.js on the front end.",
  location: "Islamabad, Pakistan",
  email: "labibkamran2003@gmail.com",
  githubUser: "labibkamran",
  github: "https://github.com/labibkamran",
  linkedin: "https://www.linkedin.com/in/labibkamran/",
  x: "https://x.com/LabibKamra6962",
  resume:
    "https://drive.google.com/file/d/1b3CRhrYtIV_yjHcONxDzypyYTwH_Je8y/view?usp=sharing",
  // Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://www.labibkamran.com) once the domain is live.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-portfolio-three-rust-67.vercel.app"
  ).replace(/\/$/, ""),
};

/** RSS <link rel="alternate">, repeated wherever a page sets its own alternates. */
export const rssFeed = {
  "application/rss+xml": [{ url: "/rss.xml", title: "Labib Kamran's blog" }],
};

export type CaseStudy = {
  kicker: string;
  title: string;
  summary: string;
  stack: string[];
  overview: string;
  built: string[];
  outcomes: string[];
  link?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    kicker: "Sovereign AI · GovTech",
    title: "NAB Eye: AI investigation system",
    summary:
      "An AI system that Pakistan's National Accountability Bureau now uses to work through investigation cases. It runs entirely inside the bureau's own network.",
    stack: ["LLMs on local GPUs", "Async AI services", "Role-based access", "Release pipeline"],
    overview:
      "NAB Eye was built at the National Center of Artificial Intelligence (NCAI) and formally inaugurated by the Chairman of NAB in 2026. One rule shaped the architecture: case data never goes to an outside AI service. Investigation officers and directors general use the same system and see different things, by region and rank.",
    built: [
      "The engineering backbone of the platform: the codebase, the release process, and bringing each team member's work together into one system that runs end to end.",
      "The backend and LLM layer. The platform hands the AI service a document, gets a job ID back and polls until the result is ready, so a slow model never freezes an officer's screen.",
      "Access that follows the bureau's own hierarchy, with every action recorded.",
    ],
    outcomes: [
      "The whole system, AI models included, runs on local GPUs inside NAB's private network. Case data never touches the public internet.",
      "New AI capabilities plug in as separate services, so adding one doesn't mean rebuilding the platform.",
    ],
    link: {
      href: "https://www.dawn.com/news/2010341",
      label: "Read the Dawn coverage",
    },
  },
  {
    kicker: "AI infrastructure · MCP",
    title: "Code Mode MCP server: 83% fewer tokens",
    summary:
      "A remote MCP server that connects Claude to a 121-operation admin API. Code Mode cut the tool definitions from 7,775 tokens to 1,322.",
    stack: ["MCP", "Code Mode", "QuickJS + WebAssembly", "Google Cloud Run", "OAuth 2.1"],
    overview:
      "Giving every API operation its own MCP tool would have cost 7,775 tokens on every request, before Claude read the user's message. With Code Mode, Claude gets two tools, search and execute, and writes a few lines of JavaScript against the API instead.",
    built: [
      "A remote MCP server on Cloudflare's open-source Code Mode library, where each user signs in with their own account (OAuth 2.1 with PKCE).",
      "A sandbox in QuickJS and WebAssembly on Google Cloud Run, with no network access and no secrets inside. Cloudflare's reference sandbox runs on Workers.",
      "Role filtering in the OpenAPI spec itself: an SEO user sees 62 operations and an admin sees 121.",
    ],
    outcomes: [
      "Tool definitions dropped from 7,775 to 1,322 tokens, measured with the o200k tokenizer on the real role-filtered specs.",
      "The cost stays at 1,322 tokens for every role, so adding operations no longer grows every prompt.",
    ],
    link: {
      href: "/blog/code-mode-mcp-cloud-run",
      label: "Read the full write-up",
    },
  },
  {
    kicker: "Mobile · Fintech",
    title: "CashPilot: expense and bill-splitting app",
    summary:
      "An Android app for tracking personal spending and splitting shared bills, built and shipped to Google Play end to end.",
    stack: ["Android", "Shared real-time ledger", "Google Play release"],
    overview:
      "CashPilot covers two jobs: tracking your own expenses and income, and keeping a shared ledger with roommates or travel companions so everyone sees the same balance. I built it and took it through the Google Play release process myself.",
    built: [
      "Personal expense, income and daily budget tracking.",
      "Group ledgers for splitting household bills and trip costs, kept in sync for everyone in the group.",
      "Ledger export, plus the store listing and the production release on Google Play.",
    ],
    outcomes: [
      "Live on Google Play.",
      "Shipped end to end by one engineer, from the first screen to the production release.",
    ],
    link: {
      href: "https://play.google.com/store/apps/details?id=com.codexon.cashpilot",
      label: "View on Google Play",
    },
  },
  {
    kicker: "Mobile · Open source",
    title: "Tadabbur: Qur'an chat and reading app",
    summary:
      "An Android app where you ask a question in plain language and get pointed to the verses themselves. Everything except Ask works offline.",
    stack: ["Expo + React Native", "TypeScript", "Next.js BFF", "Supabase"],
    overview:
      "Tadabbur is built around one idea: the app hands you the text or points to it, and never claims to interpret it. Only the Ask screen talks to a model, and it always says that its answer is a reflection, not a ruling. The whole Qur'an ships inside the app.",
    built: [
      "The Expo and React Native app: daily verse, guided reflection sessions, Ask, and a searchable verse-by-verse reader.",
      "A Next.js backend-for-frontend that is the only thing talking to Supabase (Postgres, Auth and row-level security). The app signs in with Google, then sends its token to the API.",
      "Offline-first storage, so every surface except Ask works with no network.",
    ],
    outcomes: [
      "The launch post on LinkedIn reached 24,058 impressions.",
      "Open source, with a web companion and an installable Android build.",
    ],
    link: {
      href: "https://github.com/labibkamran/Tadabbur",
      label: "View the code on GitHub",
    },
  },
  {
    kicker: "DevSecOps · Go · In progress",
    title: "mcpwarden: security scanner for MCP servers",
    summary:
      "An offline security scanner for MCP servers, written in Go. I'm building it in public.",
    stack: ["Go", "SARIF", "CI gating"],
    overview:
      "MCP servers now sit between AI agents and real systems, and most teams have no way to check them before they ship. mcpwarden will check a server's auth against the MCP spec and flag risky STDIO configurations, with text, JSON and SARIF output so it can fail a CI build.",
    built: [
      "The project foundation and CLI structure in Go.",
      "Planned checks: auth conformance and dangerous STDIO configs, run fully offline.",
    ],
    outcomes: [
      "Early stage. The scanning engine is the next milestone.",
    ],
    link: {
      href: "https://github.com/labibkamran/mcpwarden",
      label: "Follow it on GitHub",
    },
  },
  {
    kicker: "AI · EdTech",
    title: "Intelligent Tutoring Platform",
    summary:
      "An AI pipeline that turns recorded tutoring sessions into topics, quizzes, progress reports and summaries.",
    stack: ["LangChain", "Groq LLM", "AI pipeline"],
    overview:
      "Tutors had hours of session recordings and no structured material to show for them. This platform takes each session transcript and produces what the tutor and the student need next.",
    built: [
      "An AI pipeline for topic extraction, progress evaluation, quiz generation and session summaries.",
      "A tutor dashboard with session management, transcript uploads, student tracking and PDF export.",
      "A student dashboard with quizzes, progress analytics and Calendly booking.",
    ],
    outcomes: [
      "One flow from session upload to the student's next quiz.",
      "Tutors export polished PDF reports instead of writing them by hand.",
    ],
  },
];

export const skillGroups = [
  {
    area: "Languages",
    items: ["Go", "TypeScript", "JavaScript", "Python", "SQL", "Java"],
  },
  {
    area: "Cloud & DevOps",
    items: ["Google Cloud", "AWS", "Cloudflare", "Docker", "Kubernetes", "CI/CD", "Nginx"],
  },
  {
    area: "Backend",
    items: ["Node.js", "Express", "Django", "REST", "GraphQL", "Supabase"],
  },
  {
    area: "AI systems",
    items: ["LLM integration", "MCP servers", "LangChain", "Async AI services"],
  },
  {
    area: "Frontend & mobile",
    items: ["React", "Next.js", "React Native", "Tailwind CSS"],
  },
  {
    area: "Data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
  },
];

export type Experience = {
  period: string;
  role: string;
  org: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    period: "Oct 2025 - Now",
    role: "Senior Software Engineer",
    org: "PlutoSec · Toronto (remote)",
    points: [
      "Own cloud infrastructure and full-stack development for the internal management systems that run day-to-day operations.",
      "Reduced cloud infrastructure costs by 50% through better resource management and smarter architecture decisions.",
      "Lead features end to end, from backend services and APIs in Node.js through to the React frontend.",
    ],
  },
  {
    period: "Feb 2026 - Now",
    role: "Software Engineer",
    org: "National Center of Artificial Intelligence (NCAI) · Pakistan",
    points: [
      "Build the backend and LLM layer of NAB Eye, the AI investigation system the National Accountability Bureau uses, running on local GPUs inside the bureau's network.",
      "Own the codebase and release process, and integrate the team's work into one platform that runs end to end.",
    ],
  },
  {
    period: "Jul 2025 - Now",
    role: "Freelance Full-Stack & Cloud Engineer",
    org: "Upwork · worldwide",
    points: [
      "100% job success rate with consistent 5-star feedback across international projects.",
      "Scope rough requirements into reliable, production-ready systems delivered on time.",
    ],
  },
  {
    period: "Feb - Nov 2025",
    role: "Full-Stack & DevOps Engineer",
    org: "Codexon Solutions · Islamabad",
    points: [
      "Built full-stack web applications for client projects, covering APIs, frontends, and third-party integrations.",
      "Improved deployment workflows with CI/CD and cloud best practices, making releases faster and more stable.",
    ],
  },
  {
    period: "Jul 2024 - Jun 2025",
    role: "Full-Stack Engineer",
    org: "Veron Solutions · Islamabad",
    points: [
      "Built backend APIs and services focused on performance and clean architecture.",
      "Designed and optimized database schemas and server-side logic for production use.",
    ],
  },
  {
    period: "Jun 2024 - Jun 2025",
    role: "Software Engineer (Computer Vision)",
    org: "Machine Vision & Intelligent Systems Lab · NUST",
    points: [
      "Contributed to applied computer vision and machine learning projects in a research environment.",
      "Built and tested prototypes and supported development of ML-driven features.",
    ],
  },
  {
    period: "2023 - 2027",
    role: "BS Computer Science",
    org: "National University of Sciences and Technology (NUST) · Islamabad",
    points: [
      "Data structures, algorithms, OOP, database systems, and computer networks, alongside coding competitions and hackathons.",
    ],
  },
];
