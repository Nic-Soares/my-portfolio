import styles from './NavigationRail.module.css';
import type { ReactNode } from 'react';

interface NavigationRailProps {
  children: ReactNode;
  className?: string;
}

export default function NavigationRail({ children, className }: NavigationRailProps) {
  return (
    <div className={`${styles['nav-rail']} ${className || ''}`}>
      {children}
    </div>
  );
}
