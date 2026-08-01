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

test("server-renders the JBIG recruitment landing page", async () => {
  const response = await render("/recruit");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>JBIG 모집 \| 호기심이 팀이 되는 곳<\/title>/i);
  assert.match(
    html,
    /<meta(?=[^>]*name="description")(?=[^>]*content="[^"]*함께 배우고, 만들고, 도전하는[^"]*")[^>]*>/i,
  );
  assert.match(
    html,
    /<link(?=[^>]*rel="canonical")(?=[^>]*href="https:\/\/jbig\.co\.kr\/recruit")[^>]*>/i,
  );
  assert.match(
    html,
    /<meta(?=[^>]*property="og:url")(?=[^>]*content="https:\/\/jbig\.co\.kr\/recruit")[^>]*>/i,
  );

  for (const section of ["hero", "about", "curriculum", "awards", "fit", "faq", "apply"]) {
    assert.match(html, new RegExp(`data-recruit-section="${section}"`));
  }

  for (const phrase of [
    "JBIG가 무슨",
    "JBNU",
    "Big Data",
    "데이터 사이언스",
    "01–04",
    "데이터 분석대회",
    "코드 과제",
    "06–08",
    "딥러닝",
    "8주 일정 자세히 보기",
    "생성형 AI를 이용한 데이터 분석",
    "데이터는 어떻게 읽고 다듬어야 할까?",
    "모델이 잘하고 있는지는 어떻게 알 수 있을까?",
    "프로젝트 최종 발표",
    "도전은,",
    "46",
    "제주·AWS 글로벌 스페이스 챌린지 해커톤",
    "교육부장관상",
  ]) {
    assert.equal(html.includes(phrase), true, `missing recruitment copy: ${phrase}`);
  }

  for (const phrase of [
    "ACTIVE PROJECTS",
    "INSIGHT SCORE",
    "12 WEEKS",
    "Live Intelligence",
    "EXPERIMENT",
    "전북대 유일",
    "데이터와 모델을 하나의 분석 흐름으로 연결합니다",
    "질문부터 결과물까지",
    "8주 흐름",
    "운영 개편안",
    "생성형 AI와 데이터 분석",
    "데이터 읽기와 다듬기",
    "모델을 평가하는 법",
    "WEEKLY FLOW",
    "8주를 세 개의 흐름으로",
  ]) {
    assert.equal(html.toLowerCase().includes(phrase.toLowerCase()), false, `unexpected recruitment copy: ${phrase}`);
  }
  assert.doesNotMatch(html, />\s*(?:94\.8(?:\s*%)?|\+8\.4(?:\s*%)?)\s*</i);

  assert.doesNotMatch(
    html,
    /codex-preview|Your site is taking shape|SkeletonPreview|_sites-preview|site-creator-vinext-starter/i,
  );
  assert.match(html, /data-application-status="unavailable"/i);
  assert.match(html, /<button[^>]*(?:disabled(?:=""|="disabled")?|aria-disabled="true")[^>]*>/i);
  assert.doesNotMatch(html, /href=["']#["']/i);
  assert.match(html, /<a(?=[^>]*href="#recruit-main")[^>]*>/i);
  assert.match(html, /<main(?=[^>]*id="recruit-main")(?=[^>]*tabindex="-1")[^>]*>/i);
  assert.doesNotMatch(html, /tabindex="0"/i);
  assert.match(html, /class="liquid-logo"[^>]*role="img"/i);
  assert.match(html, /<details class="curriculum-detail">/i);
  assert.match(html, /<summary>\s*<span class="detail-label detail-label-closed">8주 일정 자세히 보기<\/span>/i);
  assert.match(html, /<small>WEEK<\/small>\s*<strong>01–04<\/strong>/i);
  assert.match(html, /class="week-detail-grid"/i);
  assert.match(html, /class="mini-mascot mascot-(?:wave|note|look|peek)/i);
  assert.match(html, /<details[^>]*open/i);
  assert.doesNotMatch(html, /<svg\b/i);
  assert.doesNotMatch(html, /aria-live=/i);
});

test("keeps recruitment visuals lightweight, responsive, and reduced-motion aware", async () => {
  const [recruitCss, recruitPage] = await Promise.all([
    readFile(new URL("../app/recruit/recruit.css", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(recruitCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(recruitCss, /@media\s*\(max-width:\s*760px\)/);
  assert.match(recruitCss, /liquidShimmer/);
  assert.match(recruitCss, /@keyframes\s+awardsRibbon/);
  assert.match(recruitCss, /\.plaque-medal/);
  assert.match(recruitCss, /\.plaque-glass/);
  assert.match(recruitCss, /\.plaque-ticket/);
  assert.match(recruitCss, /awards-motion-toggle:checked\s*~\s*\.awards-ribbons\s+\.awards-track/);
  assert.match(recruitCss, /\.award-ribbon-row\s*\{[^}]*width:\s*100%[^}]*min-width:\s*0/s);
  assert.match(recruitCss, /\.award-ribbon-viewport\s*\{[^}]*max-width:\s*100%/s);
  assert.match(recruitPage, /<AwardsRibbon\s*\/>/);
  assert.match(recruitCss, /fox-mascots\.webp/);
  assert.match(recruitCss, /\.phase-flow/);
  assert.doesNotMatch(recruitPage, /chart-heading|WEEKLY FLOW|8주를 세 개의 흐름으로/);
  assert.doesNotMatch(recruitCss, /\.chart-heading/);
  assert.match(recruitCss, /\.curriculum-detail\[open\]/);
  assert.match(recruitCss, /\.detail-label-open/);
  assert.match(recruitCss, /\.week-detail-grid/);
  assert.match(recruitCss, /\.liquid-logo > span\s*\{[^}]*background-clip:\s*text/s);
  assert.doesNotMatch(recruitCss, /\.liquid-logo > span\s*\{[^}]*aspect-ratio/s);
  assert.doesNotMatch(recruitPage, /"use client"/);
  assert.doesNotMatch(recruitPage, /requestAnimationFrame|IntersectionObserver|matchMedia/);

  await Promise.all([
    access(new URL("../public/recruit/fox-mascots.webp", import.meta.url)),
    assert.rejects(access(new URL("../app/recruit/RecruitHero.tsx", import.meta.url))),
    assert.rejects(access(new URL("../app/recruit/CurriculumTimeline.tsx", import.meta.url))),
  ]);
});

test("server-renders three JBIG awards motion demos", async () => {
  const response = await render("/recruit/awards-lab");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>JBIG 수상경력 모션 데모<\/title>/i);
  assert.match(html, /<strong>46<\/strong>개 기록/);
  assert.match(html, /양방향 수상 리본/);
  assert.match(html, /연도별 아카이브 레일/);
  assert.match(html, /대표 수상 스포트라이트/);

  for (const demo of ["ribbon", "year-gallery", "spotlight"]) {
    assert.match(html, new RegExp(`data-awards-demo="${demo}"`));
  }

  for (const phrase of [
    "제주·AWS 글로벌 스페이스 챌린지 해커톤",
    "교육부장관상",
    "행정안전부 공공 빅데이터 분석 프로젝트 해커톤",
    "데이터 크리에이터 캠프 (NIA)",
  ]) {
    assert.equal(html.includes(phrase), true, `missing award record: ${phrase}`);
  }

  assert.doesNotMatch(html, /정려상/);
  assert.doesNotMatch(html, /<svg\b/i);
});

test("keeps awards demos CSS-only, pausable, and reduced-motion aware", async () => {
  const [awardsPage, awardsCss, awardsData] = await Promise.all([
    readFile(new URL("../app/recruit/awards-lab/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/awards-lab/awards-lab.css", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/awards.ts", import.meta.url), "utf8"),
  ]);

  assert.match(awardsCss, /@keyframes\s+awardRail/);
  assert.match(awardsCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(awardsCss, /motion-toggle:checked\s*~\s*\.demo-stage\s+\.award-track/);
  assert.match(awardsCss, /animation-play-state:\s*paused/);
  assert.match(awardsCss, /@media\s*\(max-width:\s*760px\)/);
  assert.doesNotMatch(awardsPage, /"use client"|requestAnimationFrame|setInterval|setTimeout/);
  assert.doesNotMatch(awardsData, /정려상/);
});
