import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

export interface NavItemProps {
  icon: string;
  label: string;
  to: string;
}

// M3 "Vertical nav item": a 56x32 indicator pill above a label. NavLink sets
// aria-current="page" on the active destination.
export const NavItem = ({ icon, label, to }: NavItemProps) => (
  <NavLink
    to={to}
    end={to === "/"}
    className={({ isActive }) =>
      `${styles["nav-item"]} ${isActive ? styles["nav-item--selected"] : ""}`
    }
  >
    <span className={styles["nav-item__indicator"]}>
      <span
        className={`material-symbols-outlined ${styles["nav-item__icon"]}`}
        aria-hidden="true"
      >
        {icon}
      </span>
    </span>
    <span className={styles["nav-item__label"]}>{label}</span>
  </NavLink>
);
