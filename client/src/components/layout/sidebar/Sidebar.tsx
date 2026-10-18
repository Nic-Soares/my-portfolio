import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/app/theme/ThemeProvider.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import { NavItem } from "../navigation/NavigationRail/NavItem.tsx";
import NavigationRail from "../navigation/NavigationRail/NavigationRail.tsx";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const isHome = location.pathname === "/";
  const isProjects = location.pathname.startsWith("/projects");

  return (
    <aside className={styles.sidebar}>
      <NavigationRail>
        <NavItem
          icon="home"
          label="Home"
          selected={isHome}
          onClick={() => navigate("/")}
        />
        <NavItem
          icon="folder"
          label="Projects"
          selected={isProjects}
          onClick={() => navigate("/projects")}
        />
      </NavigationRail>
      <NavigationRail className={styles["nav-footer"]}>
        <IconButton
          type="round"
          size="medium"
          style="outline"
          width="default"
          toggleable={true}
          icon="settings"
        />
        <IconButton
          type="round"
          size="medium"
          style="outline"
          width="default"
          icon="dark_mode"
          selectedIcon="light_mode"
          selected={isDark}
          ariaLabel="Dark theme"
          ariaPressed={isDark}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        />
      </NavigationRail>
    </aside>
  );
}

export default Sidebar;
