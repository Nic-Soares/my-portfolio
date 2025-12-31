import React from "react";
import styles from "./Container.module.css"

type Props = {
  container_title: string
  container_description: string
};

const Container = ({ container_title, container_description }: Props) => {
  return (
    <div className={styles["container"]}>
      <h1 className="container__title">{container_title}</h1>
      <p className="container__description">{container_description}</p>
    </div>
  );
};

export default Container;