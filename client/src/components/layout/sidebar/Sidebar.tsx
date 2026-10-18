import { Link } from "react-router-dom";
import { DESTINATIONS } from "../navigation/destinations.ts";
import Logo from "../navigation/Logo/Logo.tsx";
import { LanguageAction, ThemeAction } from "../navigation/NavActions.tsx";
import { NavItem } from "../navigation/NavigationRail/NavItem.tsx";
import styles from "./Sidebar.module.css";

// Navigation Rail (Large and up), mirroring the Figma "Navigation Rail".
// Below Large the TopAppBar + NavigationBar take over (CSS only).
function Sidebar() {
  return (
    <aside className={styles.rail}>
      <Link to="/" className={styles.logo} aria-label="Home">
        <Logo />
      </Link>
      <nav aria-label="Main" className={styles.destinations}>
        {DESTINATIONS.map((destination) => (
          <NavItem
            key={destination.path}
            icon={destination.icon}
            label={destination.label}
            to={destination.path}
          />
        ))}
      </nav>
      <div className={styles.actions}>
        <LanguageAction />
        <ThemeAction />
      </div>
    </aside>
  );
}

export default Sidebar;
