import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
      <h1 className={styles['not-found__title']}>404 - Page Not Found</h1>
      <p className={styles['not-found__message']}>
        Oops! The page you are looking for does not exist.
      </p>
      <a href="/" className={styles['not-found__link']}>
        Go back to the homepage
      </a>
    </div>
  );
};

export default NotFound;
