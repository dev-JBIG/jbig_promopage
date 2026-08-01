import type { Metadata } from "next";
import Link from "next/link";
import "./program-lab.css";

export const metadata: Metadata = {
  title: "JBIG 프로그램 카드 데모",
  description: "미니 데이터 대회와 팀 프로젝트를 소개하는 다섯 가지 네이밍·메시지 데모입니다.",
  robots: { index: false, follow: false },
};

type Program = {
  label: string;
  name: string;
  headline: string;
  note: string;
  steps: readonly string[];
  outcomes: readonly string[];
};

type ProgramOption = {
  id: string;
  label: string;
  title: string;
  focus: string;
  summary: string;
  competition: Program;
  project: Program;
};

const programOptions: readonly ProgramOption[] = [
  {
    id: "option-a",
    label: "A",
    title: "Arena × Studio",
    focus: "결과가 선명한 안",
    summary: "무엇을 겨루고, 무엇을 만들어 나가는지 가장 빠르게 이해됩니다.",
    competition: {
      label: "WEEK 05 · PERFORMANCE ARENA",
      name: "JBIG DATA ARENA",
      headline: "점수를 올린 이유까지,\n설명할 수 있게.",
      note: "리더보드 경쟁을 검증과 회고까지 이어가는 실전 분석전",
      steps: ["BASELINE", "SUBMIT", "VALIDATE", "REPLAY"],
      outcomes: ["리더보드", "검증 리포트", "재현 코드"],
    },
    project: {
      label: "WEEK 01–08 · BUILD STUDIO",
      name: "JBIG SOLUTION STUDIO",
      headline: "분석을 끝내지 않고,\n작동하는 결과물로.",
      note: "팀의 질문을 프로토타입과 발표로 완성하는 제작 스튜디오",
      steps: ["문제 정의", "데이터", "프로토타입", "데모데이"],
      outcomes: ["프로젝트 저장소", "발표 자료", "팀 회고"],
    },
  },
  {
    id: "option-b",
    label: "B",
    title: "Breakers × Launchpad",
    focus: "성장이 느껴지는 안",
    summary: "처음부터 잘하는 사람보다, 실험을 거듭하며 나아지는 사람에게 말을 겁니다.",
    competition: {
      label: "WEEK 05 · MODEL SPRINT",
      name: "BASELINE BREAKERS",
      headline: "첫 점수보다,\n다음 실험이 강해진다.",
      note: "기준선을 세우고 한 번씩 근거 있게 넘어서는 모델 개선전",
      steps: ["BASE", "TRY 01", "TRY 02", "FINAL"],
      outcomes: ["실험 기록", "오류 분석", "개선 근거"],
    },
    project: {
      label: "WEEK 01–08 · PROJECT LAUNCH",
      name: "PROJECT LAUNCHPAD",
      headline: "아이디어를 팀의\n첫 번째 릴리스로.",
      note: "막연한 관심사를 실행 가능한 범위로 줄이고 끝까지 출시하는 과정",
      steps: ["SCOPE", "BUILD", "TEST", "LAUNCH"],
      outcomes: ["작동 데모", "역할 경험", "출시 기록"],
    },
  },
  {
    id: "option-c",
    label: "C",
    title: "Grand Prix × Foundry",
    focus: "포트폴리오가 보이는 안",
    summary: "활동명이 아니라 이후에 설명하고 보여줄 수 있는 결과물을 전면에 둡니다.",
    competition: {
      label: "WEEK 05 · MODEL GRAND PRIX",
      name: "MODEL GRAND PRIX",
      headline: "한 번의 모델링을,\n설명 가능한 사례로.",
      note: "문제 이해부터 최종 제출까지 의사결정의 흔적을 남기는 모델 경주",
      steps: ["문제", "가설", "모델", "리뷰"],
      outcomes: ["모델 카드", "성능 비교", "발표 사례"],
    },
    project: {
      label: "WEEK 01–08 · PORTFOLIO BUILD",
      name: "PORTFOLIO FOUNDRY",
      headline: "해봤다는 말 대신,\n보여줄 결과물 하나.",
      note: "기획·구현·설명을 한 묶음의 프로젝트 사례로 다듬는 제작소",
      steps: ["BRIEF", "REPO", "DEMO", "STORY"],
      outcomes: ["README", "결과 화면", "발표 스토리"],
    },
  },
  {
    id: "option-d",
    label: "D",
    title: "League × Impact Lab",
    focus: "함께하는 방식이 보이는 안",
    summary: "개인 점수 경쟁과 팀 협업이 서로 다른 학습 경험이라는 점을 강조합니다.",
    competition: {
      label: "WEEK 05 · PEER DATA LEAGUE",
      name: "JBIG DATA LEAGUE",
      headline: "혼자 만든 점수를,\n함께 검증하는 법.",
      note: "제출 결과와 접근법을 동료 리뷰로 비교하는 데이터 리그",
      steps: ["내 모델", "동료 리뷰", "재검증", "공유"],
      outcomes: ["피어 리뷰", "접근법 비교", "공유 노트"],
    },
    project: {
      label: "WEEK 01–08 · COLLABORATIVE LAB",
      name: "JBIG IMPACT LAB",
      headline: "역할은 나눠도,\n결과물은 하나로.",
      note: "서로 다른 강점을 연결해 하나의 문제를 해결하는 협업 랩",
      steps: ["RESEARCH", "DATA", "DEV", "PITCH"],
      outcomes: ["협업 기록", "통합 결과물", "팀 발표"],
    },
  },
  {
    id: "option-e",
    label: "E",
    title: "Evidence × Product",
    focus: "실무 감각이 강한 안",
    summary: "좋은 점수와 멋진 아이디어를 믿을 수 있고 쓸 수 있는 상태까지 밀어붙입니다.",
    competition: {
      label: "WEEK 05 · EVIDENCE CHALLENGE",
      name: "EVIDENCE CHALLENGE",
      headline: "좋아진 점수보다,\n믿을 수 있는 근거를.",
      note: "누수·과적합·재현성을 확인하며 성능을 증명하는 검증 챌린지",
      steps: ["SCORE", "LEAK CHECK", "CV", "PROOF"],
      outcomes: ["검증 설계", "누수 점검", "재현 절차"],
    },
    project: {
      label: "WEEK 01–08 · DATA PRODUCT",
      name: "DATA PRODUCT STUDIO",
      headline: "분석에서 멈추지 않는\n데이터 제품 실습.",
      note: "사용 장면을 정하고 피드백 가능한 형태까지 구현하는 제품 스튜디오",
      steps: ["USER", "INSIGHT", "PROTOTYPE", "FEEDBACK"],
      outcomes: ["사용 시나리오", "프로토타입", "개선 백로그"],
    },
  },
] as const;

