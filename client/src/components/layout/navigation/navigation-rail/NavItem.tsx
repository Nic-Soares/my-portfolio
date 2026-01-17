import styles from "./NavItem.module.css";

export interface NavItemProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const NavItem = ({
  icon,
  label,
  selected,
  onClick,
  disabled,
}: NavItemProps) => {
  return (
    <button
      className={`${styles["nav-item"]} ${selected ? styles["nav-item--selected"] : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles["nav-item__icon-container"]}>
        <div className={styles["nav-item__state-layer"]}>
          <span
            className={`material-symbols-outlined ${styles["nav-item__icon"]}`}
          >
            {icon}
          </span>
        </div>
      </div>

      <span className={styles["nav-item__label"]}>{label}</span>
    </button>
  );
};
