import HeroDecor from "@/components/decor/HeroDecor/HeroDecor.tsx";
import Shape from "@/components/decor/Shape/Shape.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import Chip from "@/components/ui/Chip/Chip.tsx";
import ChipRow from "@/components/ui/Chip/ChipRow.tsx";
import { FitLines } from "@/components/ui/FitLines/FitLines.tsx";
import { useSizeClass } from "@/hooks/useSizeClass.ts";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import { useAboutData } from "../data/useAboutData.ts";
import styles from "./About.page.module.css";

// Figma "About Me": on top, the main pane (hero, About, Work Experience)
// beside the supporting pane (Quick facts / Stack / Education / Speaks);
// below, the full-width contact strip. Desktop fits the viewport; below
// Large it is one scrolling column.
const AboutPage = () => {
  const { t } = useI18n();
  const about = useAboutData();
  const sizeClass = useSizeClass();
  const compact = sizeClass === "compact";
  // Figma: the roomier 1920 sidebar sets its lists in Body Large Plus
  const sideBody =
    sizeClass === "extra-large" ? "body-large-plus" : "body-large";

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <section className={styles.hero} aria-labelledby="about-name">
          <HeroDecor variant="about" />
          <div className={styles.heroCopy}>
            <p className={`title-medium-emphasized ${styles.eyebrow}`}>
              {about.eyebrow}
            </p>
            <h1
              id="about-name"
              className={`display-medium-emphasized ${styles.name}`}
            >
              {about.name}
            </h1>
            <FitLines
              lines={{ "extra-large": 1, large: 2, medium: 1, compact: 2 }}
              className={`body-large ${styles.role}`}
            >
              {about.role} · {about.location}
            </FitLines>
          </div>
          <div className={styles.heroMedia}>
            {/* Figma "Profile photo" placeholder until the real photo */}
            <Shape
              shape="12-sided-cookie"
              color="primary"
              className={styles.photo}
            />
          </div>
        </section>

        <section aria-labelledby="about-me">
          <h2
            id="about-me"
            className={`headline-small-emphasized ${styles.title}`}
          >
            {t.about.title}
          </h2>
          <p className={`body-large ${styles.card}`}>{about.bio}</p>
        </section>

        <section aria-labelledby="about-experience">
          <h2
            id="about-experience"
            className={`headline-small-emphasized ${styles.title}`}
          >
            {t.about.experience}
          </h2>
          <ol className={styles.experience}>
            {about.experience.map((job, index) => (
              <li key={`${job.company}-${job.period}`} className={styles.job}>
                <span
                  className={`display-small-emphasized ${styles.jobIndex}`}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.jobCopy}>
                  <h3 className={`title-medium-emphasized ${styles.jobTitle}`}>
                    {job.role} · {job.company}
                  </h3>
                  <p className={`body-large ${styles.jobSummary}`}>
                    {job.summary}
                  </p>
                </div>
                <span className={`label-large-emphasized ${styles.period}`}>
                  {job.period}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <aside className={styles.side} aria-label={t.about.atAGlance}>
        <section
          className={`${styles.sideCard} ${styles["sideCard--tertiary"]}`}
        >
          <h2 className={`label-medium-emphasized ${styles.label}`}>
            {t.about.quickFacts}
          </h2>
          <ul className={`${sideBody} ${styles.lines}`}>
            {about.quickFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <section className={styles.sideCard}>
          <h2 className={`label-medium-emphasized ${styles.label}`}>
            {t.about.stack}
          </h2>
          {about.stack.map((group) => (
            <div key={group.area} className={styles.stackGroup}>
              <h3 className={`label-medium-emphasized ${styles.label}`}>
                {group.area}
              </h3>
              <ChipRow ariaLabel={group.area}>
                {group.skills.map((skill) => (
                  <Chip key={skill} label={skill} />
                ))}
              </ChipRow>
            </div>
          ))}
        </section>

        <section className={`${styles.sideCard} ${styles["sideCard--fill"]}`}>
          <h2 className={`label-medium-emphasized ${styles.label}`}>
            {t.about.education}
          </h2>
          {/* M3 list: leading icon, two lines, inset dividers */}
          <ul className={styles.degrees}>
            {about.education.map((degree) => (
              <li key={degree.title} className={styles.degree}>
                <span className={styles.degreeIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div>
                  <p
                    className={`title-medium-emphasized ${styles.degreeTitle}`}
                  >
                    {degree.title}
                  </p>
                  <p className={`body-medium ${styles.degreeMeta}`}>
                    {degree.school} · {degree.period}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.certifications}>
            <h3 className={`label-medium-emphasized ${styles.label}`}>
              {t.about.certifications}
            </h3>
            <ChipRow ariaLabel={t.about.certifications}>
              {about.certifications.map((cert) => (
                <Chip key={cert} label={cert} />
              ))}
            </ChipRow>
          </div>
        </section>

        <section
          className={`${styles.sideCard} ${styles["sideCard--secondary"]}`}
        >
          <h2 className={`label-medium-emphasized ${styles.label}`}>
            {t.about.speaks}
          </h2>
          <ul className={`${sideBody} ${styles.lines}`}>
            {about.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>
      </aside>

      <section className={styles.contact} aria-labelledby="about-contact">
        <div className={styles.contactCopy}>
          <h2
            id="about-contact"
            className={`label-medium-emphasized ${styles.contactLabel}`}
          >
            {t.about.sayHi}
          </h2>
          <a
            className={`${compact ? "headline-small-emphasized" : "headline-medium-emphasized"} ${styles.email}`}
            href={`mailto:${about.contact.email}`}
          >
            {about.contact.email}
          </a>
        </div>
        <div className={styles.contactActions}>
          {about.contact.social.map((link) => (
            <Chip key={link.label} label={link.label} href={link.href} />
          ))}
          <Button
            size="small"
            style="filled"
            icon={null}
            label={t.about.downloadCv}
            onClick={() => window.open(about.contact.cvHref, "_blank")}
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
