import React from 'react';
import styles from './TabbedNavigation.module.css';

interface TabOption {
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface TabNavigationProps {
  options: TabOption[];
  selectedIndex: number;
  onSelectionChange: (index: number) => void;
  className?: string;
}

const TabbedNavigation: React.FC<TabNavigationProps> = ({
  options,
  selectedIndex,
  onSelectionChange,
  className = '',
}) => {
  return (
    <nav className={`${styles.nav} ${className}`}>

    </nav>
  );
};

export default TabbedNavigation;
