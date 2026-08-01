import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  acronymItems,
  activityAreas,
  curriculumWeeks,
  faqItems,
  fitStatements,
  recruitmentConfig,
} from "./content";
import AwardsRibbon from "./AwardsRibbon";
import CurriculumShowcase from "./CurriculumShowcase";
import TestimonialsSection from "./TestimonialsSection";
import "./recruit.css";

const title = "JBIG 모집 | 호기심이 팀이 되는 곳";
const description = "함께 배우고, 만들고, 도전하는 전북대학교 데이터 분석 동아리 JBIG의 모집 페이지입니다.";
const canonicalUrl = "https://jbig.co.kr/recruit";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: "JBIG",
    locale: "ko_KR",
    type: "website",
  },
};

type MascotPose = "wave" | "note" | "look" | "peek";

function Mascot({ pose, className = "" }: { pose: MascotPose; className?: string }) {
  return <span className={`mini-mascot mascot-${pose} ${className}`.trim()} aria-hidden="true" />;
}

function LiquidLogo() {
  return (
    <div className="liquid-logo" role="img" aria-label="민트와 코발트 그라데이션으로 빛나는 JBIG 로고">
      {["J", "B", "I", "G"].map((letter, index) => (
        <span key={letter} style={{ "--letter-index": index } as CSSProperties}>{letter}</span>
      ))}
    </div>
  );
}

export default function RecruitPage() {
  return (
    <div className="recruit-page">
      <a className="recruit-skip-link" href="#recruit-main">본문으로 바로가기</a>

      <nav className="recruit-nav" aria-label="JBIG 모집 페이지 주요 메뉴">
        <a className="recruit-brand" href="https://jbig.co.kr/" aria-label="JBIG 홈으로 이동">JBIG</a>
        <div className="recruit-nav-links">
          <a href="#about">JBIG 소개</a>
          <a href="#curriculum">8주 교안</a>
          <a href="#testimonials">동아리원 후기</a>
          <a href="#awards">수상경력</a>
          <a href="#fit">잘 맞는 사람</a>
        </div>
        <a className="recruit-nav-cta" href="#apply">{recruitmentConfig.statusLabel}</a>
      </nav>

      <main id="recruit-main" tabIndex={-1}>
        <section className="recruit-hero" id="hero" data-recruit-section="hero">
          <LiquidLogo />
          <div className="recruit-hero-copy">
            <h1>호기심이<br />팀이 되는 곳.</h1>
            <p>전북대학교 데이터 분석 동아리 JBIG</p>
          </div>
          <Mascot pose="wave" className="hero-mascot" />
          <a className="hero-scroll" href="#about">JBIG 더 알아보기 <span aria-hidden="true">↓</span></a>
        </section>

        <section className="about-section" id="about" data-recruit-section="about">
          <div className="recruit-section about-inner">
            <header className="about-heading">
              <h2>JBIG가 무슨<br />약자인가요?</h2>
            </header>

            <div className="acronym-grid" aria-label="JBIG 이름의 의미">
              {acronymItems.map((item) => (
                <article className="acronym-card" key={item.letter}>
                  <span>{item.letter}</span>
                  <h3>{item.word}</h3>
                </article>
              ))}
            </div>

            <div className="activity-block">
              <div className="activity-heading">
                <h3>우리가 하는 활동</h3>
              </div>
              <div className="activity-list">
                {activityAreas.map((area, index) => (
                  <span key={area}><i aria-hidden="true">0{index + 1}</i>{area}</span>
                ))}
              </div>
              <Mascot pose="peek" className="about-mascot" />
            </div>
          </div>
        </section>

        <section className="curriculum-section" id="curriculum" data-recruit-section="curriculum">
          <div className="recruit-section curriculum-inner">
            <header className="curriculum-heading">
              <h2>배운 것은 바로,<br />해보는 쪽으로.</h2>
            </header>

            <div className="curriculum-layout">
              <CurriculumShowcase />
            </div>

            <details className="curriculum-detail">
              <summary>
                <span className="detail-label detail-label-closed">8주 일정 자세히 보기</span>
                <span className="detail-label detail-label-open">상세 일정 닫기</span>
                <i aria-hidden="true" />
              </summary>
              <div className="curriculum-detail-panel">
                <header>
                  <h3>질문에서 결과물까지,<br />매주 한 걸음씩.</h3>
                </header>
                <ol className="week-detail-grid">
                  {curriculumWeeks.map((item) => (
                    <li key={item.week}>
                      <div className="week-detail-heading">
                        <span>WEEK</span>
                        <strong>{item.week}</strong>
                      </div>
                      <h4>{item.question}</h4>
                      <dl>
                        <div><dt>실습</dt><dd>{item.practice}</dd></div>
                        <div><dt>프로젝트</dt><dd>{item.project}</dd></div>
                        <div><dt>세미나</dt><dd>{item.seminar}</dd></div>
                      </dl>
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          </div>
        </section>

        <TestimonialsSection />

        <AwardsRibbon />

        <section className="fit-section" id="fit" data-recruit-section="fit">
          <div className="recruit-section fit-inner">
            <div className="fit-copy">
              <h2>이런 당신을<br />기다리고 있어요.</h2>
            </div>
            <ol className="fit-list">
              {fitStatements.map((statement, index) => (
                <li key={statement}><span>0{index + 1}</span><p>{statement}</p></li>
              ))}
            </ol>
            <Mascot pose="note" className="fit-mascot" />
          </div>
        </section>

        <section className="recruit-section faq-section" id="faq" data-recruit-section="faq">
          <div className="faq-heading">
            <h2>모집 전에<br />궁금한 것들.</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details key={item.id} open={index === 0}>
                <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="apply-section" id="apply" data-recruit-section="apply">
          <div className="apply-glow" aria-hidden="true" />
          <h2>다음 이야기를<br />함께 만들어요.</h2>
          <span>모집 일정과 지원 대상이 확정되면 이곳에서 안내합니다.</span>
          {recruitmentConfig.applicationUrl ? (
            <a className="application-button" data-application-status="available" href={recruitmentConfig.applicationUrl} target="_blank" rel="noopener noreferrer">
              지원하기 <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button className="application-button is-disabled" type="button" data-application-status="unavailable" disabled aria-disabled="true">
              {recruitmentConfig.statusLabel}
            </button>
          )}
          <Mascot pose="peek" className="apply-mascot" />
        </section>
      </main>

      <footer className="recruit-footer">
        <a href="https://jbig.co.kr/">JBIG</a>
        <span>Jeonbuk National University · Data Analysis Club</span>
      </footer>
    </div>
  );
}
