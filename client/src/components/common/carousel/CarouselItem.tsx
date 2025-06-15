import React from 'react';
import styles from './CarouselItem.module.css';

interface CarouselItemProps {
  title: string;
  description: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title, description }) => {
  return (
    <div className={styles.carousel_item}>
      <div className={styles.shapes}>
        <div className={styles.shape + ' ' + styles.triangle}></div>
        <div className={styles.shape + ' ' + styles.gear}></div>
        <div className={styles.shape + ' ' + styles.rounded}></div>
      </div>

      <div className={styles.text_content}>
        <h4>{title}</h4>
        <p>{description}</p>
        <md-filled-button>More</md-filled-button>
      </div>
    </div>
  );
};

export default CarouselItem;
