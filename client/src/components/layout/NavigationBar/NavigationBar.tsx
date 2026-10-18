import { DESTINATIONS } from "../navigation/destinations.ts";
import { NavItem } from "../navigation/NavigationRail/NavItem.tsx";
import styles from "./NavigationBar.module.css";

// Bottom navigation bar for Compact/Medium (Figma "Navigation Bar: Vertical
// items"). Same destinations and nav item as the rail.
export default function NavigationBar() {
  return (
    <nav aria-label="Main" className={styles.bar}>
      {DESTINATIONS.map((destination) => (
        <NavItem
          key={destination.path}
          icon={destination.icon}
          label={destination.label}
          to={destination.path}
        />
      ))}
    </nav>
  );
}
