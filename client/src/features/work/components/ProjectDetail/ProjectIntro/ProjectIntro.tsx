import type { ProjectFact } from "../../../data/project-data.types.ts";
import { BlockWrapper } from "../BlockRenderer/BlockWrapper.tsx";
import styles from "./ProjectIntro.module.css";

interface ProjectIntroProps {
  facts: ProjectFact[];
  text: string;
  id?: string;
}

// Figma "Project Intro": "Project Facts" beside the lead paragraph at Large,
// stacked below
const ProjectIntro = ({ facts, text, id }: ProjectIntroProps) => (
  <BlockWrapper id={id}>
    <div className={styles.intro}>
      {facts.length > 0 && (
        <dl className={styles.intro__facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.intro__fact}>
              <dt
                className={`headline-large-emphasized ${styles["intro__fact-label"]}`}
              >
                {fact.label}
              </dt>
              <dd className={`headline-small ${styles["intro__fact-value"]}`}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      <p className={`body-large-plus ${styles.intro__text}`}>{text}</p>
    </div>
  </BlockWrapper>
);

export default ProjectIntro;
