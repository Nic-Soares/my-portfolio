import styles from './CarouselSlide.module.css';
import type { CarouselSlideProps } from '@/types';

const CarouselSlide = ({ project, isActive, onSlideClick, position }: CarouselSlideProps) => {
  const handleClick = () => {
    onSlideClick(project.id);
  };

  const getSlideClass = () => {
    let className = styles['carousel-slide'];
    if (isActive) className += ` ${styles.active}`;
    if (position) className += ` ${styles[`carousel-slide--${position}`]}`;
    return className;
  };

  return (
    <div
      className={getSlideClass()}
      onClick={handleClick}
    >
      <h4>{project.title}</h4>
      <p>{project.description}</p>
    </div>
  );
};

export default CarouselSlide;
