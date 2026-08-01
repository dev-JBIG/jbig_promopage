# Graph Report - jbig_promopage  (2026-08-01)

## Corpus Check
- 29 files · ~11,067 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 207 nodes · 220 edges · 21 communities (15 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `12be846e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- recruit/page.tsx
- awards-lab/page.tsx
- compilerOptions
- package.json
- jbig.co.kr/recruit 최초 연결
- constellation/page.tsx
- include
- route.ts
- dependencies
- program-lab/page.tsx
- worker/index.ts
- app/page.tsx
- layout.tsx
- prepare-deploy.mjs
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- vite.config.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 7 edges
3. `include` - 7 edges
4. `jbig.co.kr/recruit 최초 연결` - 7 edges
5. `getDb()` - 4 edges
6. `lib` - 4 edges
7. `jbig_promopage` - 4 edges
8. `clamp()` - 3 edges
9. `smoothstep()` - 3 edges
10. `ConstellationPage()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `getDb()`  [EXTRACTED]
  examples/d1/app/api/notes/route.ts → db/index.ts
- `POST()` --calls--> `getDb()`  [EXTRACTED]
  examples/d1/app/api/notes/route.ts → db/index.ts

## Import Cycles
- None detected.

## Communities (21 total, 6 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.06
Nodes (33): @cloudflare/vite-plugin, drizzle-kit, eslint, eslint-config-next, devDependencies, @cloudflare/vite-plugin, drizzle-kit, eslint (+25 more)

### Community 1 - "recruit/page.tsx"
Cohesion: 0.10
Nodes (20): acronymItems, activityAreas, curriculumPhases, curriculumWeeks, FaqItem, faqItems, fitStatements, RecruitmentConfig (+12 more)

### Community 2 - "awards-lab/page.tsx"
Cohesion: 0.11
Nodes (14): allAwards, AwardRecord, awardYears, featuredAwards, AwardWithYear, CardVariant, metadata, previousAwards (+6 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "package.json"
Cohesion: 0.14
Nodes (13): engines, node, name, private, scripts, build, db:generate, dev (+5 more)

### Community 5 - "jbig.co.kr/recruit 최초 연결"
Cohesion: 0.15
Nodes (11): 1. GitHub Actions secrets, 2. 첫 정적 릴리스 배포, 3. 서버 파일 확인, 4. nginx 연결, 5. 온라인 검증, jbig.co.kr/recruit 최초 연결, 롤백, jbig_promopage (+3 more)

### Community 6 - "constellation/page.tsx"
Cohesion: 0.21
Nodes (8): clamp(), ConstellationPage(), initialPoints, phaseCopy, Point, SceneStyle, smoothstep(), targetPoints

### Community 7 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 8 - "route.ts"
Cohesion: 0.39
Nodes (5): getDb(), GET(), POST(), toRouteErrorMessage(), notes

### Community 9 - "dependencies"
Cohesion: 0.22
Nodes (9): drizzle-orm, next, dependencies, drizzle-orm, next, react, react-dom, react (+1 more)

### Community 10 - "program-lab/page.tsx"
Cohesion: 0.29
Nodes (4): metadata, Program, ProgramOption, programOptions

### Community 11 - "worker/index.ts"
Cohesion: 0.29
Nodes (3): Env, ExecutionContext, worker

### Community 12 - "app/page.tsx"
Cohesion: 0.40
Nodes (3): bars, points, SceneStyle

## Knowledge Gaps
- **101 isolated node(s):** `Point`, `SceneStyle`, `targetPoints`, `initialPoints`, `phaseCopy` (+96 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `Point`, `SceneStyle`, `targetPoints` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `recruit/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10344827586206896 - nodes in this community are weakly interconnected._
- **Should `awards-lab/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11462450592885376 - nodes in this community are weakly interconnected._