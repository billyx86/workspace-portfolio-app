// Static content for the Billy King portfolio site.
// Kept in its own module so the test suite can import it without a DOM.

export const projects = [
  {
    title: "Northwind Analytics",
    tag: "SaaS dashboard",
    blurb:
      "Real-time analytics product with role-based access, custom reports, and delightful empty states.",
    stack: ["React", "TanStack", "Postgres"],
    glow: "rgba(232,255,106,0.22)",
    x: "85%",
    y: "15%",
  },
  {
    title: "Lumen Studio",
    tag: "Design system",
    blurb:
      "Token-driven component library adopted by three product teams. Docs site included.",
    stack: ["TypeScript", "Storybook", "Radix"],
    glow: "rgba(120,180,255,0.22)",
    x: "20%",
    y: "30%",
  },
  {
    title: "Orbit Mail",
    tag: "Productivity",
    blurb:
      "Keyboard-first inbox with smart triage, shared labels, and offline-first sync.",
    stack: ["Next.js", "SQLite", "WebSocket"],
    glow: "rgba(255,140,100,0.22)",
    x: "70%",
    y: "70%",
  },
  {
    title: "Atlas Maps",
    tag: "Interactive map",
    blurb:
      "Exploration UI for city-scale datasets — clustering, filters, and export pipelines.",
    stack: ["MapLibre", "Vite", "Python"],
    glow: "rgba(160,255,190,0.2)",
    x: "30%",
    y: "20%",
  },
];

export const experience = [
  { role: "Staff Product Engineer", org: "Horizon Labs", years: "2023 — Present" },
  { role: "Senior Frontend Engineer", org: "Parcel Co.", years: "2020 — 2023" },
  { role: "Full-stack Developer", org: "Studio North", years: "2018 — 2020" },
];

export const skills = [
  "TypeScript",
  "React",
  "Node.js",
  "TanStack",
  "Tailwind",
  "Postgres",
  "GraphQL",
  "Design systems",
  "Figma",
  "Accessibility",
  "Performance",
  "Motion",
  "Product strategy",
];
