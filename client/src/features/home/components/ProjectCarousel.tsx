import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Shape from "@/components/decor/Shape/Shape.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import { FitLines } from "@/components/ui/FitLines/FitLines.tsx";
import { useProjectData } from "@/features/work/hooks/useProjectData.ts";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import styles from "./ProjectCarousel.module.css";

const SWIPE_THRESHOLD = 48; // px a finger must travel to change card

// Figma "ProjectsCarousel" (M3 Hero carousel): the current project is the
// large card; its neighbours are compressed to 56px and act as the
// navigation — pressing one brings it to the middle. At either end the
// large card also takes the missing neighbour's room. Swipe works on touch.
const ProjectCarousel = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const projectsData = useProjectData().getAllProjects();
  const [current, setCurrent] = useState(0);
  const swipeStart = useRef<number | null>(null);

  const last = projectsData.length - 1;
  const go = (index: number) => setCurrent(Math.max(0, Math.min(last, index)));

  return (
    <section
      className={styles.carousel}
      aria-label={t.home.projects}
      aria-roledescription={t.home.carousel}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") swipeStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null) return;
        const distance = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (distance <= -SWIPE_THRESHOLD) go(current + 1);
        if (distance >= SWIPE_THRESHOLD) go(current - 1);
      }}
    >
      {projectsData.map((project, index) => {
        const offset = index - current;
        if (Math.abs(offset) > 1) return null;
        const number = String(index + 1).padStart(2, "0");
        const isCurrent = offset === 0;

        return (
          <div
            key={project.slug}
            className={`${styles.card} ${isCurrent ? styles["card--current"] : styles["card--peek"]}`}
            role="group"
            aria-roledescription={t.home.slide}
            aria-label={t.home.slideOf(
              number,
              String(projectsData.length).padStart(2, "0"),
            )}
          >
            {/* Placeholder art, as the Figma card image */}
            <div className={styles.media} aria-hidden="true">
              <Shape shape="gem" color="tertiary" className={styles.shape1} />
              <Shape shape="burst" color="tertiary" className={styles.shape2} />
              <Shape shape="pill" color="tertiary" className={styles.shape3} />
            </div>

            {isCurrent ? (
              <div className={styles.content}>
                <p className={`title-large-emphasized ${styles.index}`}>
                  {number}
                </p>
                <FitLines
                  lines={{ "extra-large": 2, large: 2, medium: 2, compact: 4 }}
                  className={`body-large ${styles.description}`}
                >
                  {project.name} — {project.description}
                </FitLines>
                <Button
                  type="square"
                  size="medium"
                  style="filled"
                  icon={null}
                  label={t.home.more}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                />
              </div>
            ) : (
              // The compressed card is the navigation control
              <button
                type="button"
                className={styles.peekButton}
                aria-label={t.home.showProject(number, project.name)}
                onClick={() => go(index)}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ProjectCarousel;
