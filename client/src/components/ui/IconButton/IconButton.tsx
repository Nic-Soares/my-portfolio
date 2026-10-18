import { type ReactNode, useState } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  type?: "round" | "square";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  style?: "filled" | "tonal" | "outline" | "standard";
  width?: "narrow" | "default" | "wide";
  icon?: string; // Material Symbols icon name
  selectedIcon?: string; // icon shown when selected (optional)
  onClick?: (selected?: boolean) => void;
  disabled?: boolean;
  selected?: boolean;
  toggleable?: boolean;
  ariaLabel?: string; // required when the button only shows an icon
  ariaPressed?: boolean; // for toggle buttons whose state is controlled by the parent
  children?: ReactNode; // fallback: custom SVG or content
}

const IconButton = ({
  type = "round",
  size = "medium",
  style = "filled",
  width = "default",
  icon,
  selectedIcon,
  onClick,
  disabled = false,
  selected: initialSelected = false,
  toggleable = false,
  ariaLabel,
  ariaPressed,
  children,
}: IconButtonProps) => {
  const [internalSelected, setInternalSelected] = useState(initialSelected);

  // Toggleable buttons keep their own state; otherwise the prop drives it
  const isSelected = toggleable ? internalSelected : initialSelected;

  const className = [
    styles["icon-button"],
    styles[`icon-button--${type}`],
    styles[`icon-button--${size}`],
    styles[`icon-button--${style}`],
    width !== "default" ? styles[`icon-button--${width}`] : "",
    isSelected ? styles["icon-button--selected"] : "",
  ].join(" ");

  // Render the Material Symbols icon when given, otherwise children (SVG)
  const renderIcon = () => {
    const iconName = isSelected && selectedIcon ? selectedIcon : icon;

    if (iconName) {
      return <span className="material-symbols-outlined">{iconName}</span>;
    }

    return children;
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed ?? (toggleable ? internalSelected : undefined)}
      onClick={() => {
        if (disabled) return;

        if (toggleable) {
          const newState = !internalSelected;
          setInternalSelected(newState);
          onClick?.(newState);
        } else {
          onClick?.(isSelected);
        }
      }}
      disabled={disabled}
    >
      <div className={styles["icon-button__content"]}>
        <div className={styles["icon-button__state-layer"]}>{renderIcon()}</div>
      </div>
    </button>
  );
};

export default IconButton;
