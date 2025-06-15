import styles from './NavRail.module.css'
import type { ReactNode } from 'react';

type NavigationRailProps = {
  children: ReactNode;
  className?: string;
}

export default function NavigationRail({ children, className }: NavigationRailProps) {
  return (
    <div className={`${styles.nav_rail} ${className || ''}`}>
      {children}
    </div>
  )
}
