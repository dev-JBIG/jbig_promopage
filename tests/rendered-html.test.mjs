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
  assert.match(JSON.parse(packageJson).scripts.dev, /vinext dev --hostname 127\.0\.0\.1/);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});

test("server-renders the JBIG recruitment landing page", async () => {
  const response = await render("/recruit");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>[^<]+<\/title>/i);
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

  for (const section of ["hero", "about", "curriculum", "testimonials", "awards", "fit", "faq", "apply"]) {
    assert.match(html, new RegExp(`data-recruit-section="${section}"`));
  }

  const sectionOrder = ["curriculum", "testimonials", "awards", "fit", "faq"];
  for (let index = 1; index < sectionOrder.length; index += 1) {
    const previous = sectionOrder[index - 1];
    const current = sectionOrder[index];
    assert.ok(
      html.indexOf(`data-recruit-section="${previous}"`) < html.indexOf(`data-recruit-section="${current}"`),
      `${previous} should render before ${current}`,
    );
  }
  // Marketing copy is content-managed; verify stable structure and behavior instead of exact wording.
  assert.equal((html.match(/class="acronym-card"/g) ?? []).length, 4);
  assert.equal((html.match(/class="testimonial-story"/g) ?? []).length, 3);

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
  assert.match(html, /<summary>\s*<span class="detail-label detail-label-closed">[^<]+<\/span>/i);
  assert.match(html, /class="week-detail-grid"/i);
  assert.equal((html.match(/class="week-detail-heading"/g) ?? []).length, 8);
  for (const phase of ["analysis", "challenge", "deep-learning", "studio"]) {
    assert.match(html, new RegExp(`data-curriculum-phase="${phase}"`));
    assert.match(html, new RegExp(`data-phase-open="${phase}"`));
  }
  assert.equal((html.match(/data-curriculum-phase=/g) ?? []).length, 4);
  assert.equal((html.match(/class="phase-expand-icon"/g) ?? []).length, 4);
  assert.equal((html.match(/aria-haspopup="dialog"/g) ?? []).length, 4);
  assert.doesNotMatch(html, /class="phase-label"/i);
  assert.doesNotMatch(html, /data-program-expand=|class="phase-expandable"/i);
  assert.doesNotMatch(html, /class="challenge-signals"|class="project-flow"|class="project-mascot"/i);
  assert.match(html, /class="mini-mascot mascot-(?:wave|note|look|peek)/i);
  assert.match(html, /class="about-stalking-fox"/i);
  assert.doesNotMatch(html, /class="about-mascot"/i);
  assert.match(html, /<details[^>]*open/i);
  assert.doesNotMatch(html, /<svg\b/i);
  assert.doesNotMatch(html, /aria-live=/i);
});

