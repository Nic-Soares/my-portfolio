import { Link } from "react-router-dom";
import { useTheme } from "@/app/theme/ThemeProvider.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import { DESTINATIONS } from "../navigation/destinations.ts";
import Logo from "../navigation/Logo/Logo.tsx";
import { NavItem } from "../navigation/NavigationRail/NavItem.tsx";
import styles from "./Sidebar.module.css";

// Navigation Rail (Large and up), mirroring the Figma "Navigation Rail".
function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
        {/* Language switching arrives with i18n (EP-11) */}
        <IconButton
          type="round"
          size="medium"
          style="outline"
          icon="translate"
          disabled
          ariaLabel="Language (coming soon)"
        />
        <IconButton
          type="round"
          size="medium"
          style="outline"
          icon="dark_mode"
          selectedIcon="light_mode"
          selected={isDark}
          ariaLabel="Dark theme"
          ariaPressed={isDark}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
