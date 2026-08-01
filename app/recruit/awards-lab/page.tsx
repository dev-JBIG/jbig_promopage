import type { Metadata } from "next";
import Link from "next/link";
import { allAwards, awardsByYear, awardYears, featuredAwards, type AwardRecord } from "../content";
import "./awards-lab.css";

export const metadata: Metadata = {
  title: "JBIG 수상경력 모션 데모",
  description: "JBIG 수상경력을 보여주는 세 가지 가로형 애니메이션 디자인 데모입니다.",
  robots: { index: false, follow: false },
};

type AwardWithYear = AwardRecord & { year: string };
type CardVariant = "ribbon" | "year" | "spotlight";

function AwardCard({ award, variant }: { award: AwardWithYear; variant: CardVariant }) {
  return (
    <article className={`award-card award-card-${variant}`}>
      <span>{award.year}</span>
      <h3>{award.title}</h3>
      <p>{award.result}</p>
    </article>
  );
}

function AwardMarquee({
  awards,
  variant,
  direction = "left",
  speed = "normal",
}: {
  awards: readonly AwardWithYear[];
  variant: CardVariant;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}) {
  return (
    <div className={`award-viewport viewport-${variant}`}>
      <div className={`award-track direction-${direction} speed-${speed}`}>
        <div className="award-group">
          {awards.map((award, index) => (
            <AwardCard key={`${award.year}-${award.title}-${index}`} award={award} variant={variant} />
          ))}
        </div>
        <div className="award-group is-clone" aria-hidden="true">
          {awards.map((award, index) => (
            <AwardCard key={`clone-${award.year}-${award.title}-${index}`} award={award} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MotionToggle({ id }: { id: string }) {
  return (
    <>
      <input className="motion-toggle" id={id} type="checkbox" />
      <label className="motion-label" htmlFor={id}><i aria-hidden="true" />움직임 멈추기</label>
    </>
  );
}

const previousAwards = allAwards.filter((award) => award.year !== "2025");

export default function AwardsLabPage() {
  return (
    <main className="awards-lab">
      <nav className="lab-nav" aria-label="수상경력 데모 메뉴">
        <Link href="/recruit">JBIG <span>/ AWARDS LAB</span></Link>
        <div>
          <a href="#option-a">A</a>
          <a href="#option-b">B</a>
          <a href="#option-c">C</a>
        </div>
      </nav>

      <header className="lab-hero">
        <p>SECTION 03 · AWARDS MOTION STUDY</p>
        <h1>많은 수상경력,<br /><em>어떻게 보여줄까?</em></h1>
        <div className="lab-stats" aria-label="수상경력 데모 요약">
          <span><strong>{allAwards.length}</strong>개 기록</span>
          <span><strong>{awardYears.length}</strong>개 연도</span>
          <span><strong>3</strong>개 표현안</span>
        </div>
      </header>

      <section className="decision-strip" aria-label="디자인안 비교">
        <article className="is-recommended"><span>A</span><div><strong>인상 우선</strong><p>많다는 느낌이 가장 강함</p></div></article>
        <article><span>B</span><div><strong>정보 우선</strong><p>연도와 대회명을 읽기 쉬움</p></div></article>
        <article><span>C</span><div><strong>브랜드 우선</strong><p>대표 수상을 크게 각인</p></div></article>
      </section>

      <section className="demo-option option-a" id="option-a" data-awards-demo="ribbon">
        <MotionToggle id="pause-option-a" />
        <header className="option-heading">
          <div><p>OPTION A · DUAL AWARD RIBBON</p><h2>양방향 수상 리본</h2></div>
          <div className="option-note"><strong>추천</strong><span>현재 페이지의 3번 구획에 가장 잘 맞습니다. 짧은 높이 안에서 실적의 양과 활기를 동시에 전달합니다.</span></div>
        </header>
        <div className="demo-stage ribbon-stage">
          <AwardMarquee awards={allAwards.filter((award) => award.year === "2025")} variant="ribbon" speed="normal" />
          <AwardMarquee awards={previousAwards} variant="ribbon" direction="right" speed="slow" />
        </div>
      </section>

      <section className="demo-option option-b" id="option-b" data-awards-demo="year-gallery">
        <MotionToggle id="pause-option-b" />
        <header className="option-heading">
          <div><p>OPTION B · YEAR GALLERY</p><h2>연도별 아카이브 레일</h2></div>
          <div className="option-note"><strong>정보형</strong><span>각 연도의 성과를 빠짐없이 보여줄 때 유리합니다. 대신 세 안 중 세로 공간을 가장 많이 씁니다.</span></div>
        </header>
        <div className="demo-stage year-stage">
          {awardYears.map((year, index) => (
            <div className="year-row" key={year}>
              <div className="year-label"><span>20</span><strong>{year.slice(2)}</strong><i>{awardsByYear[year].length} records</i></div>
              <AwardMarquee
                awards={awardsByYear[year].map((award) => ({ ...award, year }))}
                variant="year"
                direction={index % 2 === 0 ? "left" : "right"}
                speed={index < 2 ? "slow" : "normal"}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="demo-option option-c" id="option-c" data-awards-demo="spotlight">
        <MotionToggle id="pause-option-c" />
        <header className="option-heading">
          <div><p>OPTION C · PRESTIGE SPOTLIGHT</p><h2>대표 수상 스포트라이트</h2></div>
          <div className="option-note"><strong>브랜드형</strong><span>대상·장관상처럼 강한 수상을 크게 보여줍니다. 전체 기록은 숫자로 보완해야 합니다.</span></div>
        </header>
        <div className="demo-stage spotlight-stage">
          <div className="spotlight-count"><span>SELECTED</span><strong>{featuredAwards.length}</strong><p>대표 수상</p></div>
          <AwardMarquee awards={featuredAwards} variant="spotlight" speed="slow" />
        </div>
      </section>

      <footer className="lab-footer">
        <p>세 안 모두 CSS 기반이며, 움직임 줄이기 설정에서는 자동 이동을 멈춥니다.</p>
        <Link href="/recruit">기존 모집 페이지로 돌아가기 <span aria-hidden="true">↗</span></Link>
      </footer>
    </main>
  );
}
