import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "./TabbedNavigation.module.css";
import TabItem from "./TabItem";

type TabData = {
  id: string;
  label?: string;
  icon?: string;
  selectedIcon?: string;
  disabled?: boolean;
  toggleable?: boolean;
  visible?: boolean;
};

type Props = {
  tabs?: TabData[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  buttonSize?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  buttonStyle?: "filled" | "tonal" | "outline" | "text" | "elevated";
  buttonWidth?: "narrow" | "default" | "wide";
};

const MIN_VISIBLE_TABS = 2;
const MAX_VISIBLE_TABS = 5;

function makePlaceholder(index: number): TabData {
  return {
    id: `__placeholder_${Date.now()}_${index}`,
    label: "",
    disabled: true,
    visible: true,
  };
}

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
  const normalizedTabs = useMemo<TabData[]>(() => {
    const provided = Array.isArray(tabs) ? tabs.slice() : [];
    const visible = provided.filter((t) => t.visible !== false);

    // Trim if too many visible
    if (visible.length > MAX_VISIBLE_TABS) {
      const result: TabData[] = [];
      let visibleCount = 0;
      for (const t of provided) {
        if (t.visible === false) {
          result.push(t);
          continue;
        }
        if (visibleCount < MAX_VISIBLE_TABS) {
          result.push(t);
          visibleCount++;
        } else {
          // skip
        }
      }
      const trimmedIds = visible.slice(MAX_VISIBLE_TABS).map((t) => t.id);
      console.warn(
        `[TabbedNavigation] More than ${MAX_VISIBLE_TABS} visible tabs provided. Trimming: ${trimmedIds.join(
          ", ",
        )}`,
      );
      return result;
    }

    // Append placeholders if too few visible
    if (visible.length < MIN_VISIBLE_TABS) {
      const needed = MIN_VISIBLE_TABS - visible.length;
      const result = provided.slice();
      for (let i = 0; i < needed; i++) {
        result.push(makePlaceholder(i));
      }
      console.warn(
        `[TabbedNavigation] Fewer than ${MIN_VISIBLE_TABS} visible tabs provided. Appended ${needed} placeholder(s).`,
      );
      return result;
    }

    return provided;
  }, [tabs]);

  // Only render tabs that are visible
  const renderTabs = useMemo(
    () => normalizedTabs.filter((t) => t.visible !== false),
    [normalizedTabs],
  );

  const isControlled = selectedId !== undefined;

  const [internalSelectedId, setInternalSelectedId] = useState<
    string | undefined
  >(() => {
    if (isControlled) return selectedId;
    return renderTabs[0]?.id;
  });

  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const currentSelectedId = isControlled ? selectedId : internalSelectedId;

  // Keep internal selected id valid if renderTabs changes (uncontrolled mode)
  useEffect(() => {
    if (isControlled) return;
    if (!renderTabs.length) {
      setInternalSelectedId(undefined);
      return;
    }
    const exists = renderTabs.some((t) => t.id === internalSelectedId);
    if (!exists) {
      setInternalSelectedId(renderTabs[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderTabs, isControlled]);

  // Detect sticky state using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [1] },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (tab: TabData) => {
    if (tab.disabled) return;

    // toggleable behavior: in uncontrolled mode, clicking the same selected tab toggles off
    if (tab.toggleable && currentSelectedId === tab.id) {
      if (!isControlled) setInternalSelectedId(undefined);
      onSelect?.(tab.id);
      return;
    }

    if (!isControlled) setInternalSelectedId(tab.id);
    onSelect?.(tab.id);
  };

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
