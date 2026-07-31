import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

test("server-renders the JBIG promotional hero", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>JBIG — 전북대 유일 데이터 분석 동아리<\/title>/i);
  assert.match(html, /전북대 유일/);
  assert.match(html, /데이터 분석 동아리/);
  assert.match(html, /Live Intelligence/);
  assert.match(html, /class="trend-chart"/);
  assert.match(html, /class="network"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders the scroll-driven JBIG constellation", async () => {
  const response = await render("/constellation");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /흩어진 신호가/);
  assert.match(html, /FROM DATA TO/);
  assert.match(html, /INSIGHT/);
  assert.match(html, /aria-label="흩어진 데이터 노드가 스크롤에 따라 JBIG 글자로 모이는 애니메이션"/);
});

test("keeps the experiment accessible and free of starter remnants", async () => {
  const [page, constellation, constellationCss, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/constellation/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/constellation/constellation.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-label="상승하는 데이터 분석 성과 그래프"/);
  assert.match(page, /aria-label="연결된 구성원을 표현한 네트워크 그래프"/);
  assert.match(constellation, /requestAnimationFrame\(update\)/);
  assert.match(constellation, /smoothstep\(0\.38, 0\.78, progress\)/);
  assert.match(constellation, /JBIG로 수렴합니다/);
  assert.match(constellationCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*680px\)/);
  assert.match(layout, /<html lang="ko">/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
