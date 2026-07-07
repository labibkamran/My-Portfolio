/*
  All site content in one place. Experience and summary come from the current
  LinkedIn profile export; projects are real shipped work.
*/

export const site = {
  name: "Labib Kamran",
  role: "Software Engineer",
  tagline: "Turning messy, complex problems into clean, scalable products.",
  description:
    "I build full-stack web and cloud applications for startups and global clients — taking ideas from rough concept to something reliable and ready to scale. Node.js and Google Cloud on the back end, React on the front.",
  email: "labibkamran2003@gmail.com",
  githubUser: "labibkamran",
  github: "https://github.com/labibkamran",
  linkedin: "https://www.linkedin.com/in/labibkamran/",
  resume:
    "https://drive.google.com/file/d/1B-O3vr3gLfHGCHQFrUIH0MGTKOZm6YjG/view?usp=sharing",
  url: "https://www.labibkamran.com",
};

export type Project = {
  kicker: string;
  title: string;
  problem: string;
  outcome: string;
  stack: string[];
  href: string;
  linkLabel: string;
};

export const projects: Project[] = [
  {
    kicker: "Full-stack · SaaS",
    title: "Dudo Management System",
    problem:
      "Codexon's projects, teams, and goals lived in scattered tools and chats.",
    outcome:
      "Built a comprehensive project management platform that brings planning, collaboration, and tracking into one system.",
    stack: ["Express", "TypeScript", "MongoDB"],
    href: "https://dudo.codexon.pk",
    linkLabel: "Visit live →",
  },
  {
    kicker: "Full-stack · Platform",
    title: "Discuss_it",
    problem:
      "Individuals and businesses had no direct, structured way to reach vetted experts.",
    outcome:
      "Co-built a platform giving direct access to experts across multiple fields, from discovery to conversation.",
    stack: ["Express", "TypeScript", "MySQL"],
    href: "https://www.discussit.co/",
    linkLabel: "Visit live →",
  },
  {
    kicker: "AI · Browser extension",
    title: "AI Research Assistant",
    problem:
      "Online research meant juggling tabs, notes, and sources with no organization.",
    outcome:
      "Shipped a Chrome extension that organizes findings, summarizes text with AI, and manages sources privately in the browser.",
    stack: ["Java", "Spring Boot", "Chrome APIs"],
    href: "https://github.com/labibkamran/AI-Research-Assistant-Frontend",
    linkLabel: "View code →",
  },
  {
    kicker: "Android · Realtime",
    title: "Quiz Rush",
    problem:
      "Quiz apps were single-player and static — no way to create, share, and compete live.",
    outcome:
      "Built an Android app with quiz creation, real-time multiplayer mode, and leaderboards.",
    stack: ["Kotlin", "MVVM", "Room", "Google Drive API"],
    href: "http://quizrush.online/",
    linkLabel: "Visit live →",
  },
  {
    kicker: "Computer vision · ML",
    title: "AI Traffic Density Analysis",
    problem:
      "Traffic monitoring from video footage needed manual counting and review.",
    outcome:
      "Fine-tuned YOLOv8 on a custom vehicle dataset to detect vehicles and analyze traffic density from raw video.",
    stack: ["Python", "YOLOv8", "OpenCV", "PyTorch"],
    href: "https://github.com/labibkamran/AI-Traffic-Density-Estimation",
    linkLabel: "View code →",
  },
  {
    kicker: "AI · Web3",
    title: "Oracis AI",
    problem:
      "Job seekers rebuilt CVs by hand and signed agreements over email with no trust layer.",
    outcome:
      "Co-developed AI-powered CV creation, personalized job matching, and secure NDA signing via blockchain smart contracts.",
    stack: ["React Native", "JavaScript", "Blockchain"],
    href: "https://github.com/TalalMajeed/Oracis-AI",
    linkLabel: "View code →",
  },
];

export const skillGroups = [
  {
    area: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "Kotlin", "SQL"],
  },
  {
    area: "Frontend",
    items: ["React", "Next.js", "Redux", "Tailwind CSS"],
  },
  {
    area: "Backend",
    items: ["Node.js", "Express", "Spring Boot", "REST", "GraphQL"],
  },
  {
    area: "Cloud & DevOps",
    items: ["Google Cloud", "AWS", "Docker", "Kubernetes", "CI/CD", "Nginx"],
  },
  {
    area: "Data & ML",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "PyTorch", "OpenCV"],
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
    period: "Oct 2025 — Now",
    role: "Senior Software Engineer",
    org: "PlutoSec · Toronto (remote)",
    points: [
      "Own cloud infrastructure and full-stack development for the internal management systems that run day-to-day operations.",
      "Reduced cloud infrastructure costs by 50% through better resource management and smarter architecture decisions.",
      "Lead features end to end — backend services and APIs in Node.js through to the React frontend.",
    ],
  },
  {
    period: "Feb 2026 — Now",
    role: "Software Engineer",
    org: "National Center of Artificial Intelligence (NCAI) · Pakistan",
    points: [
      "Building an AI-driven investigation system that combines LLMs with an e-office workflow.",
      "Turn unstructured documents and records into searchable, structured insights.",
      "Build the backend services and APIs connecting the LLM layer to the application.",
    ],
  },
  {
    period: "Jul 2025 — Now",
    role: "Freelance Full-Stack & Cloud Engineer",
    org: "Upwork · worldwide",
    points: [
      "100% job success rate with consistent 5-star feedback across international projects.",
      "Scope rough requirements into reliable, production-ready systems delivered on time.",
    ],
  },
  {
    period: "Feb — Nov 2025",
    role: "Full-Stack & DevOps Engineer",
    org: "Codexon Solutions · Islamabad",
    points: [
      "Built full-stack web applications for client projects — APIs, frontends, and third-party integrations.",
      "Improved deployment workflows with CI/CD and cloud best practices, making releases faster and more stable.",
    ],
  },
  {
    period: "Jul 2024 — Jun 2025",
    role: "Backend Engineer",
    org: "Veron Solutions · Islamabad",
    points: [
      "Built backend APIs and services focused on performance and clean architecture.",
      "Designed and optimized database schemas and server-side logic for production use.",
    ],
  },
  {
    period: "Jun 2024 — Jun 2025",
    role: "Software Engineer (Computer Vision)",
    org: "Machine Vision & Intelligent Systems Lab · NUST",
    points: [
      "Contributed to applied computer vision and machine learning projects in a research environment.",
      "Built and tested prototypes and supported development of ML-driven features.",
    ],
  },
  {
    period: "2023 — 2027",
    role: "BS Computer Science",
    org: "National University of Sciences and Technology (NUST) · Islamabad",
    points: [
      "Data structures, algorithms, OOP, database systems, and computer networks — alongside coding competitions and hackathons.",
    ],
  },
];
