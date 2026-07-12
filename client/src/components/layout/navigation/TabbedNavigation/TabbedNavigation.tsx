import React, { useMemo } from "react";
import styles from "./TabbedNavigation.module.css";
import TabItem from "./TabItem.tsx";
import {
  TabData,
  normalizeTabs,
  getVisibleTabs,
} from "./TabbedNavigation.utils.ts";
import { useTabbedNavigation } from "./useTabbedNavigation.ts";

type Props = {
  tabs?: TabData[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  buttonSize?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  buttonStyle?: "filled" | "tonal" | "outline" | "text" | "elevated";
  buttonWidth?: "narrow" | "default" | "wide";
};

/**
 * TabbedNavigation
 *
 * - Uses the CSS module's `nav` and `navigation-container` classes.
 * - Adds an inner container (styles.container) for the actual tab layout.
 * - Enforces between 2 and 5 visible tabs (appends placeholders or trims extras).
 * - Supports controlled (`selectedId`) and uncontrolled usage.
 */
const TabbedNavigation: React.FC<Props> = ({
  tabs = [],
  selectedId,
  onSelect,
  className = "",
  buttonSize = "xsmall",
  buttonStyle = "filled",
  buttonWidth = "default",
}) => {
  // Normalize tabs to respect visibility bounds (but keep invisible items where provided).
  const normalizedTabs = useMemo(() => normalizeTabs(tabs), [tabs]);

  // Only render tabs that are visible
  const renderTabs = useMemo(
    () => getVisibleTabs(normalizedTabs),
    [normalizedTabs],
  );

  const { currentSelectedId, isSticky, navRef, sentinelRef, handleClick } =
    useTabbedNavigation({
      renderTabs,
      selectedId,
      onSelect,
    });

  if (!renderTabs.length) return null;

  return (
    <>
      {/* Sentinel element to detect when nav becomes sticky */}
      <div ref={sentinelRef} style={{ height: "1px", marginTop: "-1px" }} />

      <nav
        ref={navRef}
        className={`${styles["nav"]} ${isSticky ? styles["nav--sticky"] : ""} ${className}`.trim()}
        aria-label="Tabbed navigation"
      >
        {/* Use the provided navigation-container styles */}
        <div
          className={`${styles["navigation-container"]} ${isSticky ? styles["navigation-container--compact"] : ""}`}
        >
          {/* Inner container dedicated to the tab layout */}
          <div className={styles["tabbed-navigation"]}>
            {renderTabs.map((tab) => {
              const isSelected = currentSelectedId === tab.id;
              return (
                <div className={styles["tab"]} key={tab.id}>
                  <TabItem
                    label={tab.label}
                    icon={tab.icon}
                    selectedIcon={tab.selectedIcon}
                    disabled={tab.disabled}
                    selected={isSelected}
                    toggleable={!!tab.toggleable}
                    size={buttonSize}
                    style={buttonStyle}
                    width={buttonWidth}
                    onClick={() => handleClick(tab)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TabbedNavigation;
