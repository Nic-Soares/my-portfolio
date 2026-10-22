import { useI18n } from "@/i18n/I18nProvider.tsx";
import { DESTINATIONS } from "../navigation/destinations.ts";
import { NavItem } from "../navigation/NavigationRail/NavItem.tsx";
import styles from "./NavigationBar.module.css";

// Bottom navigation bar for Compact/Medium (Figma "Navigation Bar: Vertical
// items"). Same destinations and nav item as the rail.
export default function NavigationBar() {
  const { t } = useI18n();
  return (
    <nav aria-label={t.layout.mainNav} className={styles.bar}>
      {DESTINATIONS.map((destination) => (
        <NavItem
          key={destination.path}
          icon={destination.icon}
          label={t.layout.nav[destination.label]}
          to={destination.path}
        />
      ))}
    </nav>
  );
}
