import styles from './NavItem.module.css';
import type { NavItemProps } from '@/types';

export const NavItem = ({ icon, label, selected, onClick, disabled }: NavItemProps) => {
  return (
    <button
      className={`${styles['nav-item']} ${selected ? styles['nav-item--selected'] : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles['nav-item__icon-container']}>
        <div className={styles['nav-item__state-layer']}>
          <span className={`material-symbols-outlined ${styles['nav-item__icon']}`}>{icon}</span>
        </div>
      </div>

      <span className={styles['nav-item__label']}>{label}</span>
    </button>
  );
};
