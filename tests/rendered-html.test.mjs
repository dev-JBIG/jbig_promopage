import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders public pages as HTML", async () => {
  for (const pathname of ["/", "/constellation", "/recruit"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should return 200`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.match(html, /<title>[^<]+<\/title>/i);
    assert.doesNotMatch(
      html,
      /codex-preview|Your site is taking shape|SkeletonPreview|_sites-preview|site-creator-vinext-starter/i,
    );
  }
});

test("keeps public pages responsive and reduced-motion aware", async () => {
  const [layout, globalCss, constellationCss, recruitCss] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/constellation/constellation.css", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/recruit.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /<html lang="ko">/);
  for (const css of [globalCss, constellationCss, recruitCss]) {
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
    assert.match(css, /@media\s*\(max-width:/);
  }
});

test("preserves recruitment page structure without fixing content counts", async () => {
  const response = await render("/recruit");
  const html = await response.text();

  assert.match(
    html,
    /<meta(?=[^>]*name="description")(?=[^>]*content="[^"]+")[^>]*>/i,
  );
  assert.match(
    html,
    /<link(?=[^>]*rel="canonical")(?=[^>]*href="https:\/\/jbig\.co\.kr\/recruit")[^>]*>/i,
  );
  assert.match(
    html,
    /<meta(?=[^>]*property="og:url")(?=[^>]*content="https:\/\/jbig\.co\.kr\/recruit")[^>]*>/i,
  );

  const sectionOrder = ["hero", "about", "curriculum", "testimonials", "awards", "fit", "faq", "apply"];
  let previousIndex = -1;
  for (const section of sectionOrder) {
    const currentIndex = html.indexOf(`data-recruit-section="${section}"`);
    assert.ok(currentIndex > previousIndex, `${section} should render in the expected page flow`);
    previousIndex = currentIndex;
  }

  assert.ok((html.match(/class="acronym-card"/g) ?? []).length > 0);
  assert.ok((html.match(/class="testimonial-story"/g) ?? []).length > 0);
  assert.ok((html.match(/class="week-detail-heading"/g) ?? []).length > 0);

  const phaseCount = (html.match(/data-curriculum-phase=/g) ?? []).length;
  assert.ok(phaseCount > 0);
  assert.equal((html.match(/data-phase-open=/g) ?? []).length, phaseCount);
  assert.equal((html.match(/aria-haspopup="dialog"/g) ?? []).length, phaseCount);

  assert.match(html, /data-application-status="(?:available|unavailable)"/i);
  assert.doesNotMatch(html, /href=["']#["']/i);
  assert.match(html, /<a(?=[^>]*href="#recruit-main")[^>]*>/i);
  assert.match(html, /<main(?=[^>]*id="recruit-main")(?=[^>]*tabindex="-1")[^>]*>/i);
  assert.doesNotMatch(html, /tabindex="0"/i);
});

test("builds a self-contained nginx bundle for /recruit", async () => {
  const [html, assetFiles] = await Promise.all([
    readFile(new URL("../dist/deploy/index.html", import.meta.url), "utf8"),
    readdir(new URL("../dist/deploy/assets/", import.meta.url)),
    access(new URL("../dist/deploy/favicon.svg", import.meta.url)),
    access(new URL("../dist/deploy/recruit.rsc", import.meta.url)),
  ]);
  const builtCss = (await Promise.all(
    assetFiles
      .filter((name) => name.endsWith(".css"))
      .map((name) => readFile(new URL(`../dist/deploy/assets/${name}`, import.meta.url), "utf8")),
  )).join("\n");

  assert.match(html, /(?:href|src)="\/recruit\/assets\//i);
  assert.doesNotMatch(html, /(?:href|src)="\/assets\//i);
  assert.doesNotMatch(`${html}\n${builtCss}`, /\/recruit\/recruit\//i);
  assert.ok(assetFiles.some((name) => name.endsWith(".css")));
  assert.ok(assetFiles.some((name) => name.endsWith(".js")));

  const localAssetUrls = new Set([
    ...[...html.matchAll(/(?:href|src)="(\/recruit\/[^"?#]+)"/gi)].map((match) => match[1]),
    ...[...builtCss.matchAll(/url\((?:["'])?(\/recruit\/[^)"']+)/gi)].map((match) => match[1]),
  ]);
  for (const assetUrl of localAssetUrls) {
    const relativePath = assetUrl.slice("/recruit/".length);
    await access(new URL(`../dist/deploy/${relativePath}`, import.meta.url));
  }
});

test("keeps the curriculum modal keyboard-accessible", async () => {
  const curriculumShowcase = await readFile(
    new URL("../app/recruit/CurriculumShowcase.tsx", import.meta.url),
    "utf8",
  );

  assert.match(curriculumShowcase, /aria-haspopup="dialog"/);
  assert.match(curriculumShowcase, /role="dialog"/);
  assert.match(curriculumShowcase, /aria-modal="true"/);
  assert.match(curriculumShowcase, /event\.key === "Escape"/);
  assert.match(curriculumShowcase, /triggerRef\.current\?\.focus\(\)/);
});
