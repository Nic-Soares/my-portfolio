import React from "react";
import styles from "./ProjectMetadata.module.css";

interface ProjectMetadataProps {
  category: string;
  year: string;
  role: string;
  client: string;
  description: string;
  techStack: string[];
}

export const ProjectMetadata: React.FC<ProjectMetadataProps> = ({
  category,
  year,
  role,
  client,
  description,
  techStack,
}) => {
  return (
    <section className={styles["project-meta"]}>
      <aside className={styles["project-meta__sidebar"]}>
        <div className={styles["project-meta__item"]}>
          <strong
            className={`${styles["project-meta__label"]} headline-large`}
            aria-hidden="false"
          >
            Category
          </strong>
          <span className={`${styles["project-meta__value"]} body-large`}>
            {category}
          </span>
        </div>

        <div className={styles["project-meta__item"]}>
          <strong className={`${styles["project-meta__label"]} headline-large`}>
            Year
          </strong>
          <span className={`${styles["project-meta__value"]} body-large`}>
            {year}
          </span>
        </div>

        <div className={styles["project-meta__item"]}>
          <strong className={`${styles["project-meta__label"]} headline-large`}>
            Role
          </strong>
          <span className={`${styles["project-meta__value"]} body-large`}>
            {role}
          </span>
        </div>

        <div className={styles["project-meta__item"]}>
          <strong className={`${styles["project-meta__label"]} headline-large`}>
            Client
          </strong>
          <span className={`${styles["project-meta__value"]} body-large`}>
            {client}
          </span>
        </div>

        <div className={styles["project-meta__stack"]}>
          <strong className={`${styles["project-meta__label"]} headline-large`}>
            Tech Stack
          </strong>

          <div className={styles["project-meta__stack-tags"]}>
            {techStack.map((tech) => (
              <span
                key={tech}
                className={`${styles["project-meta__stack-tag"]} body-medium`}
                aria-label={`Tech: ${tech}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </aside>

      <article className={styles["project-meta__description"]}>
        <p className={`${styles["project-meta__text"]} body-large-emphasized`}>
          {description}
        </p>
      </article>
    </section>
  );
};

export default ProjectMetadata;
