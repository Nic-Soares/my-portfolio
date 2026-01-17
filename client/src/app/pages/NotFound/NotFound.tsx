import React from "react";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found__title"]}>
        404 — Página não encontrada
      </h1>
      <p className={styles["not-found__message"]}>
        Oops! A página que você procura não existe.
      </p>
      <a href="/" className={styles["not-found__link"]}>
        Voltar para a página inicial
      </a>
    </div>
  );
};

export default NotFound;
