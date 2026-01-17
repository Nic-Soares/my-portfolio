import styles from "./Sidebar.module.css";
import NavigationRail from "../navigation/navigation-rail/NavigationRail";
import { NavItem } from "../navigation/navigation-rail/NavItem";
import type { SidebarProps } from "@/types";
import IconButton from "@/components/ui/IconButton/IconButton";

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <NavigationRail>
        <NavItem
          icon="home"
          label="Home"
          selected={activePage === "Home"}
          onClick={() => setActivePage("Home")}
        />
        <NavItem
          icon="folder"
          label="Projects"
          selected={activePage === "Projects"}
          onClick={() => setActivePage("Projects")}
        />
        <NavItem
          icon="description"
          label="Project Detail"
          selected={activePage === "ProjectDetail"}
          onClick={() => setActivePage("ProjectDetail")}
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
