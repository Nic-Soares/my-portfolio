import styles from './UnderConstruction.module.css';

const UnderConstruction = () => {
  return (
    <div className={styles['under-construction']}>
      <div className={styles['under-construction__icon']}>🚧</div>
      <h1 className={styles['under-construction__title']}>Page Under Construction</h1>
      <p className={styles['under-construction__message']}>
        This page is currently being developed. Please check back later!
      </p>
    </div>
  );
};

export default UnderConstruction;
