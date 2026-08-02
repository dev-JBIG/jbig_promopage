"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  curriculumContent,
  curriculumPhases,
  curriculumWeeks,
  type CurriculumPhase,
  type CurriculumPhaseTone,
} from "./content";

function getSchedule(phase: CurriculumPhase) {
  const weekIds: readonly string[] = phase.detail.weekIds;
  return curriculumWeeks.filter((week) => weekIds.includes(week.week));
}

function getWeekFocus(week: (typeof curriculumWeeks)[number]) {
  const source = week.week === "08" ? week.project : week.practice;
  return source.split(" · ").slice(0, 2).join(" · ");
}

function AnalysisFocusFlow() {
  return (
    <div
      className="analysis-focus-flow"
      role="img"
      aria-label="추상화한 데이터가 굵은 흐름으로 하나의 구에 모인 뒤 분석 그래프로 이어지는 과정"
    >
      <span className="analysis-data-source" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <span className="analysis-focus-stream" aria-hidden="true" />
      <span className="analysis-focus-orb-stage" aria-hidden="true">
        <span className="analysis-focus-orb"><i /></span>
      </span>
      <span className="analysis-focus-arrow" aria-hidden="true" />
      <span className="analysis-focus-chart" aria-hidden="true"><i /><i /><i /><i /><i /></span>
    </div>
  );
}

function ChallengeArenaVisual() {
  return (
    <div
      className="arena-visual-shell"
      role="img"
      aria-label="계획은 곧은 점선이지만 실제 경험은 여러 번의 시도와 굴곡을 거쳐 나아가는 모습"
    >
      <div className="arena-experience-curve" aria-hidden="true">
        <svg viewBox="0 0 560 330" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="arena-experience-gradient" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#7be7db" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path className="arena-plan-line" d="M38 310 L522 20" />
          <polyline className="arena-experience-line" points="38,310 112,250 174,296 244,174 304,236 374,92 428,146 522,20" />
          <g className="arena-experience-points">
            <circle cx="38" cy="310" r="6" />
            <circle cx="112" cy="250" r="6" />
            <circle cx="174" cy="296" r="6" />
            <circle cx="244" cy="174" r="6" />
            <circle cx="304" cy="236" r="6" />
            <circle cx="374" cy="92" r="6" />
            <circle cx="428" cy="146" r="6" />
            <circle className="arena-experience-end" cx="522" cy="20" r="9" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function CurriculumShowcase() {
  const [activeTone, setActiveTone] = useState<CurriculumPhaseTone | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activePhase: CurriculumPhase | null = curriculumPhases.find((phase) => phase.tone === activeTone) ?? null;

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

  const openPhase = (tone: CurriculumPhaseTone, event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    triggerRef.current = event.currentTarget;
    setOrigin({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
    });
    setActiveTone(tone);
  };

  const schedule = activePhase ? getSchedule(activePhase) : [];
  const hasSchedule = schedule.length > 0;
  const showsAnalysisFlow = activePhase?.tone === "analysis";
  const showsChallengeArena = activePhase?.tone === "challenge";
  const hasStandardSchedule = hasSchedule && !showsAnalysisFlow;
  const challengeHeadlineLines = showsChallengeArena
    ? activePhase.detail.headline.split(". ").map((line, index, lines) => index < lines.length - 1 ? `${line}.` : line)
    : [];
  const titleId = activePhase ? `phase-modal-title-${activePhase.tone}` : undefined;
  const noteId = activePhase ? `phase-modal-note-${activePhase.tone}` : undefined;

  return (
    <>
      <ol className="phase-flow" aria-label={curriculumContent.flowAriaLabel}>
        {curriculumPhases.map((item) => (
          <li className="phase-item" data-curriculum-phase={item.tone} key={`${item.range}-${item.tone}`}>
            <article className={`phase-card phase-${item.tone}`}>
              <div className="phase-overview">
                <span className="phase-range">
                  <small>{curriculumContent.weekLabel}</small>
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
                  aria-label={`${item.title} ${curriculumContent.expandAriaLabelSuffix}`}
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
            className={`phase-modal-panel phase-modal-${activePhase.tone}${hasStandardSchedule ? " phase-modal-with-schedule" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={showsAnalysisFlow ? undefined : noteId}
          >
            <button
              className="phase-modal-close"
              type="button"
              ref={closeButtonRef}
              aria-label={`${activePhase.title} ${curriculumContent.closeAriaLabelSuffix}`}
              onClick={() => setActiveTone(null)}
            >
              <i aria-hidden="true" />
            </button>

            <header className="phase-modal-header">
              <span className="phase-modal-range"><small>{curriculumContent.weekLabel}</small><strong>{activePhase.range}</strong></span>
              <div>
                <strong id={titleId}>{activePhase.title}</strong>
              </div>
            </header>

            {showsAnalysisFlow ? <AnalysisFocusFlow /> : showsChallengeArena ? (
              <div className="challenge-arena-layout">
                <div className="phase-modal-copy challenge-arena-copy">
                  <h3>
                    {challengeHeadlineLines.map((line) => <span className="challenge-headline-line" key={line}>{line}</span>)}
                  </h3>
                  {activePhase.detail.supportingLines ? (
                    <p className="challenge-supporting-copy">
                      {activePhase.detail.supportingLines.map((line) => <span key={line}>{line}</span>)}
                    </p>
                  ) : null}
                  {activePhase.detail.keywords ? (
                    <ul className="challenge-keywords" aria-label="데이터 대회에서 필요한 과정">
                      {activePhase.detail.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
                    </ul>
                  ) : null}
                  <p className="challenge-arena-note" id={noteId}>
                    {(activePhase.detail.noteLines ?? [activePhase.detail.note]).map((line) => <span key={line}>{line}</span>)}
                  </p>
                </div>
                <ChallengeArenaVisual />
              </div>
            ) : (
              <div className="phase-modal-copy">
                <h3>{activePhase.detail.headline}</h3>
                <p id={noteId}>{activePhase.detail.note}</p>
              </div>
            )}

            {hasSchedule ? (
              <ol className="phase-modal-schedule" aria-label={`${activePhase.title} ${curriculumContent.scheduleAriaLabelSuffix}`}>
                {schedule.map((week) => (
                  <li key={week.week}>
                    <span>{curriculumContent.weekLabel} <b>{week.week}</b></span>
                    <strong>{week.question}</strong>
                    <p>{getWeekFocus(week)}</p>
                  </li>
                ))}
              </ol>
            ) : null}

            {activePhase.detail.steps.length > 0 ? (
              <ol className="project-ascent" aria-label={curriculumContent.studioStepsAriaLabel}>
                {activePhase.detail.steps.map(([step, label]) => (
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
