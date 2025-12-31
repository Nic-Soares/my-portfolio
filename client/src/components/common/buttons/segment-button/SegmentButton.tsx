import styles from "./SegmentButton.module.css";
import { ReactNode } from "react";

interface SegmentButtonProps {
  selected?: boolean;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  /**
   * When interactive is false the button becomes purely visual:
   * - it won't respond to click events
   * - it won't be focusable via keyboard (tabIndex = -1)
   * - it will expose aria-disabled
   */
  interactive?: boolean;
}

const SegmentButton = ({
  selected = false,
  label,
  icon,
  onClick,
  disabled = false,
  size = "small",
  interactive = true,
}: SegmentButtonProps) => {
  // If either disabled or interactive === false, we treat the element as non-interactive
  const isInteractive = interactive && !disabled;

  return (
    <button
      className={`
        ${styles["segment"]}
        ${selected ? styles["selected"] : ""}
        ${!isInteractive ? styles["noninteractive"] : ""}
      `}
      onClick={isInteractive ? onClick : undefined}
      disabled={disabled}
      tabIndex={isInteractive ? 0 : -1}
      aria-disabled={!isInteractive}
    >
      <div className={`${styles["state-layer"]} ${styles[size]}`}>
        {icon && (
          <div
            className={`${styles["icon"]} ${styles[size]} ${selected ? styles["selected"] : ""} ${!isInteractive ? styles["state-disabled"] : ""}`}
          >
            {icon}
          </div>
        )}
        <p
          className={`${styles["label"]} ${styles[size]} ${selected ? styles["selected"] : ""}`}
        >
          {label}
        </p>
      </div>
    </button>
  );
};

export default SegmentButton;
