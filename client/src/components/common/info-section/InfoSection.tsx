import styles from "./InfoSection.module.css";

type Props = {
  container_title: string;
  container_description: string;
  size?: "default" | "sm" | "md";
  showDate?: boolean;
  date?: string;
};

const InfoSection = ({
  container_title,
  container_description,
  size = "default",
  showDate = false,
  date,
}: Props) => {
  const wrapperClasses = [
    styles.wrapper,
    size === "sm" && styles.wrapperSm,
    size === "md" && styles.wrapperMd,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles["container"]}>
      <div className={wrapperClasses}>
        {showDate && date && <div className={styles.date}>{date}</div>}
        <div className={styles.title}>
          <h1 className="display-large">{container_title}</h1>
          <p className={styles.description}>{container_description}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
