import React from 'react';
import styles from './CollaborateSection.module.css'; // ajuste conforme o caminho real do CSS module

const ServiceItem = () => {
  return (
    <>
      <svg
        className={styles['collaborate-section__icon']}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M 4 4 C 2.9069372 4 2 4.9069372 2 6 L 2 18 C 2 19.093063 2.9069372 20 4 20 L 20 20 C 21.093063 20 22 19.093063 22 18 L 22 6 C 22 4.9069372 21.093063 4 20 4 L 4 4 z M 4 6 L 20 6 L 20 18 L 4 18 L 4 6 z M 14.5 11 L 11 15 L 8.5 12.5 L 5.7773438 16 L 18.25 16 L 14.5 11 z"></path>
      </svg>
      <h3 className={styles['collaborate-section__title']}>Dashboards & Data</h3>
      <p className={styles['collaborate-section__description']}>
        Building dashboards with clear data visualization, process automation, and decision-making insights.
      </p>
    </>
  );
};

export default ServiceItem;
