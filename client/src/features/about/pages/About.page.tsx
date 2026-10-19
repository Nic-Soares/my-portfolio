import HeroDecor from "@/components/decor/HeroDecor/HeroDecor.tsx";
import Shape from "@/components/decor/Shape/Shape.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import Chip from "@/components/ui/Chip/Chip.tsx";
import ChipRow from "@/components/ui/Chip/ChipRow.tsx";
import { useSizeClass } from "@/hooks/useSizeClass.ts";
import { aboutData as about } from "../data/about.data.ts";
import styles from "./About.page.module.css";

// Figma "About Me" as an M3 supporting-pane layout: hero, About, Work
// Experience and the contact strip in the main pane; Quick facts / Stack /
// Education / Speaks in a full-height supporting pane. Desktop fits the
// viewport; below Large it is one scrolling column.
const AboutPage = () => {
  const compact = useSizeClass() === "compact";

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
            <p className={`body-large ${styles.role}`}>
              {about.role} · {about.location}
            </p>
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
            About Me
          </h2>
          <p className={`body-large ${styles.card}`}>{about.bio}</p>
        </section>

        <section aria-labelledby="about-experience">
          <h2
            id="about-experience"
            className={`headline-small-emphasized ${styles.title}`}
          >
            Work Experience
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
                  <h3 className={`title-large-emphasized ${styles.jobTitle}`}>
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

      <aside className={styles.side} aria-label="At a glance">
        <section
          className={`${styles.sideCard} ${styles["sideCard--tertiary"]}`}
        >
          <h2 className={`label-medium-emphasized ${styles.label}`}>
            Quick facts
          </h2>
          <ul className={`body-large ${styles.lines}`}>
            {about.quickFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <section className={styles.sideCard}>
          <h2 className={`label-medium-emphasized ${styles.label}`}>Stack</h2>
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
            Education
          </h2>
          <ul className={styles.degrees}>
            {about.education.map((degree, index) => (
              <li
                key={degree.title}
                className={index > 0 ? styles.divided : undefined}
              >
                <p className={`title-medium-emphasized ${styles.degreeTitle}`}>
                  {degree.title}
                </p>
                <p className={`body-medium ${styles.degreeMeta}`}>
                  {degree.school} · {degree.period}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`${styles.sideCard} ${styles["sideCard--secondary"]}`}
        >
          <h2 className={`label-medium-emphasized ${styles.label}`}>Speaks</h2>
          <ul className={`body-large ${styles.lines}`}>
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
            Say hi!
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
            label="Download CV"
            onClick={() => window.open(about.contact.cvHref, "_blank")}
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
