import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  escapeHtml,
  safeCssValue,
  renderProjectsHtml,
  renderExperienceHtml,
  renderSkillsHtml,
  greetingFor,
} from "../app.js";
import { projects, experience, skills } from "../data.js";

const here = dirname(fileURLToPath(import.meta.url));
const indexHtml = readFileSync(join(here, "..", "index.html"), "utf8");

test("escapeHtml neutralises markup and quotes", () => {
  assert.equal(
    escapeHtml(`<script>alert('x')&"</script>`),
    "&lt;script&gt;alert(&#39;x&#39;)&amp;&quot;&lt;/script&gt;",
  );
});

test("safeCssValue accepts css values, rejects injection-prone ones", () => {
  assert.equal(safeCssValue("rgba(232,255,106,0.22)"), "rgba(232,255,106,0.22)");
  assert.equal(safeCssValue("85%"), "85%");
  assert.equal(safeCssValue("bad; background:url(x)"), "transparent");
  assert.equal(safeCssValue('a"b'), "transparent");
  assert.equal(safeCssValue("a\\b"), "transparent");
  assert.equal(safeCssValue("ok-value", "x"), "ok-value");
  assert.equal(safeCssValue("a;b", "fallback"), "fallback");
});

test("renderProjectsHtml escapes hostile data and css values", () => {
  const evil = [
    {
      ...projects[0],
      title: "<img src=x onerror=alert(1)>",
      glow: "rgb(0,0,0); background:url(https://evil.example)",
      stack: ['"><script>'],
    },
  ];
  const html = renderProjectsHtml(evil);
  assert.ok(!html.includes("<img src=x"), "raw hostile tag leaked");
  assert.ok(html.includes("&lt;img src=x onerror=alert(1)&gt;"));
  assert.ok(!html.includes("; background:url"), "css injection leaked");
  assert.ok(!html.includes("<script>"));
  assert.equal(html.match(/<article class="project"/g).length, 1);
});

test("renderProjectsHtml renders every shipped project", () => {
  const html = renderProjectsHtml();
  assert.equal(html.match(/<article class="project"/g).length, projects.length);
  for (const p of projects) assert.ok(html.includes(p.title), `missing ${p.title}`);
});

test("renderExperienceHtml and renderSkillsHtml cover + escape data", () => {
  const e = renderExperienceHtml();
  assert.equal(e.match(/<li>/g).length, experience.length);
  for (const x of experience) assert.ok(e.includes(x.role));

  const s = renderSkillsHtml();
  assert.equal(s.match(/<span class="skill">/g).length, skills.length);
  for (const x of skills) assert.ok(s.includes(x));

  const hostile = renderSkillsHtml(['"><script>alert(1)']);
  assert.ok(!hostile.includes("<script>"));
});

test("greetingFor uses the first word with a fallback", () => {
  assert.equal(greetingFor("Ada Lovelace"), "Ada");
  assert.equal(greetingFor("  Grace   Hopper "), "Grace");
  assert.equal(greetingFor(""), "there");
  assert.equal(greetingFor(null), "there");
});

test("index.html: no duplicate element ids", () => {
  const ids = [...indexHtml.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  assert.deepEqual(dupes, [], `duplicate ids: ${dupes.join(", ")}`);
});

test("index.html: every in-page anchor resolves to an existing id", () => {
  const ids = new Set([...indexHtml.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const hrefs = [...indexHtml.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  assert.ok(hrefs.length > 0, "expected some in-page anchors");
  for (const h of hrefs) assert.ok(ids.has(h), `dangling anchor #${h}`);
});

test("index.html: skills renderer targets a real, non-section container", () => {
  assert.ok(indexHtml.includes('id="skills-list"'), "skills-list container missing");
  assert.ok(
    !/<section[^>]*id="skills-list"/.test(indexHtml),
    "skills-list must not be the section element",
  );
});

test("index.html: contact form status is an aria live region", () => {
  assert.match(indexHtml, /id="form-status"[^>]*role="status"/);
});
