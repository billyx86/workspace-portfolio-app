const projects = [
  {
    title: "Northwind Analytics",
    tag: "SaaS dashboard",
    blurb: "Real-time analytics product with role-based access, custom reports, and delightful empty states.",
    stack: ["React", "TanStack", "Postgres"],
    glow: "rgba(232,255,106,0.22)",
    x: "85%",
    y: "15%",
  },
  {
    title: "Lumen Studio",
    tag: "Design system",
    blurb: "Token-driven component library adopted by three product teams. Docs site included.",
    stack: ["TypeScript", "Storybook", "Radix"],
    glow: "rgba(120,180,255,0.22)",
    x: "20%",
    y: "30%",
  },
  {
    title: "Orbit Mail",
    tag: "Productivity",
    blurb: "Keyboard-first inbox with smart triage, shared labels, and offline-first sync.",
    stack: ["Next.js", "SQLite", "WebSocket"],
    glow: "rgba(255,140,100,0.22)",
    x: "70%",
    y: "70%",
  },
  {
    title: "Atlas Maps",
    tag: "Interactive map",
    blurb: "Exploration UI for city-scale datasets — clustering, filters, and export pipelines.",
    stack: ["MapLibre", "Vite", "Python"],
    glow: "rgba(160,255,190,0.2)",
    x: "30%",
    y: "20%",
  },
];

const experience = [
  { role: "Staff Product Engineer", org: "Horizon Labs", years: "2023 — Present" },
  { role: "Senior Frontend Engineer", org: "Parcel Co.", years: "2020 — 2023" },
  { role: "Full-stack Developer", org: "Studio North", years: "2018 — 2020" },
];

const skills = [
  "TypeScript", "React", "Node.js", "TanStack", "Tailwind",
  "Postgres", "GraphQL", "Design systems", "Figma", "Accessibility",
  "Performance", "Motion", "Product strategy",
];

function renderProjects() {
  const root = document.getElementById("projects");
  root.innerHTML = projects
    .map(
      (p) => `
      <article class="project" style="--glow:${p.glow};--x:${p.x};--y:${p.y}">
        <span class="project-tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <div class="meta">${p.stack.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
      </article>`
    )
    .join("");
}

function renderExperience() {
  const root = document.getElementById("experience");
  root.innerHTML = experience
    .map(
      (e) => `
      <li>
        <span class="role">${e.role}</span>
        <span class="org">${e.org}</span>
        <span class="years">${e.years}</span>
      </li>`
    )
    .join("");
}

function renderSkills() {
  const root = document.getElementById("skills");
  root.innerHTML = skills.map((s) => `<span class="skill">${s}</span>`).join("");
}

function setupForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "there").split(" ")[0];
    status.hidden = false;
    status.textContent = `Thanks, ${name} — message received (demo). I'll get back soon.`;
    form.reset();
  });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
renderProjects();
renderExperience();
renderSkills();
setupForm();