function ProgramCard({ program, kind, selected }: { program: Program; kind: "competition" | "project"; selected: boolean }) {
  return (
    <article className={`program-card program-card-${kind}${selected ? " is-selected-program" : ""}`} data-selected-card={selected ? kind : undefined}>
      <header>
        <p>{program.label}</p>
        <span>{kind === "competition" ? "COMPETE" : "CREATE"}</span>
      </header>
      <div className="program-title">
        <strong>{program.name}</strong>
        <h3>{program.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
        <p>{program.note}</p>
      </div>
      {selected && kind === "project" ? (
        <ol className="program-ascent" aria-label={`${program.name} 등산형 진행 단계`}>
          {program.steps.map((step, index) => (
            <li key={step}>
              <span><b>0{index + 1}</b><strong>{step}</strong></span>
              <i aria-hidden="true" />
              <em aria-hidden="true" />
            </li>
          ))}
        </ol>
      ) : selected ? null : (
        <>
          <ol className="program-flow" aria-label={`${program.name} 진행 흐름`}>
            {program.steps.map((step, index) => (
              <li key={step}><i aria-hidden="true">{index + 1}</i><span>{step}</span></li>
            ))}
          </ol>
          <div className="program-outcomes">
            <small>YOU LEAVE WITH</small>
            <ul>{program.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          </div>
        </>
      )}
    </article>
  );
}

export default function ProgramLabPage() {
  return (
    <main className="program-lab">
      <nav className="program-lab-nav" aria-label="프로그램 카드 데모 메뉴">
        <Link href="/recruit">JBIG <span>/ PROGRAM LAB</span></Link>
        <div>{programOptions.map((option) => <a href={`#${option.id}`} key={option.id}>{option.label}</a>)}</div>
      </nav>

      <header className="program-lab-hero">
        <p>SECTION 02 · PROGRAM NAMING STUDY</p>
        <h1>같은 활동,<br /><em>다른 첫인상.</em></h1>
        <div className="program-lab-intro">
          <p>“미니 대회”와 “사이드 프로젝트”를 처음 보는 사람도 얻어갈 경험과 결과를 바로 이해하도록 다시 이름 붙였습니다.</p>
          <span>5 NAMING DIRECTIONS · 10 PROGRAM CARDS</span>
        </div>
      </header>

      <section className="program-lab-index" aria-label="다섯 가지 디자인 방향">
        {programOptions.map((option) => (
          <a href={`#${option.id}`} key={option.id}>
            <span>{option.label}</span>
            <div><strong>{option.title}</strong><small>{option.focus}</small></div>
          </a>
        ))}
      </section>

      {programOptions.map((option) => (
        <section className={`program-option program-option-${option.label.toLowerCase()}`} id={option.id} data-program-demo={option.label.toLowerCase()} key={option.id}>
          <header className="program-option-heading">
            <span>{option.label}</span>
            <div>
              <p>{option.focus}</p>
              <h2>{option.title}</h2>
            </div>
            <p>{option.summary}</p>
          </header>
          <div className="program-card-pair">
            <ProgramCard program={option.competition} kind="competition" selected={option.label === "A"} />
            <ProgramCard program={option.project} kind="project" selected={option.label === "A"} />
          </div>
        </section>
      ))}

      <footer className="program-lab-footer">
        <p>이름과 문구는 비교를 위한 제안안입니다. 선택한 방향만 기존 카드에 반영할 수 있습니다.</p>
        <Link href="/recruit">기존 모집 페이지로 돌아가기 <span aria-hidden="true">↗</span></Link>
      </footer>
    </main>
  );
}
