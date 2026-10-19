import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Shape from "@/components/decor/Shape/Shape.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import { projectsData } from "@/features/work/data/projects/index.ts";
import { useSizeClass } from "../hooks/useSizeClass.ts";
import styles from "./ProjectCarousel.module.css";

// Figma "ProjectsCarousel": one large card with its neighbours peeking 56px
// on each side. Swipes snap card by card; arrows move it on desktop.
const ProjectCarousel = () => {
  const navigate = useNavigate();
  const sizeClass = useSizeClass();
  const desktop = sizeClass === "large" || sizeClass === "extra-large";
  const trackRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  // The card closest to the middle is the current one
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const middle = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    Array.from(track.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const best = track.children[closest] as HTMLElement;
      const distance = Math.abs(
        card.offsetLeft + card.clientWidth / 2 - middle,
      );
      const bestDistance = Math.abs(
        best.offsetLeft + best.clientWidth / 2 - middle,
      );
      if (distance < bestDistance) closest = index;
    });
    setCurrent(closest);
  };

  return (
    <section className={styles.carousel} aria-label="Projects">
      <ul ref={trackRef} className={styles.track} onScroll={onScroll}>
        {projectsData.map((project, index) => (
          <li
            key={project.slug}
            className={styles.card}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${projectsData.length}`}
          >
            {/* Placeholder art, as the Figma card image */}
            <div className={styles.media} aria-hidden="true">
              <Shape shape="gem" color="tertiary" className={styles.shape1} />
              <Shape shape="burst" color="tertiary" className={styles.shape2} />
              <Shape shape="pill" color="tertiary" className={styles.shape3} />
            </div>
            <div className={styles.content}>
              <p className={`title-large-emphasized ${styles.index}`}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className={`body-large ${styles.description}`}>
                {project.name} — {project.description}
              </h3>
              <Button
                type="square"
                size="medium"
                style="filled"
                icon={null}
                label="More"
                onClick={() => navigate(`/projects/${project.slug}`)}
              />
            </div>
          </li>
        ))}
      </ul>

      {desktop && (
        <>
          <div className={`${styles.arrow} ${styles["arrow--prev"]}`}>
            <IconButton
              size="small"
              style="tonal"
              icon="chevron_left"
              ariaLabel="Previous project"
              disabled={current === 0}
              onClick={() => scrollTo(current - 1)}
            />
          </div>
          <div className={`${styles.arrow} ${styles["arrow--next"]}`}>
            <IconButton
              size="small"
              style="tonal"
              icon="chevron_right"
              ariaLabel="Next project"
              disabled={current === projectsData.length - 1}
              onClick={() => scrollTo(current + 1)}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectCarousel;
