"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { curriculumPhases, curriculumWeeks } from "./content";

type CurriculumPhase = (typeof curriculumPhases)[number];
type PhaseTone = CurriculumPhase["tone"];

const modalHeadlines: Record<PhaseTone, string> = {
  analysis: "분석의 기본을, 직접 해보며 익힙니다.",
  challenge: "점수를 올린 이유까지, 설명할 수 있게.",
  "deep-learning": "개념을 보고, 직접 작동시킵니다.",
  studio: "분석을 끝내지 않고, 작동하는 결과물로.",
};

const modalNotes: Record<PhaseTone, string> = {
  analysis: "공통 데이터와 누적형 코드 과제로 분석의 흐름을 만듭니다.",
  challenge: "리더보드 경쟁을 검증과 회고까지 이어가는 실전 분석전",
  "deep-learning": "핵심 개념을 예제와 선택형 실습으로 연결합니다.",
  studio: "팀의 질문을 프로토타입과 발표로 완성하는 제작 스튜디오",
};

const studioSteps = [
  ["01", "문제 정의"],
  ["02", "데이터"],
  ["03", "프로토타입"],
  ["04", "데모데이"],
] as const;

function getSchedule(tone: PhaseTone) {
  if (tone === "analysis") return curriculumWeeks.slice(0, 4);
  if (tone === "deep-learning") return curriculumWeeks.slice(5, 8);
  return [];
}

function getWeekFocus(week: (typeof curriculumWeeks)[number]) {
  const source = week.week === "08" ? week.project : week.practice;
  return source.split(" · ").slice(0, 2).join(" · ");
}

export default function CurriculumShowcase() {
  const [activeTone, setActiveTone] = useState<PhaseTone | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activePhase = curriculumPhases.find((phase) => phase.tone === activeTone) ?? null;

  useEffect(() => {
    if (!activePhase) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveTone(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [activePhase]);

  const openPhase = (tone: PhaseTone, event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    triggerRef.current = event.currentTarget;
    setOrigin({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
    });
    setActiveTone(tone);
  };

  const schedule = activePhase ? getSchedule(activePhase.tone) : [];
  const titleId = activePhase ? `phase-modal-title-${activePhase.tone}` : undefined;
  const noteId = activePhase ? `phase-modal-note-${activePhase.tone}` : undefined;

  return (
    <>
      <ol className="phase-flow" aria-label="JBIG 8주 활동 구성">
        {curriculumPhases.map((item) => (
          <li className="phase-item" data-curriculum-phase={item.tone} key={`${item.range}-${item.tone}`}>
            <article className={`phase-card phase-${item.tone}`}>
              <div className="phase-overview">
                <span className="phase-range">
                  <small>WEEK</small>
                  <strong>{item.range}</strong>
                </span>
                <span className="phase-copy">
                  <strong className="phase-title">{item.title}{item.companion ? <em>+ {item.companion}</em> : null}</strong>
                  <span className="phase-description">{item.description}</span>
                </span>
                <button
                  className="phase-open-button"
                  type="button"
                  data-phase-open={item.tone}
                  aria-haspopup="dialog"
                  aria-label={`${item.title} 자세히 보기`}
                  onClick={(event) => openPhase(item.tone, event)}
                >
                  <i className="phase-expand-icon" aria-hidden="true" />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ol>

      {activePhase ? createPortal(
        <div
          className="phase-modal-backdrop"
          data-phase-modal={activePhase.tone}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveTone(null);
          }}
          style={{
            "--modal-from-x": `${origin.x}px`,
            "--modal-from-y": `${origin.y}px`,
          } as CSSProperties}
        >
          <section
            className={`phase-modal-panel phase-modal-${activePhase.tone}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={noteId}
          >
            <button
              className="phase-modal-close"
              type="button"
              ref={closeButtonRef}
              aria-label={`${activePhase.title} 상세 내용 닫기`}
              onClick={() => setActiveTone(null)}
            >
              <i aria-hidden="true" />
            </button>

            <header className="phase-modal-header">
              <span className="phase-modal-range"><small>WEEK</small><strong>{activePhase.range}</strong></span>
              <div>
                <p>{activePhase.label}</p>
                <strong>{activePhase.title}</strong>
              </div>
            </header>

            <div className="phase-modal-copy">
              <h3 id={titleId}>{modalHeadlines[activePhase.tone]}</h3>
              <p id={noteId}>{modalNotes[activePhase.tone]}</p>
            </div>

            {schedule.length > 0 ? (
              <ol className="phase-modal-schedule" aria-label={`${activePhase.title} 주차별 핵심 일정`}>
                {schedule.map((week) => (
                  <li key={week.week}>
                    <span>WEEK <b>{week.week}</b></span>
                    <strong>{week.question}</strong>
                    <p>{getWeekFocus(week)}</p>
                  </li>
                ))}
              </ol>
            ) : null}

            {activePhase.tone === "studio" ? (
              <ol className="project-ascent" aria-label="JBIG SOLUTION STUDIO 등산형 진행 단계">
                {studioSteps.map(([step, label]) => (
                  <li key={step}>
                    <span><b>{step}</b><strong>{label}</strong></span>
                    <i aria-hidden="true" />
                    <em aria-hidden="true" />
                  </li>
                ))}
              </ol>
            ) : null}
          </section>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
