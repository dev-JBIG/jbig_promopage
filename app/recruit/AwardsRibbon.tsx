import { allAwards, awardsContent, awardYears, type AwardRecord } from "./content";

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
        <i aria-hidden="true">{awardsContent.plaqueBrand} · {number}</i>
      </div>
      {kind === "medal" ? <span className="award-seal" aria-hidden="true"><b>{awardsContent.plaqueBrand[0]}</b><i>{awardsContent.sealLabel}</i></span> : null}
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

const latestYear = awardYears[0];
const latestArchiveYear = awardYears[1];
const oldestYear = awardYears[awardYears.length - 1];
const latestAwards = allAwards.filter((award) => award.year === latestYear);
const archiveAwards = allAwards.filter((award) => award.year !== latestYear);

export default function AwardsRibbon() {
  return (
    <section className="awards-section" id="awards" data-recruit-section="awards">
      <div className="recruit-section awards-intro">
        <header className="awards-heading">
          <h2>{awardsContent.heading[0]}<br />{awardsContent.heading[1]}</h2>
        </header>
        <div className="awards-summary">
          <p>{awardsContent.description[0]}<br />{awardsContent.description[1]}</p>
          <div aria-label={awardsContent.summaryAriaLabel}>
            <span><strong>{allAwards.length}</strong> {awardsContent.recordLabel}</span>
            <span><strong>{awardYears.length}</strong> {awardsContent.yearsLabel}</span>
          </div>
        </div>
      </div>

      <input className="awards-motion-toggle" id="pause-awards-ribbon" type="checkbox" />
      <label className="awards-motion-label" htmlFor="pause-awards-ribbon"><i aria-hidden="true" />{awardsContent.motionToggleLabel}</label>

      <div
        className="awards-ribbons"
        aria-label={`${oldestYear}${awardsContent.ribbonAriaLabel.fromYearSuffix} ${latestYear}${awardsContent.ribbonAriaLabel.toYearSuffix} ${awardsContent.ribbonAriaLabel.subject}`}
      >
        <div className="award-ribbon-row ribbon-latest">
          <p className="award-ribbon-caption"><span>{awardsContent.latestCaption}</span> {latestYear}</p>
          <AwardTrack awards={latestAwards} direction="left" />
        </div>
        <div className="award-ribbon-row ribbon-archive">
          <p className="award-ribbon-caption"><span>{awardsContent.archiveCaption}</span> {oldestYear}—{latestArchiveYear}</p>
          <AwardTrack awards={archiveAwards} direction="right" />
        </div>
      </div>
      <span className="mini-mascot mascot-peek awards-mascot" aria-hidden="true" />
    </section>
  );
}
