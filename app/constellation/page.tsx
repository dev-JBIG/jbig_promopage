"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./constellation.css";

type Point = { x: number; y: number; group: string };
type SceneStyle = CSSProperties & {
  "--progress": string;
  "--tilt-x": string;
  "--tilt-y": string;
  "--move-x": string;
  "--move-y": string;
  "--grid-x": string;
  "--grid-y": string;
  "--label-x": string;
  "--label-y": string;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const line = (x1: number, y1: number, x2: number, y2: number, count: number, group: string): Point[] =>
  Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, group };
  });

const curve = (
  count: number,
  group: string,
  projector: (t: number) => [number, number],
): Point[] => Array.from({ length: count }, (_, index) => {
  const [x, y] = projector(index / (count - 1));
  return { x, y, group };
});

const targetPoints: Point[] = [
  ...line(105, 160, 255, 160, 12, "j"),
  ...line(255, 178, 255, 420, 19, "j"),
  ...curve(14, "j", (t) => [195 + 60 * Math.cos(Math.PI * t), 420 + 62 * Math.sin(Math.PI * t)]),
  ...line(385, 160, 385, 500, 26, "b-stem"),
  ...curve(18, "b-top", (t) => [385 + 112 * Math.sin(Math.PI * t), 160 + 170 * t]),
  ...curve(18, "b-bottom", (t) => [385 + 118 * Math.sin(Math.PI * t), 330 + 170 * t]),
  ...line(610, 160, 760, 160, 12, "i-top"),
  ...line(685, 175, 685, 485, 24, "i-stem"),
  ...line(610, 500, 760, 500, 12, "i-bottom"),
  ...curve(34, "g-arc", (t) => {
    const angle = (-42 - 276 * t) * Math.PI / 180;
    return [940 + 138 * Math.cos(angle), 330 + 171 * Math.sin(angle)];
  }),
  ...line(940, 350, 1076, 350, 11, "g-bar"),
  ...line(1076, 350, 1076, 455, 8, "g-bar"),
];

const seeded = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const initialPoints = targetPoints.map((point, index) => ({
  ...point,
  x: 55 + seeded(index + 11) * 1090,
  y: 45 + seeded(index + 211) * 610,
}));

const phaseCopy = [
  { threshold: 0, label: "01 · SIGNAL", title: "흩어진 신호가", description: "아직 의미를 갖지 못한 데이터가 공간을 부유합니다." },
  { threshold: 0.2, label: "02 · CONNECTION", title: "서로 연결되고", description: "관계가 드러나는 순간, 데이터는 정보가 됩니다." },
  { threshold: 0.48, label: "03 · STRUCTURE", title: "하나의 구조가 되어", description: "분석은 복잡한 패턴을 읽을 수 있는 형태로 바꿉니다." },
  { threshold: 0.82, label: "04 · INSIGHT", title: "JBIG로 수렴합니다", description: "From Data to Insight. 가능성을 결과로 만듭니다." },
];

