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

export default function CurriculumShowcase() {
  const [activeTone, setActiveTone] = useState<CurriculumPhaseTone | null>(null);
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
  const hasCopy = Boolean(activePhase?.detail.headline && activePhase.detail.note);
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
            className={`phase-modal-panel phase-modal-${activePhase.tone}${hasSchedule ? " phase-modal-with-schedule" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={hasCopy ? noteId : undefined}
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

            {hasCopy ? (
              <div className="phase-modal-copy">
                <h3>{activePhase.detail.headline}</h3>
                <p id={noteId}>{activePhase.detail.note}</p>
              </div>
            ) : null}

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
