import styles from './NavRail.module.css'
import type { ReactNode } from 'react';

type NavigationRailProps = {
  children: ReactNode;
}

export default function NavigationRail({ children }: NavigationRailProps) {
  return (
    <div className={styles.nav_rail}>
      {children}
    </div>
  )
}
