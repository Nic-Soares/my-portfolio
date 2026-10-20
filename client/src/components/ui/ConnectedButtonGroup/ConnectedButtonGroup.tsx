import type { ReactNode } from "react";
import { useState } from "react";
import Button from "../Button/Button.tsx";
import styles from "./ConnectedButtonGroup.module.css";

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
  style?: "filled" | "tonal" | "outline" | "text" | "elevated";
  options: ButtonOption[];
  // "single" (default): one segment at a time, via selectedIndex.
  // "multiple": any number of segments, via selectedIndices.
  selectionMode?: "single" | "multiple";
  selectedIndex?: number;
  onSelectionChange?: (index: number) => void;
  selectedIndices?: number[];
  onSelectedIndicesChange?: (indices: number[]) => void;
  allowDeselect?: boolean;
  selectable?: boolean;
  interactive?: boolean;
}

const ConnectedButtonGroup = ({
  className = "",
  size = "small",
  style = "tonal",
  options,
  selectionMode = "single",
  selectedIndex: controlledSelectedIndex,
  onSelectionChange,
  selectedIndices: controlledSelectedIndices,
  onSelectedIndicesChange,
  allowDeselect = true,
  selectable = true,
  interactive = true,
}: ConnectedButtonGroupProps) => {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(-1);
  const [internalSelectedIndices, setInternalSelectedIndices] = useState<
    number[]
  >([]);
  const multiple = selectionMode === "multiple";

  // Use controlled or uncontrolled state
  const selectedIndex =
    controlledSelectedIndex !== undefined
      ? controlledSelectedIndex
      : internalSelectedIndex;
  const selectedIndices = controlledSelectedIndices ?? internalSelectedIndices;

  // Keep between 2 and 5 segments
  const count = Math.max(2, Math.min(options.length, 5));
  const displayedOptions = options.slice(0, count);

  const handleButtonClick = (index: number) => {
    if (displayedOptions[index]?.disabled || !selectable) {
      return;
    }

    if (multiple) {
      const isOn = selectedIndices.includes(index);
      // allowDeselect=false keeps at least one segment selected
      if (isOn && !allowDeselect && selectedIndices.length === 1) return;
      const next = isOn
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index].sort((a, b) => a - b);
      if (controlledSelectedIndices === undefined) {
        setInternalSelectedIndices(next);
      }
      onSelectedIndicesChange?.(next);
      return;
    }

    const newIndex = allowDeselect && selectedIndex === index ? -1 : index;

    if (controlledSelectedIndex === undefined) {
      setInternalSelectedIndex(newIndex);
    }
    onSelectionChange?.(newIndex);
  };

  return (
    <div className={`${styles["connected-button-group"]} ${className}`}>
      {displayedOptions.map((option, idx) => {
        const isSelected = multiple
          ? selectedIndices.includes(idx)
          : selectedIndex === idx;
        const iconToUse =
          isSelected && option.selectedIcon ? option.selectedIcon : option.icon;

        return (
          <Button
            key={idx}
            label={option.label}
            icon={iconToUse ?? null}
            selected={isSelected}
            ariaPressed={selectable ? isSelected : undefined}
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
