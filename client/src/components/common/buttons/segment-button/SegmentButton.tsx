import React, { ReactNode } from 'react';
import styles from './SegmentButton.module.css';

interface SegmentButtonProps {
  selected?: boolean;
  label: string;
  icon?: string;
  selectedIcon?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  interactive?: boolean;
  children?: ReactNode;
}

const SegmentButton = ({
  selected = false,
  label,
  icon,
  selectedIcon,
  onClick,
  disabled = false,
  size = 'small',
  interactive = true,
  children,
}: SegmentButtonProps) => {
  const isInteractive = interactive && !disabled;

  const className = [
    styles['segment'],
    styles[`segment--${size}`],
    selected ? styles['segment--selected'] : '',
    !isInteractive ? styles['segment--noninteractive'] : ''
  ].join(' ');

  const renderIcon = () => {
    const iconName = selected && selectedIcon ? selectedIcon : icon;
    if (iconName) {
      return (
        <span className="material-symbols-outlined">
          {iconName}
        </span>
      );
    }
    return null;
  };

  return (
    <button
      className={className}
      onClick={isInteractive ? onClick : undefined}
      disabled={disabled}
      tabIndex={isInteractive ? 0 : -1}
      aria-disabled={!isInteractive}
    >
      <div className={styles['segment__content']}>
        <div className={styles['segment__state-layer']}>
          {renderIcon()}
          <p className={styles['segment__label']}>{label}</p>
          {children}
        </div>
      </div>
    </button>
  );
};

export default SegmentButton;