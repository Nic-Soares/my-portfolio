import React, { ReactNode, useState } from "react";
import styles from "./TabItem.module.css";

type TabSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
type TabStyle = "filled" | "tonal" | "outline" | "text" | "elevated";
type TabWidth = "narrow" | "default" | "wide";

interface TabItemProps {
  size?: TabSize;
  style?: TabStyle;
  width?: TabWidth;
  label?: string;
  icon?: string | ReactNode;
  selectedIcon?: string | ReactNode;
  onClick?: (selected?: boolean) => void;
  disabled?: boolean;
  selected?: boolean;
  toggleable?: boolean;
  children?: ReactNode;
  visible?: boolean;
  interactive?: boolean;
  grouped?: boolean;
}

/**
 * TabItem
 *
 * - Tabs are always rounded (this component forces the `round` class internally).
 * - Active / click effects only affect the state-layer background (handled in CSS).
 * - Accepts similar props to Button but shape is fixed to rounded-only.
 */
const TabItem = ({
  size = "xsmall",
  style = "filled",
  width = "default",
  icon = undefined,
  label,
  selectedIcon,
  onClick,
  disabled = false,
  selected: externalSelected,
  toggleable = false,
  children,
  visible = true,
  interactive = true,
  grouped = false,
}: TabItemProps) => {
  // Internal state for toggleable mode when not controlled externally
  const [internalSelected, setInternalSelected] = useState(false);

  if (!visible) return null;

  const isSelected =
    externalSelected !== undefined
      ? externalSelected
      : toggleable
        ? internalSelected
        : false;

  const isInteractive = interactive && !disabled;

  const className = [
    styles["tab"],

    styles[`tab--${size}`],
    styles[`tab--${style}`],
    styles[`tab--${width}`],
    grouped ? styles["tab--grouped"] : "",
    isSelected ? styles["tab--selected"] : "",
    !isInteractive ? styles["tab--noninteractive"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderIcon = () => {
    const iconName = isSelected && selectedIcon ? selectedIcon : icon;
    if (!iconName) return null;

    if (typeof iconName === "string") {
      return <span className="material-symbols-outlined">{iconName}</span>;
    }
    return iconName;
  };

  const handleClick = () => {
    if (!isInteractive) return;

    if (toggleable && externalSelected === undefined) {
      const newState = !internalSelected;
      setInternalSelected(newState);
      onClick?.(newState);
    } else {
      onClick?.(isSelected);
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={disabled}
      tabIndex={isInteractive ? 0 : -1}
      aria-disabled={!isInteractive}
      type="button"
    >
      <div className={styles["tab__content"]}>
        <div className={styles["tab__state-layer"]}>
          {renderIcon()}
          {label && <p className={styles["tab__label"]}>{label}</p>}
          {children}
        </div>
      </div>
    </button>
  );
};

export default TabItem;
