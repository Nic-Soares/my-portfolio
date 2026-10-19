import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Shape from "@/components/decor/Shape/Shape.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import { projectsData } from "@/features/work/data/projects/index.ts";
import styles from "./ProjectCarousel.module.css";

const SWIPE_THRESHOLD = 48; // px a finger must travel to change card

// Figma "ProjectsCarousel" (M3 Hero carousel): the current project is the
// large card; its neighbours are compressed to 56px and act as the
// navigation — pressing one brings it to the middle. Swipe works on touch.
const ProjectCarousel = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const swipeStart = useRef<number | null>(null);

  const last = projectsData.length - 1;
  const go = (index: number) => setCurrent(Math.max(0, Math.min(last, index)));

  return (
    <section
      className={styles.carousel}
      aria-label="Projects"
      aria-roledescription="carousel"
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
      {/* Keeps the large card in place when there is no previous project */}
      {current === 0 && <div className={styles.spacer} />}

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
            aria-roledescription="slide"
            aria-label={`${number} of ${String(projectsData.length).padStart(2, "0")}`}
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
                <p className={`body-large ${styles.description}`}>
                  {project.name} — {project.description}
                </p>
                <Button
                  type="square"
                  size="medium"
                  style="filled"
                  icon={null}
                  label="More"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                />
              </div>
            ) : (
              // The compressed card is the navigation control
              <button
                type="button"
                className={styles.peekButton}
                aria-label={`Show project ${number}: ${project.name}`}
                onClick={() => go(index)}
              />
            )}
          </div>
        );
      })}

      {current === last && <div className={styles.spacer} />}
    </section>
  );
};

export default ProjectCarousel;
