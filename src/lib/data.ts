/*
  All site content in one place. Experience and summary come from the current
  LinkedIn profile export; projects are real shipped work.
*/

export const site = {
  name: "Labib Kamran",
  role: "Software Engineer",
  tagline: "Turning messy, complex problems into clean, scalable products.",
  description:
    "I build full-stack web and cloud applications for startups and global clients, taking ideas from rough concept to something reliable and ready to scale. Node.js and Google Cloud on the back end, React on the front.",
  email: "labibkamran2003@gmail.com",
  githubUser: "labibkamran",
  github: "https://github.com/labibkamran",
  linkedin: "https://www.linkedin.com/in/labibkamran/",
  resume:
    "https://drive.google.com/file/d/1b3CRhrYtIV_yjHcONxDzypyYTwH_Je8y/view?usp=sharing",
  url: "https://www.labibkamran.com",
};

export type CaseStudy = {
  kicker: string;
  title: string;
  summary: string;
  stack: string[];
  overview: string;
  built: string[];
  outcomes: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    kicker: "AI · Enterprise systems",
    title: "AI-Driven Investigation System",
    summary:
      "Large language models combined with an e-office workflow, helping investigation teams process and act on information faster.",
    stack: ["LLMs", "Backend APIs", "E-office integration"],
    overview:
      "An AI-driven investigation system that combines large language models with an e-office workflow. Teams were buried in unstructured documents and records spread across disconnected tools, so this platform turns that raw information into something they can search, structure, and act on.",
    built: [
      "LLM-powered features that turn unstructured documents and records into searchable, structured insights.",
      "AI capabilities integrated into an e-office system so investigation and case workflows run in one connected platform.",
      "Backend services and APIs connecting the LLM layer with the application, with a focus on reliability and clean architecture.",
    ],
    outcomes: [
      "Investigation and case workflows run end to end in one connected platform.",
      "Teams process and act on information faster, with insights instead of raw documents.",
    ],
  },
  {
    kicker: "AI · EdTech",
    title: "Intelligent Tutoring Platform",
    summary:
      "Raw video tutoring sessions transformed into structured, AI-powered learning experiences through a sophisticated AI pipeline.",
    stack: ["LangChain", "Groq LLM", "AI pipeline"],
    overview:
      "An intelligent tutoring platform that bridges the gap between live tutoring sessions and structured, personalized learning materials. A sophisticated AI pipeline takes each raw session and produces everything a tutor and student need to keep learning moving.",
    built: [
      "AI-powered pipeline covering topic extraction, progress evaluation, quiz generation, and executive summaries.",
      "Tutor dashboard with session management, transcript uploads, student tracking, and professional PDF export.",
      "Student dashboard with session discovery, interactive quizzes, progress analytics, and Calendly integration.",
      "Real-time AI processing powered by LangChain and Groq LLM.",
    ],
    outcomes: [
      "End-to-end functionality from session creation to student learning.",
      "AI that goes beyond summarization into true topic modeling and adaptive quiz generation.",
      "Professional-grade PDF exports for tutors.",
    ],
  },
  {
    kicker: "Full-stack · Gamification",
    title: "Gamified Quiz Platform",
    summary:
      "A gamified quiz platform that makes learning engaging and competitive, with points, leaderboards, and real-time ranking.",
    stack: ["Realtime ranking", "Scalable architecture", "Cross-device"],
    overview:
      "A gamified quiz platform designed for fun learning and healthy competition. Users test their knowledge across various topics, earn points, and climb leaderboards, all through a user-friendly interface that keeps the focus on learning.",
    built: [
      "Dynamic quizzes across a range of topics with a points-based scoring system.",
      "Real-time ranking and leaderboards that drive healthy competition.",
      "A user-friendly interface designed around engagement and fun learning.",
    ],
    outcomes: [
      "Scalable architecture delivering seamless performance across devices.",
      "Learning that feels like a game: engaging, competitive, and repeatable.",
    ],
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
      "Building an AI-driven investigation system that combines LLMs with an e-office workflow.",
      "Turn unstructured documents and records into searchable, structured insights.",
      "Build the backend services and APIs connecting the LLM layer to the application.",
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
    role: "Backend Engineer",
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
