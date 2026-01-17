import type { FC } from "react";
import styles from "./TabbedNavigation.module.css";

interface TabOption {
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface TabNavigationProps {
  options: TabOption[];
  selectedIndex: number;
  onSelectionChange: (index: number) => void;
  className?: string;
}

const TabbedNavigation: FC<TabNavigationProps> = ({
  options,
  selectedIndex,
  onSelectionChange,
  className = "",
}) => {
  if (!options || options.length === 0) return null;

  return (
    <nav
      className={`${styles.nav} ${className}`}
      role="tablist"
      aria-label="Tabbed navigation"
    >
      {options.map((opt, idx) => {
        const isSelected = idx === selectedIndex;
        const handleClick = () => {
          if (!opt.disabled) onSelectionChange(idx);
        };

        return (
          <button
            key={idx}
            role="tab"
            aria-selected={isSelected}
            aria-disabled={opt.disabled || false}
            className={[
              styles.tab,
              isSelected ? styles["tab--active"] : "",
              opt.disabled ? styles["tab--disabled"] : "",
            ].join(" ")}
            onClick={handleClick}
            tabIndex={isSelected ? 0 : -1}
            disabled={opt.disabled}
          >
            {opt.icon && (
              <span className={`${styles.icon} material-symbols-outlined`}>
                {opt.icon}
              </span>
            )}
            <span className={styles.label}>{opt.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default TabbedNavigation;
