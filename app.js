// Billy King portfolio — data-driven rendering + contact form.
//
// The render/validation helpers below are pure and exported for unit tests
// (see test/app.test.js). The DOM bootstrap at the bottom of the file only
// runs when the script is loaded in a browser; importing the module in Node
// (as the tests do) is a no-op.

import { projects, experience, skills } from "./data.js";

/**
 * Escape a value for safe interpolation into innerHTML.
 * Neutralises <, >, & and both quote characters so data can never open a new
 * tag or break out of an attribute.
 */
export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// The glow / x / y values are interpolated into an inline style attribute.
// HTML-escaping is not enough there: a ";" would begin a new declaration and
// a quote would break out of the attribute. Only allow a conservative
// character set and fall back to a safe default otherwise.
const CSS_VALUE_RE = /^[a-zA-Z0-9#%(),.\s-]+$/;

export function safeCssValue(value, fallback = "transparent") {
  const v = String(value).trim();
  return CSS_VALUE_RE.test(v) ? v : fallback;
}

export function renderProjectsHtml(items = projects) {
  return items
    .map(
      (p) => `
      <article class="project" style="--glow:${safeCssValue(p.glow)};--x:${safeCssValue(p.x, "80%")};--y:${safeCssValue(p.y, "20%")}">
        <span class="project-tag">${escapeHtml(p.tag)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.blurb)}</p>
        <div class="meta">${p.stack
          .map((s) => `<span class="chip">${escapeHtml(s)}</span>`)
          .join("")}</div>
      </article>`,
    )
    .join("");
}

export function renderExperienceHtml(entries = experience) {
  return entries
    .map(
      (e) => `
      <li>
        <span class="role">${escapeHtml(e.role)}</span>
        <span class="org">${escapeHtml(e.org)}</span>
        <span class="years">${escapeHtml(e.years)}</span>
      </li>`,
    )
    .join("");
}

export function renderSkillsHtml(list = skills) {
  return list
    .map((s) => `<span class="skill">${escapeHtml(s)}</span>`)
    .join("");
}

/** First word of the sender's name, for the demo success message. */
export function greetingFor(name) {
  return String(name ?? "").trim().split(/\s+/)[0] || "there";
}

function mountSection(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function setupForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    status.hidden = false;
    status.textContent = `Thanks, ${greetingFor(
      data.get("name"),
    )} — message received (demo). I'll get back soon.`;
    form.reset();
  });
}

// Browser bootstrap (no-op in Node, which is what the tests import).
if (typeof document !== "undefined") {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
  mountSection("projects", renderProjectsHtml());
  mountSection("experience", renderExperienceHtml());
  // Target the inner chip container, NOT the skills <section> — the two used
  // to share id="skills", so getElementById hit the section and wiped its
  // heading + description. See the skills-list rename in index.html.
  mountSection("skills-list", renderSkillsHtml());
  setupForm();
}
