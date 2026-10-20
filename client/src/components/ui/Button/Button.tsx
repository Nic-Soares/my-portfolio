import { type ReactNode, useState } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "round" | "square";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  style?: "filled" | "tonal" | "outline" | "text" | "elevated";
  width?: "narrow" | "default" | "wide";
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
  ariaPressed?: boolean; // toggle state for assistive tech (button groups)
}

const Button = ({
  type = "round",
  size = "xsmall",
  style = "filled",
  width = "default",
  icon = "stars",
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
  ariaPressed,
}: ButtonProps) => {
  // Use internal state only when toggleable and selected is uncontrolled.
  const [internalSelected, setInternalSelected] = useState(false);

  // Prefer an explicit selected value; otherwise use internal state when toggleable.
  const isSelected =
    externalSelected !== undefined
      ? externalSelected
      : toggleable
        ? internalSelected
        : false;
  const isInteractive = interactive && !disabled;

  if (!visible) return null;

  const className = [
    styles["button"],
    styles[`button--${type}`],
    styles[`button--${size}`],
    styles[`button--${style}`],
    styles[`button--${width}`],
    grouped ? styles["button--grouped"] : "",
    isSelected ? styles["button--selected"] : "",
    !isInteractive ? styles["button--noninteractive"] : "",
  ].join(" ");

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
      // Toggleable mode with internal state.
      const newState = !internalSelected;
      setInternalSelected(newState);
      onClick?.(newState);
    } else {
      // Controlled or non-toggleable mode.
      onClick?.(isSelected);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled}
      tabIndex={isInteractive ? 0 : -1}
      aria-disabled={!isInteractive}
      aria-pressed={ariaPressed}
    >
      <div className={styles["button__content"]}>
        <div className={styles["button__state-layer"]}>
          {renderIcon()}
          {label && <p className={styles["button__label"]}>{label}</p>}
          {children}
        </div>
      </div>
    </button>
  );
};

export default Button;