test("builds a self-contained nginx bundle for /recruit", async () => {
  const [html, assetFiles] = await Promise.all([
    readFile(new URL("../dist/deploy/index.html", import.meta.url), "utf8"),
    readdir(new URL("../dist/deploy/assets/", import.meta.url)),
    access(new URL("../dist/deploy/favicon.svg", import.meta.url)),
    access(new URL("../dist/deploy/fox-mascots.webp", import.meta.url)),
    access(new URL("../dist/deploy/apply-mascot-trio-v1.png", import.meta.url)),
    access(new URL("../dist/deploy/about-stalking-fox-v1.png", import.meta.url)),
    access(new URL("../dist/deploy/recruit.rsc", import.meta.url)),
  ]);
  const builtCss = (await Promise.all(
    assetFiles
      .filter((name) => name.endsWith(".css"))
      .map((name) => readFile(new URL(`../dist/deploy/assets/${name}`, import.meta.url), "utf8")),
  )).join("\n");

  assert.match(html, /<title>[^<]+<\/title>/i);
  assert.match(html, /(?:href|src)="\/recruit\/assets\//i);
  assert.match(html, /href="\/recruit\/favicon\.svg"/i);
  assert.match(html, /\/recruit\/fox-mascots\.webp/i);
  assert.match(html, /\/recruit\/apply-mascot-trio-v1\.png/i);
  assert.match(html, /\/recruit\/about-stalking-fox-v1\.png/i);
  assert.doesNotMatch(html, /(?:href|src)="\/assets\//i);
  assert.doesNotMatch(html, /\/recruit\/recruit\//i);
  assert.doesNotMatch(builtCss, /\/recruit\/recruit\/fox-mascots\.webp/i);
  assert.equal(assetFiles.some((name) => name.endsWith(".css")), true);
  assert.equal(assetFiles.some((name) => name.endsWith(".js")), true);
});

test("keeps recruitment visuals lightweight, responsive, and reduced-motion aware", async () => {
  const [recruitCss, recruitPage, awardsRibbon, curriculumShowcase, testimonialsSection] = await Promise.all([
    readFile(new URL("../app/recruit/recruit.css", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/AwardsRibbon.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/CurriculumShowcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/TestimonialsSection.tsx", import.meta.url), "utf8"),
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
  assert.match(recruitPage, /<CurriculumShowcase\s*\/>/);
  assert.match(recruitPage, /<TestimonialsSection\s*\/>/);
  assert.ok(
    recruitPage.indexOf("<TestimonialsSection />") < recruitPage.indexOf("<AwardsRibbon />"),
    "testimonials should follow curriculum and precede awards",
  );
  assert.doesNotMatch(`${recruitPage}\n${awardsRibbon}\n${testimonialsSection}`, /section-kicker|hero-kicker/);
  assert.doesNotMatch(curriculumShowcase, /activePhase\.label/);
  assert.match(recruitCss, /\.testimonial-list/);
  assert.match(recruitCss, /\.testimonial-story\s*\{[^}]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(recruitCss, /\.testimonial-story-number\s*\{[^}]*grid-column:\s*span\s+1/s);
  assert.match(recruitCss, /\.testimonial-author\s*\{[^}]*grid-column:\s*span\s+3/s);
  assert.match(recruitCss, /\.testimonial-story-copy\s*\{[^}]*grid-column:\s*span\s+8/s);
  assert.match(recruitCss, /\.testimonial-profile-image\s*\{[^}]*width:\s*clamp\(112px,[^,]+,\s*120px\)[^}]*aspect-ratio:\s*4\s*\/\s*5/s);
  assert.match(recruitCss, /\.testimonial-story blockquote\s*\{[^}]*font-size:\s*clamp\(38px,[^,]+,\s*48px\)/s);
  assert.match(recruitCss, /\.testimonial-story-copy\s*>\s*p\s*\{[^}]*max-width:\s*720px/s);
  assert.match(recruitCss, /@media\s*\(max-width:\s*760px\)[\s\S]*\.testimonial-story-copy\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/s);
  assert.doesNotMatch(recruitCss, /\.testimonial-story\s*\{[^}]*box-shadow\s*:/s);
  assert.doesNotMatch(recruitCss, /\.testimonial-story\s*\{[^}]*background\s*:/s);
  assert.doesNotMatch(recruitCss, /\.testimonial-card/);
  assert.doesNotMatch(recruitCss, /\.testimonial-photo|\.testimonial-photo-placeholder/);
  assert.doesNotMatch(recruitCss, /(?:-webkit-)?line-clamp/);
  assert.match(testimonialsSection, /testimonial\.profileImage\s*\?/);
  assert.match(testimonialsSection, /<Image[^>]*className="testimonial-profile-image"/s);
  assert.match(testimonialsSection, /testimonial\.department/);
  assert.doesNotMatch(testimonialsSection, /mainActivity/);
  assert.ok(
    testimonialsSection.indexOf('className="testimonial-story-number"')
      < testimonialsSection.indexOf('className="testimonial-author"')
      && testimonialsSection.indexOf('className="testimonial-author"')
      < testimonialsSection.indexOf('className="testimonial-story-copy"'),
    "testimonial document order should be number, author, then full review",
  );
  assert.match(recruitPage, /\/recruit\/fox-mascots\.webp/);
  assert.match(recruitPage, /\/recruit\/apply-mascot-trio-v1\.png/);
  assert.match(recruitPage, /\/recruit\/about-stalking-fox-v1\.png/);
  assert.match(recruitCss, /\.about-stalking-fox/);
  assert.doesNotMatch(recruitPage, /className="about-mascot"/);
  assert.doesNotMatch(recruitCss, /\.about-mascot/);
  assert.match(recruitCss, /\.apply-mascot-trio/);
  assert.match(recruitCss, /\.application-button\s*\{[^}]*width:\s*min\(400px,[^}]*min-height:\s*76px/s);
  assert.match(recruitCss, /@media\s*\(max-width:\s*760px\)[\s\S]*\.application-button\s*\{[^}]*min-height:\s*68px/s);
  assert.match(recruitCss, /\.phase-flow\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(recruitCss, /@keyframes\s+phaseModalFluidIn/);
  assert.match(recruitCss, /\.phase-modal-backdrop/);
  assert.match(recruitCss, /\.phase-modal-schedule/);
  assert.match(recruitCss, /\.phase-range strong\s*\{[^}]*padding-inline:\s*0\.08em/s);
  assert.doesNotMatch(recruitCss, /\.phase-label/);
  assert.doesNotMatch(recruitCss, /\.phase-expandable|\.phase-expanded/);
  assert.match(curriculumShowcase, /^"use client";/);
  assert.match(curriculumShowcase, /createPortal/);
  assert.match(curriculumShowcase, /role="dialog"/);
  assert.match(curriculumShowcase, /aria-modal="true"/);
  assert.match(curriculumShowcase, /event\.key === "Escape"/);
  assert.match(curriculumShowcase, /phase\.detail\.weekIds/);
  assert.match(curriculumShowcase, /curriculumWeeks\.filter/);
  assert.doesNotMatch(curriculumShowcase, /const (?:modalHeadlines|modalNotes|studioSteps)\b/);
  assert.match(curriculumShowcase, /className="analysis-focus-flow"/);
  assert.match(curriculumShowcase, /className="analysis-focus-stream"/);
  assert.match(curriculumShowcase, /analysis-data-source[^\n]*<i \/><i \/><i \/><i \/><i \/>/);
  assert.match(recruitCss, /\.analysis-focus-stream/);
  assert.doesNotMatch(curriculumShowcase, /analysis-focus-ribbons/);
  assert.match(curriculumShowcase, /className="analysis-focus-orb-stage"/);
  assert.match(recruitCss, /\.analysis-focus-orb/);
  assert.match(recruitCss, /\.analysis-focus-arrow/);
  assert.match(recruitCss, /\.analysis-focus-chart/);
  assert.match(recruitCss, /\.phase-modal-analysis \.phase-modal-schedule/);
  assert.match(curriculumShowcase, /phase-modal-with-schedule/);
  assert.match(recruitCss, /\.phase-modal-with-schedule \.phase-modal-schedule\s*\{[^}]*flex:\s*1[^}]*grid-auto-rows:\s*minmax\(210px,\s*1fr\)/s);
  assert.match(curriculumShowcase, /className="challenge-arena-layout"/);
  assert.match(curriculumShowcase, /className="arena-experience-curve"/);
  assert.match(curriculumShowcase, /className="arena-plan-line"/);
  assert.match(curriculumShowcase, /className="arena-experience-line"/);
  assert.doesNotMatch(curriculumShowcase, /arena-curve-legend|>PLAN<|>EXPERIENCE</);
  assert.doesNotMatch(curriculumShowcase, /arena-leaderboard|arena-score-panel|arena-watermark/);
  assert.match(curriculumShowcase, /className="challenge-headline-line"/);
  assert.match(curriculumShowcase, /activePhase\.detail\.supportingLines/);
  assert.match(curriculumShowcase, /activePhase\.detail\.keywords/);
  assert.match(curriculumShowcase, /activePhase\.detail\.noteLines/);
  assert.match(curriculumShowcase, /className="challenge-supporting-copy"/);
  assert.match(curriculumShowcase, /className="challenge-keywords"/);
  assert.match(recruitCss, /\.challenge-supporting-copy/);
  assert.match(recruitCss, /\.challenge-keywords/);
  assert.match(recruitCss, /\.phase-modal-challenge\s*\{[^}]*width:\s*min\(1440px,[^}]*height:\s*min\(780px,[^}]*border-radius:\s*36px/s);
  assert.match(recruitCss, /\.challenge-arena-layout\s*\{[^}]*grid-template-columns:/s);
  assert.match(recruitCss, /@keyframes\s+arenaContentIn/);
  assert.match(recruitCss, /\.phase-modal-challenge\s*\{[^}]*animation-name:\s*challengeModalExpandIn/s);
  assert.match(recruitCss, /@keyframes\s+challengeModalExpandIn\s*\{[^}]*transform:\s*translate\(var\(--modal-from-x\),\s*var\(--modal-from-y\)\)\s*scale\(0\.08\)/s);
  assert.match(recruitCss, /@media\s*\(max-width:\s*760px\)[\s\S]*\.challenge-arena-layout\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(curriculumShowcase, /showsStudioStatement/);
  assert.match(curriculumShowcase, /className="phase-modal-copy studio-statement"/);
  assert.match(curriculumShowcase, /activePhase\.detail\.headline\.split\("\\n"\)/);
  assert.match(recruitCss, /\.studio-statement-main/);
  assert.match(recruitCss, /\.studio-statement p\s*\{[^}]*font-size:\s*clamp\(/s);
  assert.doesNotMatch(curriculumShowcase, /project-ascent|project-route/);
  assert.doesNotMatch(recruitCss, /\.project-ascent|\.project-route/);
  assert.doesNotMatch(recruitPage, /chart-heading/);
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
    access(new URL("../public/recruit/apply-mascot-trio-v1.png", import.meta.url)),
    access(new URL("../app/recruit/content/index.ts", import.meta.url)),
    access(new URL("../app/recruit/content/site.ts", import.meta.url)),
    access(new URL("../app/recruit/content/testimonials.ts", import.meta.url)),
    access(new URL("../app/recruit/content/awards.ts", import.meta.url)),
    assert.rejects(access(new URL("../app/recruit/RecruitHero.tsx", import.meta.url))),
    assert.rejects(access(new URL("../app/recruit/CurriculumTimeline.tsx", import.meta.url))),
    assert.rejects(access(new URL("../app/recruit/content.ts", import.meta.url))),
    assert.rejects(access(new URL("../app/recruit/awards.ts", import.meta.url))),
  ]);
});

test("server-renders three curriculum flow demos", async () => {
  const response = await render("/recruit/curriculum-flow-lab");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.equal((html.match(/data-flow-demo=/g) ?? []).length, 3);
  for (const stage of ["data", "topic", "analysis"]) {
    assert.equal((html.match(new RegExp(`data-flow-stage="${stage}"`, "g")) ?? []).length, 3);
  }
  assert.doesNotMatch(html, /<svg\b/i);
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

test("server-renders five JBIG program naming demos", async () => {
  const [response, css] = await Promise.all([
    render("/recruit/program-lab"),
    readFile(new URL("../app/recruit/program-lab/program-lab.css", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>JBIG 프로그램 카드 데모<\/title>/i);
  assert.match(html, /같은 활동,/);
  assert.match(html, /JBIG DATA ARENA/);
  assert.match(html, /JBIG SOLUTION STUDIO/);
  assert.match(html, /BASELINE BREAKERS/);
  assert.match(html, /PORTFOLIO FOUNDRY/);
  assert.match(html, /EVIDENCE CHALLENGE/);

  for (const demo of ["a", "b", "c", "d", "e"]) {
    assert.match(html, new RegExp(`data-program-demo="${demo}"`));
  }

  const selectedCards = html.match(/<article[^>]*data-selected-card="(?:competition|project)"[^>]*>[\s\S]*?<\/article>/gi) ?? [];
  assert.equal(selectedCards.length, 2);
  assert.doesNotMatch(selectedCards.join("\n"), /YOU LEAVE WITH|program-outcomes|program-flow/);
  assert.match(selectedCards.join("\n"), /class="program-ascent"/);

  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(html, /0\.541|94\.8|\+8\.4/);
});

test("keeps awards demos CSS-only, pausable, and reduced-motion aware", async () => {
  const [awardsPage, awardsCss, awardsData] = await Promise.all([
    readFile(new URL("../app/recruit/awards-lab/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/awards-lab/awards-lab.css", import.meta.url), "utf8"),
    readFile(new URL("../app/recruit/content/awards.ts", import.meta.url), "utf8"),
  ]);

  assert.match(awardsCss, /@keyframes\s+awardRail/);
  assert.match(awardsCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(awardsCss, /motion-toggle:checked\s*~\s*\.demo-stage\s+\.award-track/);
  assert.match(awardsCss, /animation-play-state:\s*paused/);
  assert.match(awardsCss, /@media\s*\(max-width:\s*760px\)/);
  assert.doesNotMatch(awardsPage, /"use client"|requestAnimationFrame|setInterval|setTimeout/);
  assert.doesNotMatch(awardsData, /정려상/);
});
