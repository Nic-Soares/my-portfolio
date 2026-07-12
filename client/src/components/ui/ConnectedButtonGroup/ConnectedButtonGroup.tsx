import Button from "../Button/Button.tsx";
import styles from "./ConnectedButtonGroup.module.css";
import type { ReactNode } from "react";
import { useState } from "react";

type SizeOption = "xsmall" | "small" | "medium" | "large" | "xlarge";

interface ButtonOption {
  label: string;
  icon?: string | ReactNode;
  selectedIcon?: string | ReactNode;
  disabled?: boolean;
}

interface ConnectedButtonGroupProps {
  className?: string;
  size?: SizeOption;
  style?: 'filled' | 'tonal' | 'outline' | 'text' | 'elevated';
  options: ButtonOption[];
  selectedIndex?: number;
  onSelectionChange?: (index: number) => void;
  allowDeselect?: boolean;
  selectable?: boolean;
  interactive?: boolean;
}

const ConnectedButtonGroup = ({
  className = "",
  size = "small",
  style = "tonal",
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
    if (displayedOptions[index]?.disabled || !selectable) {
      return;
    }

    const newIndex = allowDeselect && selectedIndex === index ? -1 : index;

    if (controlledSelectedIndex === undefined) {
      setInternalSelectedIndex(newIndex);
    }
    onSelectionChange?.(newIndex);
  };

  return (
    <div
      className={`${styles["connected-button-group"]} ${styles[size]} ${className}`}
    >
      {displayedOptions.map((option, idx) => {
        const isSelected = selectedIndex === idx;
        const iconToUse = isSelected && option.selectedIcon ? option.selectedIcon : option.icon;
        
        return (
          <Button
            key={idx}
            label={option.label}
            icon={iconToUse}
            selected={isSelected}
            disabled={option.disabled}
            onClick={() => handleButtonClick(idx)}
            size={size}
            style={style}
            interactive={interactive && selectable}
            type="square"
            grouped={true}
          />
        );
      })}
    </div>
  );
};

export default ConnectedButtonGroup;
