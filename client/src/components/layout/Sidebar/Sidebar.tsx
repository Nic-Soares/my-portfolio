import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import { DESTINATIONS } from "../navigation/destinations.ts";
import Logo from "../navigation/Logo/Logo.tsx";
import { LanguageAction, ThemeAction } from "../navigation/NavActions.tsx";
import { NavItem } from "../navigation/NavigationRail/NavItem.tsx";
import styles from "./Sidebar.module.css";

// Navigation Rail (Large and up), mirroring the Figma "Navigation Rail".
// Below Large the TopAppBar + NavigationBar take over (CSS only).
function Sidebar() {
  const { t } = useI18n();
  return (
    <aside className={styles.rail}>
      <Link to="/" className={styles.logo} aria-label={t.layout.home}>
        <Logo />
      </Link>
      <nav aria-label={t.layout.mainNav} className={styles.destinations}>
        {DESTINATIONS.map((destination) => (
          <NavItem
            key={destination.path}
            icon={destination.icon}
            label={t.layout.nav[destination.label]}
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