export default function ConstellationPage() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const distance = Math.max(1, track.offsetHeight - window.innerHeight);
      setProgress(clamp(-rect.top / distance));
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const morph = smoothstep(0.38, 0.78, progress);
  const connect = smoothstep(0.1, 0.34, progress);
  const finalReveal = smoothstep(0.8, 0.96, progress);

  const nodes = useMemo(() => targetPoints.map((target, index) => {
    const start = initialPoints[index];
    return {
      ...target,
      x: start.x + (target.x - start.x) * morph,
      y: start.y + (target.y - start.y) * morph,
    };
  }), [morph]);

  const connections = useMemo(() => nodes.flatMap((point, index) => {
    if (index === 0) return [];
    const previous = nodes[index - 1];
    if (previous.group !== point.group) return [];
    return [{ from: previous, to: point, key: `${point.group}-${index}` }];
  }), [nodes]);

  const phase = [...phaseCopy].reverse().find((item) => progress >= item.threshold) ?? phaseCopy[0];

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    setPointer({ x, y });
  };

  const style: SceneStyle = {
    "--progress": progress.toFixed(3),
    "--tilt-x": `${(pointer.y * -2.6).toFixed(2)}deg`,
    "--tilt-y": `${(pointer.x * 3.8).toFixed(2)}deg`,
    "--move-x": `${(pointer.x * -16).toFixed(2)}px`,
    "--move-y": `${(pointer.y * -12).toFixed(2)}px`,
    "--grid-x": `${(pointer.x * -12).toFixed(2)}px`,
    "--grid-y": `${(pointer.y * 12).toFixed(2)}px`,
    "--label-x": `${(pointer.x * 16).toFixed(2)}px`,
    "--label-y": `${(pointer.y * 12).toFixed(2)}px`,
  };

  return (
    <main className="constellation-page" style={style} onPointerMove={handlePointerMove}>
      <section className="scroll-track" ref={trackRef}>
        <div className="sticky-scene">
          <div className="constellation-grid" aria-hidden="true" />
          <div className="constellation-glow glow-a" aria-hidden="true" />
          <div className="constellation-glow glow-b" aria-hidden="true" />

          <nav className="constellation-nav" aria-label="JBIG SVG 실험 페이지">
            <a href="/" className="constellation-brand"><b>J</b><span>JBIG</span></a>
            <div className="scene-index"><span>EXPERIMENT 02</span><i /><em>{Math.round(progress * 100).toString().padStart(2, "0")}%</em></div>
          </nav>

          <div className="phase-copy" key={phase.label}>
            <p>{phase.label}</p>
            <h1>{phase.title}</h1>
            <span>{phase.description}</span>
          </div>

          <div className="coordinate-labels" aria-hidden="true">
            <span>35.8468° N</span><span>127.1298° E</span><span>DATA / 166</span><span>MODEL / LIVE</span>
          </div>

          <div className="svg-stage">
            <svg viewBox="0 0 1200 700" role="img" aria-label="흩어진 데이터 노드가 스크롤에 따라 JBIG 글자로 모이는 애니메이션">
              <defs>
                <radialGradient id="nodeFill">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor="#7be8ff" />
                  <stop offset="100%" stopColor="#2869ff" />
                </radialGradient>
                <filter id="constellationGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <g className="flow-lines" style={{ opacity: 0.14 + connect * 0.7 }}>
                {connections.map(({ from, to, key }, index) => (
                  <line
                    key={key}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    style={{ animationDelay: `${-(index % 12) * 0.18}s` }}
                  />
                ))}
              </g>

              <g className="data-nodes">
                {nodes.map((node, index) => (
                  <g
                    key={`${node.group}-${index}`}
                    className="data-node"
                    style={{ animationDelay: `${-(index % 17) * 0.21}s`, animationDuration: `${3.8 + (index % 7) * 0.34}s` }}
                  >
                    <circle className="node-aura" cx={node.x} cy={node.y} r={morph > 0.7 ? 10 : 7} />
                    <circle className="node-dot" cx={node.x} cy={node.y} r={morph > 0.7 ? 4.3 : 3.2} />
                  </g>
                ))}
              </g>
            </svg>
          </div>

          <div className="final-message" style={{ opacity: finalReveal, transform: `translateY(${(1 - finalReveal) * 28}px)` }}>
            <p>FROM DATA TO</p>
            <strong>INSIGHT</strong>
            <span>JBIG · JEONBUK NATIONAL UNIVERSITY</span>
          </div>

          <div className="progress-rail" aria-hidden="true"><i style={{ transform: `scaleY(${progress})` }} /></div>
          <div className="scroll-guide" style={{ opacity: clamp(1 - progress * 5) }} aria-hidden="true">
            <span>SCROLL TO TRANSFORM</span><i />
          </div>
        </div>
      </section>

      <section className="constellation-end">
        <p>ONE SIGNAL. ONE STRUCTURE. ONE INSIGHT.</p>
        <h2>데이터가 의미가 되는 순간,<br /><span>JBIG가 시작됩니다.</span></h2>
        <a href="/">실험 01 · 태블릿 페이지로 돌아가기 <b>↗</b></a>
      </section>
    </main>
  );
}
