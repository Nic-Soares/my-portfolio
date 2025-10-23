import SegmentButton from '../buttons/segment-button/SegmentButton';
import styles from './ConnectedButtonGroup.module.css'
import type { ReactNode } from "react";
import { useState } from 'react';

type SizeOption = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

interface ButtonOption {
  label: string;
  icon?: ReactNode;
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
}

const ConnectedButtonGroup = ({
  className = '',
  size = 'small',
  options,
  selectedIndex: controlledSelectedIndex,
  onSelectionChange,
  allowDeselect = true,
  selectable = true,
}: ConnectedButtonGroupProps) => {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(-1);

  // Use controlled or uncontrolled state
  const selectedIndex = controlledSelectedIndex !== undefined
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

  return (
    <div className={`${styles['connected-button-group']} ${styles[size]} ${className}`}>
      {displayedOptions.map((option, idx) => (
        <SegmentButton
          key={idx}
          label={option.label}
          icon={option.icon}
          selected={selectedIndex === idx}
          disabled={option.disabled}
          onClick={() => handleButtonClick(idx)}
          size={size}
        />
      ))}
    </div>
  );
};

export default ConnectedButtonGroup;
