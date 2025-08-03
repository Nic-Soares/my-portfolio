import styles from './SegmentButton.module.css';
import { ReactNode } from 'react';

interface SegmentButtonProps {
  selected?: boolean;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

const SegmentButton = ({ selected = false, label, icon, onClick, disabled = false, size = 'small' }: SegmentButtonProps) => {
  return (
    <button
      className={`
        ${styles['segment']}
        ${selected ? styles['selected'] : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={`${styles['state-layer']} ${styles[size]}`}>
        {icon && (
          <div className={`${styles['icon']} ${styles[size]} ${selected ? styles['selected'] : ''}`}>
            {icon}
          </div>
        )}
        <p className={`${styles['label']} ${styles[size]} ${selected ? styles['selected'] : ''}`}>
          {label}
        </p>
      </div>
    </button>
  );
};

export default SegmentButton;
