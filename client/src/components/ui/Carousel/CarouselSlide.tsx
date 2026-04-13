import styles from "./CarouselSlide.module.css";
import clsx from "clsx";

export interface CarouselItemData {
  id: number;
  title: string;
  description: string;
}

interface CarouselSlideProps {
  item: CarouselItemData;
  isActive: boolean;
  onSlideClick: (itemId: number) => void;
  position?: "middle" | "lateral";
}

const CarouselSlide = ({
  item,
  isActive,
  onSlideClick,
  position,
}: CarouselSlideProps) => {
  const handleClick = () => {
    onSlideClick(item.id);
  };

  const slideClass = clsx(
    styles["carousel-slide"],
    isActive && styles.active,
    position && styles[`carousel-slide--${position}`],
  );

  return (
    <div className={slideClass} onClick={handleClick}>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  );
};

export default CarouselSlide;
