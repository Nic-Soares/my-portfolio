import type React from "react";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found__title"]}>
        404 — Page not found
      </h1>
      <p className={styles["not-found__message"]}>
        Oops! The page you are looking for does not exist.
      </p>
      <a href="/" className={styles["not-found__link"]}>
        Return to the home page
      </a>
    </div>
  );
};

export default NotFound;
