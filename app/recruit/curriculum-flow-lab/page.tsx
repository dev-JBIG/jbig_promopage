import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./curriculum-flow-lab.css";

export const metadata: Metadata = {
  title: "JBIG 커리큘럼 흐름 데모",
  description: "Data가 Topic을 거쳐 분석으로 정리되는 과정을 보여주는 세 가지 시각화 데모입니다.",
  robots: { index: false, follow: false },
};

function WeekShelf() {
  return (
    <ol className="flow-week-shelf" aria-label="주차 카드 배치 예시">
      {["01", "02", "03", "04"].map((week) => (
        <li key={week}>
          <span>WEEK <b>{week}</b></span>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </li>
      ))}
    </ol>
  );
}

function DemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flow-modal-frame">
      <header className="flow-modal-header">
        <span><small>WEEK</small><strong>01–04</strong></span>
        <h3>데이터 분석</h3>
        <i aria-hidden="true" />
      </header>
      {children}
      <WeekShelf />
    </div>
  );
}

function FocusLens() {
  return (
    <div className="flow-visual focus-lens" aria-label="흩어진 Data가 Topic 렌즈에서 모여 하나의 분석 결과로 정리되는 흐름">
      <div className="lens-data" data-flow-stage="data">
        <strong>Data</strong>
        <div className="lens-points" aria-hidden="true">
          {Array.from({ length: 15 }, (_, index) => <i key={index} />)}
        </div>
      </div>
      <div className="lens-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="lens-topic" data-flow-stage="topic">
        <span>Topic</span>
        <i aria-hidden="true" />
      </div>
      <div className="lens-output" data-flow-stage="analysis">
        <span>분석</span>
        <div aria-hidden="true"><i /><i /><i /><i /></div>
      </div>
    </div>
  );
}

function SignalRiver() {
  return (
    <div className="flow-visual signal-river" aria-label="여러 종류의 Data 흐름이 Topic 구간에서 합쳐져 분석 리포트로 이어지는 흐름">
      <div className="river-source" data-flow-stage="data">
        <strong>Data</strong>
        <span aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div className="river-streams" aria-hidden="true"><i /><i /><i /></div>
      <div className="river-topic" data-flow-stage="topic">
        <i aria-hidden="true" />
        <strong>Topic</strong>
      </div>
      <div className="river-result" data-flow-stage="analysis">
        <strong>분석</strong>
        <span aria-hidden="true"><i /><i /><i /></span>
      </div>
    </div>
  );
}

function TopicPrism() {
  return (
    <div className="flow-visual topic-prism" aria-label="서로 다른 Data 조각이 Topic 프리즘을 지나 분석의 패턴으로 펼쳐지는 흐름">
      <div className="prism-data" data-flow-stage="data">
        <strong>Data</strong>
        <span aria-hidden="true"><i>01</i><i>CSV</i><i>TXT</i><i>LOG</i></span>
      </div>
      <div className="prism-entry" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="prism-topic" data-flow-stage="topic"><span>Topic</span></div>
      <div className="prism-rays" aria-hidden="true"><i /><i /><i /></div>
      <div className="prism-result" data-flow-stage="analysis">
        <strong>분석</strong>
        <span aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</span>
      </div>
    </div>
  );
}

const demos = [
  {
    id: "focus-lens",
    label: "A",
    eyebrow: "FOCUS LENS",
    title: "흩어진 신호를 한 질문으로",
    note: "가장 직관적인 안입니다. 데이터가 가운데 렌즈로 모이고, 오른쪽에서 읽을 수 있는 결과가 됩니다.",
    visual: <FocusLens />,
    recommended: true,
  },
  {
    id: "signal-river",
    label: "B",
    eyebrow: "SIGNAL RIVER",
    title: "여러 흐름이 하나의 관점으로",
    note: "사이트의 유동적인 배경과 가장 잘 이어집니다. 설명보다 움직임과 분위기로 과정을 보여줍니다.",
    visual: <SignalRiver />,
    recommended: false,
  },
  {
    id: "topic-prism",
    label: "C",
    eyebrow: "TOPIC PRISM",
    title: "원재료가 패턴으로 펼쳐지는 순간",
    note: "가장 그래픽한 안입니다. 서로 다른 데이터 형식이 주제를 통과하며 분석 가능한 패턴으로 바뀝니다.",
    visual: <TopicPrism />,
    recommended: false,
  },
] as const;

export default function CurriculumFlowLabPage() {
  return (
    <main className="flow-lab">
      <nav className="flow-lab-nav" aria-label="커리큘럼 흐름 데모 메뉴">
        <Link href="/recruit">JBIG <span>/ CURRICULUM FLOW LAB</span></Link>
        <div>{demos.map((demo) => <a href={`#${demo.id}`} key={demo.id}>{demo.label}</a>)}</div>
      </nav>

      <header className="flow-lab-hero">
        <p>CURRICULUM MODAL · VISUAL STUDY</p>
        <h1>데이터가<br /><em>분석이 되는 장면.</em></h1>
        <div>
          <p>문장으로 설명하던 자리에, Data가 Topic을 거쳐 하나의 분석으로 정리되는 순간을 넣었습니다.</p>
          <span>3 VISUAL DIRECTIONS</span>
        </div>
      </header>

      <section className="flow-lab-index" aria-label="세 가지 시각화 방향">
        {demos.map((demo) => (
          <a className={demo.recommended ? "is-recommended" : undefined} href={`#${demo.id}`} key={demo.id}>
            <span>{demo.label}</span><div><strong>{demo.eyebrow}</strong><small>{demo.title}</small></div>
          </a>
        ))}
      </section>

      {demos.map((demo) => (
        <section className={`flow-demo flow-demo-${demo.label.toLowerCase()}`} id={demo.id} data-flow-demo={demo.id} key={demo.id}>
          <header className="flow-demo-heading">
            <span>{demo.label}</span>
            <div><p>{demo.eyebrow}</p><h2>{demo.title}</h2></div>
            <p>{demo.note}</p>
          </header>
          <DemoFrame>{demo.visual}</DemoFrame>
        </section>
      ))}

      <footer className="flow-lab-footer">
        <p>세 안은 선택 전 비교용이며, 기존 모집 페이지의 문구와 배치는 그대로 유지했습니다.</p>
        <Link href="/recruit">기존 모집 페이지로 돌아가기 <span aria-hidden="true">↗</span></Link>
      </footer>
    </main>
  );
}
