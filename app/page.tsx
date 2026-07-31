"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useRef } from "react";

type SceneStyle = CSSProperties & {
  "--pointer-x": string;
  "--pointer-y": string;
};

const bars = [42, 58, 46, 72, 66, 86, 78, 94];
const points = [
  [10, 73], [18, 58], [28, 65], [35, 42], [43, 50],
  [51, 31], [60, 38], [70, 19], [79, 28], [90, 12],
];

export default function Home() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const scene = sceneRef.current;
    if (!scene) return;

    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    scene.style.setProperty("--pointer-x", x.toFixed(3));
    scene.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const resetPointer = () => {
    sceneRef.current?.style.setProperty("--pointer-x", "0");
    sceneRef.current?.style.setProperty("--pointer-y", "0");
  };

  const sceneStyle: SceneStyle = {
    "--pointer-x": "0",
    "--pointer-y": "0",
  };

  return (
    <main className="promo-page">
      <section
        className="hero"
        ref={sceneRef}
        style={sceneStyle}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetPointer}
      >
        <div className="ambient ambient-a" aria-hidden="true" />
        <div className="ambient ambient-b" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />

        <nav className="nav" aria-label="JBIG 실험 페이지">
          <a className="brand" href="#top" aria-label="JBIG 홈">
            <span className="brand-mark">J</span>
            <span>JBIG</span>
          </a>
          <a className="experiment-label" href="/constellation">EXPERIMENT · 02 — DATA CONSTELLATION ↗</a>
        </nav>

        <div className="hero-copy" id="top">
          <p className="eyebrow">
            <span /> JBNU BIG DATA &amp; AI GROUP
          </p>
          <h1>
            <span className="title-brand">JBIG</span>
            <span className="title-line">전북대 유일</span>
            <span className="title-line title-accent">데이터 분석 동아리</span>
          </h1>
          <p className="hero-description">
            흩어진 데이터를 연결하고,
            <br />
            가능성을 선명한 결과로 바꿉니다.
          </p>
        </div>

        <div className="device-stage" aria-label="움직이는 데이터 시각화 태블릿">
          <div className="device-shadow" aria-hidden="true" />
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />

          <div className="tablet">
            <div className="tablet-edge" aria-hidden="true" />
            <div className="tablet-body">
              <div className="camera" aria-hidden="true" />
              <div className="screen">
                <div className="screen-glare" aria-hidden="true" />

                <header className="screen-header">
                  <div>
                    <span className="screen-kicker">JBIG DATA LAB</span>
                    <strong>Live Intelligence</strong>
                  </div>
                  <div className="live-chip"><i /> LIVE</div>
                </header>

                <div className="metric-row">
                  <article className="metric-card metric-primary">
                    <span>MODEL ACCURACY</span>
                    <strong>94.8<small>%</small></strong>
                    <em>+8.4%</em>
                  </article>
                  <article className="metric-card">
                    <span>ACTIVE PROJECTS</span>
                    <strong>12</strong>
                    <div className="member-stack" aria-hidden="true"><i /><i /><i /><i /></div>
                  </article>
                  <article className="metric-card ring-card">
                    <span>INSIGHT SCORE</span>
                    <div className="mini-ring"><b>87</b></div>
                  </article>
                </div>

                <div className="dashboard-grid">
                  <article className="panel trend-panel">
                    <div className="panel-heading">
                      <div>
                        <span>LEARNING CURVE</span>
                        <strong>Data becomes insight.</strong>
                      </div>
                      <span className="panel-range">12 WEEKS</span>
                    </div>

                    <div className="chart-wrap">
                      <div className="chart-grid" aria-hidden="true" />
                      <svg className="trend-chart" viewBox="0 0 600 220" role="img" aria-label="상승하는 데이터 분석 성과 그래프">
                        <defs>
                          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#49d7ff" stopOpacity="0.46" />
                            <stop offset="100%" stopColor="#49d7ff" stopOpacity="0" />
                          </linearGradient>
                          <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                          </filter>
                        </defs>
                        <path className="area-path" d="M10 190 C70 176 92 158 138 164 S226 120 276 132 S354 88 408 98 S494 44 590 30 L590 220 L10 220 Z" />
                        <path className="line-path" d="M10 190 C70 176 92 158 138 164 S226 120 276 132 S354 88 408 98 S494 44 590 30" />
                        {[10, 138, 276, 408, 590].map((x, index) => (
                          <circle key={x} className="chart-point" cx={x} cy={[190, 164, 132, 98, 30][index]} r="5" />
                        ))}
                      </svg>
                    </div>
                  </article>

                  <article className="panel network-panel">
                    <div className="panel-heading">
                      <div><span>COMMUNITY MAP</span><strong>Connected minds</strong></div>
                    </div>
                    <svg className="network" viewBox="0 0 240 210" role="img" aria-label="연결된 구성원을 표현한 네트워크 그래프">
                      <g className="network-lines">
                        <path d="M32 150 L82 90 L127 129 L184 65 L211 142" />
                        <path d="M42 48 L82 90 L137 40 L184 65" />
                        <path d="M32 150 L127 129 L211 142" />
                      </g>
                      {[[32,150],[82,90],[127,129],[184,65],[211,142],[42,48],[137,40]].map(([x,y], index) => (
                        <g key={`${x}-${y}`} className={`network-node node-${index}`}>
                          <circle className="node-halo" cx={x} cy={y} r="13" />
                          <circle className="node-core" cx={x} cy={y} r="5" />
                        </g>
                      ))}
                    </svg>
                  </article>
                </div>

                <div className="screen-footer-row">
                  <div className="bar-chart" aria-label="프로젝트 성장 막대그래프">
                    {bars.map((height, index) => (
                      <i key={index} style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }} />
                    ))}
                  </div>
                  <div className="scatter" aria-hidden="true">
                    {points.map(([x, y], index) => (
                      <i key={index} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${index * 120}ms` }} />
                    ))}
                  </div>
                  <div className="signal-copy"><span>NEXT SIGNAL</span><strong>MAKE IT VISIBLE.</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-note" aria-hidden="true"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="statement">
        <p>ANALYZE · BUILD · CONNECT</p>
        <h2>
          데이터를 배우는 데서 멈추지 않습니다.
          <br />
          <span>직접 만들고, 함께 증명합니다.</span>
        </h2>
        <div className="statement-grid">
          <article><span>01</span><strong>Analyze</strong><p>문제를 데이터의 언어로 다시 정의합니다.</p></article>
          <article><span>02</span><strong>Build</strong><p>모델과 시각화로 아이디어를 구현합니다.</p></article>
          <article><span>03</span><strong>Connect</strong><p>서로 다른 관점을 연결해 더 나은 답을 찾습니다.</p></article>
        </div>
      </section>
    </main>
  );
}
