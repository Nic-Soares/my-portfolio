import styles from "./CarouselSlide.module.css";
import clsx from "clsx";
import type { Project } from "@/types/project";

interface CarouselSlideProps {
  project: Project;
  isActive: boolean;
  onSlideClick: (projectId: number) => void;
  position?: "middle" | "lateral";
}

const CarouselSlide = ({
  project,
  isActive,
  onSlideClick,
  position,
}: CarouselSlideProps) => {
  const handleClick = () => {
    onSlideClick(project.id);
  };

  const slideClass = clsx(
    styles["carousel-slide"],
    isActive && styles.active,
    position && styles[`carousel-slide--${position}`],
  );

  return (
    <div className={slideClass} onClick={handleClick}>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
    </div>
  );
};

export default CarouselSlide;
