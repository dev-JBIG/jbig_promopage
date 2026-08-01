import { allAwards, type AwardRecord } from "./awards";

type AwardWithYear = AwardRecord & { year: string };
type PlaqueKind = "medal" | "glass" | "ticket";

function getPlaqueKind(result: string): PlaqueKind {
  if (/대상|최우수상|장관상|총장상|도지사상/.test(result)) return "medal";
  if (/우수상|금상|은상|동상|특별상|포스터/.test(result)) return "glass";
  return "ticket";
}

function AwardPlaque({ award, index }: { award: AwardWithYear; index: number }) {
  const kind = getPlaqueKind(award.result);
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={`award-plaque plaque-${kind} plaque-tone-${index % 3}`}>
      <div className="award-plaque-meta">
        <span>{award.year}</span>
        <i aria-hidden="true">JBIG · {number}</i>
      </div>
      {kind === "medal" ? <span className="award-seal" aria-hidden="true"><b>J</b><i>AWARD</i></span> : null}
      <h3>{award.title}</h3>
      <p>{award.result}</p>
    </article>
  );
}

function AwardTrack({ awards, direction }: { awards: AwardWithYear[]; direction: "left" | "right" }) {
  return (
    <div className="award-ribbon-viewport">
      <div className={`awards-track direction-${direction}`}>
        <div className="awards-group">
          {awards.map((award, index) => (
            <AwardPlaque key={`${award.year}-${award.title}-${index}`} award={award} index={index} />
          ))}
        </div>
        <div className="awards-group is-clone" aria-hidden="true">
          {awards.map((award, index) => (
            <AwardPlaque key={`clone-${award.year}-${award.title}-${index}`} award={award} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const latestAwards = allAwards.filter((award) => award.year === "2025");
const archiveAwards = allAwards.filter((award) => award.year !== "2025");

export default function AwardsRibbon() {
  return (
    <section className="awards-section" id="awards" data-recruit-section="awards">
      <div className="recruit-section awards-intro">
        <header className="awards-heading">
          <h2>도전은,<br />기록으로 남습니다.</h2>
        </header>
        <div className="awards-summary">
          <p>해커톤부터 AI 경진대회, 논문과 창업까지.<br />JBIG의 도전은 결과로 이어져 왔습니다.</p>
          <div aria-label="수상경력 요약">
            <span><strong>{allAwards.length}</strong> RECORDS</span>
            <span><strong>5</strong> YEARS</span>
          </div>
        </div>
      </div>

      <input className="awards-motion-toggle" id="pause-awards-ribbon" type="checkbox" />
      <label className="awards-motion-label" htmlFor="pause-awards-ribbon"><i aria-hidden="true" />움직임 멈추기</label>

      <div className="awards-ribbons" aria-label="2021년부터 2025년까지 JBIG 수상경력">
        <div className="award-ribbon-row ribbon-latest">
          <p className="award-ribbon-caption"><span>NOW</span> 2025</p>
          <AwardTrack awards={latestAwards} direction="left" />
        </div>
        <div className="award-ribbon-row ribbon-archive">
          <p className="award-ribbon-caption"><span>ARCHIVE</span> 2021—2024</p>
          <AwardTrack awards={archiveAwards} direction="right" />
        </div>
      </div>
      <span className="mini-mascot mascot-peek awards-mascot" aria-hidden="true" />
    </section>
  );
}
