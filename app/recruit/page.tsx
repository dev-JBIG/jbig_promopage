import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  acronymItems,
  activityAreas,
  curriculumContent,
  curriculumWeeks,
  faqItems,
  fitStatements,
  recruitPageContent,
  recruitmentConfig,
} from "./content";
import AwardsRibbon from "./AwardsRibbon";
import CurriculumShowcase from "./CurriculumShowcase";
import TestimonialsSection from "./TestimonialsSection";
import "./recruit.css";

const { metadata: metadataContent } = recruitPageContent;

export const metadata: Metadata = {
  title: metadataContent.title,
  description: metadataContent.description,
  alternates: { canonical: metadataContent.canonicalUrl },
  openGraph: {
    title: metadataContent.title,
    description: metadataContent.description,
    url: metadataContent.canonicalUrl,
    siteName: metadataContent.siteName,
    locale: metadataContent.locale,
    type: "website",
  },
};

type MascotPose = "wave" | "note" | "look" | "peek";

function Mascot({ pose, className = "" }: { pose: MascotPose; className?: string }) {
  return <span className={`mini-mascot mascot-${pose} ${className}`.trim()} aria-hidden="true" />;
}

function LiquidLogo() {
  return (
    <div className="liquid-logo" role="img" aria-label={recruitPageContent.brand.logoAriaLabel}>
      {recruitPageContent.brand.logoLetters.map((letter, index) => (
        <span key={letter} style={{ "--letter-index": index } as CSSProperties}>{letter}</span>
      ))}
    </div>
  );
}

export default function RecruitPage() {
  return (
    <div className="recruit-page">
      <a className="recruit-skip-link" href="#recruit-main">{recruitPageContent.skipLinkLabel}</a>

      <nav className="recruit-nav" aria-label={recruitPageContent.navigation.ariaLabel}>
        <a className="recruit-brand" href={recruitPageContent.brand.homeUrl} aria-label={recruitPageContent.brand.homeAriaLabel}>
          {recruitPageContent.brand.name}
        </a>
        <div className="recruit-nav-links">
          {recruitPageContent.navigation.items.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </div>
        <a className="recruit-nav-cta" href="#apply">{recruitmentConfig.statusLabel}</a>
      </nav>

      <main id="recruit-main" tabIndex={-1}>
        <section className="recruit-hero" id="hero" data-recruit-section="hero">
          <LiquidLogo />
          <div className="recruit-hero-copy">
            <h1>{recruitPageContent.hero.heading[0]}<br />{recruitPageContent.hero.heading[1]}</h1>
            <p>{recruitPageContent.hero.subtitle}</p>
          </div>
          <Mascot pose="wave" className="hero-mascot" />
          <a className="hero-scroll" href="#about">{recruitPageContent.hero.scrollLabel} <span aria-hidden="true">↓</span></a>
        </section>

        <section className="about-section" id="about" data-recruit-section="about">
          <div className="recruit-section about-inner">
            <header className="about-heading">
              <h2>{recruitPageContent.about.heading[0]}<br />{recruitPageContent.about.heading[1]}</h2>
            </header>

            <div className="acronym-grid" aria-label={recruitPageContent.about.acronymAriaLabel}>
              {acronymItems.map((item) => (
                <article className="acronym-card" key={item.letter}>
                  <span>{item.letter}</span>
                  <h3>{item.word}</h3>
                </article>
              ))}
            </div>

            <div className="activity-block">
              <div className="activity-heading">
                <h3>{recruitPageContent.about.activityHeading}</h3>
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
              <h2>{curriculumContent.heading[0]}<br />{curriculumContent.heading[1]}</h2>
            </header>

            <div className="curriculum-layout">
              <CurriculumShowcase />
            </div>

            <details className="curriculum-detail">
              <summary>
                <span className="detail-label detail-label-closed">{curriculumContent.detail.openLabel}</span>
                <span className="detail-label detail-label-open">{curriculumContent.detail.closeLabel}</span>
                <i aria-hidden="true" />
              </summary>
              <div className="curriculum-detail-panel">
                <header>
                  <h3>{curriculumContent.detail.heading[0]}<br />{curriculumContent.detail.heading[1]}</h3>
                </header>
                <ol className="week-detail-grid">
                  {curriculumWeeks.map((item) => (
                    <li key={item.week}>
                      <div className="week-detail-heading">
                        <span>{curriculumContent.weekLabel}</span>
                        <strong>{item.week}</strong>
                      </div>
                      <h4>{item.question}</h4>
                      <dl>
                        <div><dt>{curriculumContent.detail.labels.practice}</dt><dd>{item.practice}</dd></div>
                        <div><dt>{curriculumContent.detail.labels.project}</dt><dd>{item.project}</dd></div>
                        <div><dt>{curriculumContent.detail.labels.seminar}</dt><dd>{item.seminar}</dd></div>
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
              <h2>{recruitPageContent.fit.heading[0]}<br />{recruitPageContent.fit.heading[1]}</h2>
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
            <h2>{recruitPageContent.faq.heading[0]}<br />{recruitPageContent.faq.heading[1]}</h2>
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
          <h2>{recruitPageContent.apply.heading[0]}<br />{recruitPageContent.apply.heading[1]}</h2>
          <span>{recruitPageContent.apply.description}</span>
          {recruitmentConfig.applicationUrl ? (
            <a className="application-button" data-application-status="available" href={recruitmentConfig.applicationUrl} target="_blank" rel="noopener noreferrer">
              {recruitPageContent.apply.buttonLabel} <span aria-hidden="true">↗</span>
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
        <a href={recruitPageContent.brand.homeUrl}>{recruitPageContent.brand.name}</a>
        <span>{recruitPageContent.footer.description}</span>
      </footer>
    </div>
  );
}
