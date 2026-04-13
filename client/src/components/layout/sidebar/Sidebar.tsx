import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import NavigationRail from "../navigation/NavigationRail/NavigationRail";
import { NavItem } from "../navigation/NavigationRail/NavItem";
import IconButton from "@/components/ui/IconButton/IconButton";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

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
          toggleable={true}
          icon="dark_mode"
          selectedIcon="light_mode"
        />
      </NavigationRail>
    </aside>
  );
}

export default Sidebar;
