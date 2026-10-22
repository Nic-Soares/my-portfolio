import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import styles from "./ProjectPager.module.css";

interface PagerProject {
  slug: string;
  name: string;
}

interface ProjectPagerProps {
  previous: PagerProject | null;
  next: PagerProject | null;
}

// Figma "Project Pager": a Previous / Next project card at the end of a
// project page. The first project has no Previous, the last no Next.
export const ProjectPager = ({ previous, next }: ProjectPagerProps) => {
  const { t } = useI18n();
  if (!previous && !next) return null;

  return (
    <nav className={styles.pager} aria-label={t.work.moreProjects}>
      {previous && (
        <Link
          to={`/projects/${previous.slug}`}
          className={styles.card}
          rel="prev"
        >
          <span className={`title-small-emphasized ${styles.overline}`}>
            <span aria-hidden="true">←</span> {t.work.previousProject}
          </span>
          <span className={`title-medium-emphasized ${styles.title}`}>
            {previous.name}
          </span>
        </Link>
      )}
      {next && (
        <Link
          to={`/projects/${next.slug}`}
          className={`${styles.card} ${styles.next}`}
          rel="next"
        >
          <span className={`title-small-emphasized ${styles.overline}`}>
            {t.work.nextProject} <span aria-hidden="true">→</span>
          </span>
          <span className={`title-medium-emphasized ${styles.title}`}>
            {next.name}
          </span>
        </Link>
      )}
    </nav>
  );
};
