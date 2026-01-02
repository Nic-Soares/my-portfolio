import SegmentButton from "../buttons/segment-button/SegmentButton";
import styles from "./ConnectedButtonGroup.module.css";
import type { ReactNode } from "react";
import { useState } from "react";

type SizeOption = "xsmall" | "small" | "medium" | "large" | "xlarge";

// ButtonOption now supports icon as either a material symbol name string or a ReactNode.
// It also supports an optional selectedIcon to show when the option is selected.
interface ButtonOption {
  label: string;
  // icon can be a string (material symbol name) or a ReactNode (SVG/component)
  icon?: string | ReactNode;
  // optional alternative icon to display when selected
  selectedIcon?: string | ReactNode;
  disabled?: boolean;
}

interface ConnectedButtonGroupProps {
  className?: string;
  size?: SizeOption;
  options: ButtonOption[];
  selectedIndex?: number;
  onSelectionChange?: (index: number) => void;
  allowDeselect?: boolean;
  selectable?: boolean;
  // When interactive is false, the buttons are visual-only (not focusable/clickable)
  interactive?: boolean;
}

const ConnectedButtonGroup = ({
  className = "",
  size = "small",
  options,
  selectedIndex: controlledSelectedIndex,
  onSelectionChange,
  allowDeselect = true,
  selectable = true,
  interactive = true,
}: ConnectedButtonGroupProps) => {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(-1);

  // Use controlled or uncontrolled state
  const selectedIndex =
    controlledSelectedIndex !== undefined
      ? controlledSelectedIndex
      : internalSelectedIndex;

  // Garante que o número de botões esteja entre 2 e 5
  const count = Math.max(2, Math.min(options.length, 5));
  const displayedOptions = options.slice(0, count);

  const handleButtonClick = (index: number) => {
    // Don't change selection if button is disabled or selection is disabled
    if (displayedOptions[index]?.disabled || !selectable) {
      return;
    }

    // If allowDeselect is true and clicking the same button, deselect it
    const newIndex = allowDeselect && selectedIndex === index ? -1 : index;

    if (controlledSelectedIndex === undefined) {
      setInternalSelectedIndex(newIndex);
    }
    onSelectionChange?.(newIndex);
  };

  // Helper to render an option's icon. Supports:
  // - string (material symbol name) => renders <span className="material-symbols-outlined">name</span>
  // - ReactNode => rendered as-is (custom SVG/component)
  // - undefined/null => no icon rendered (icon-less button)
  const renderOptionIcon = (option: ButtonOption, isSelected: boolean) => {
    const chosen =
      isSelected && option.selectedIcon ? option.selectedIcon : option.icon;

    if (!chosen) return undefined;

    if (typeof chosen === "string") {
      return <span className="material-symbols-outlined">{chosen}</span>;
    }
    return chosen;
  };

  return (
    <div
      className={`${styles["connected-button-group"]} ${styles[size]} ${className}`}
    >
      {displayedOptions.map((option, idx) => {
        const isSelected = selectedIndex === idx;
        return (
          <SegmentButton
            key={idx}
            label={option.label}
            icon={renderOptionIcon(option, isSelected)}
            selected={isSelected}
            disabled={option.disabled}
            onClick={() => handleButtonClick(idx)}
            size={size}
            interactive={interactive && selectable}
          />
        );
      })}
    </div>
  );
};

export default ConnectedButtonGroup;
