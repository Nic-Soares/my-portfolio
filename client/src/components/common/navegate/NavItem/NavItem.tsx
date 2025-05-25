import styles from './NavItem.module.css'

type NavItemProps = {
  icon: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const NavItem = ({ icon, label, selected, onClick }: NavItemProps) => {
  return (
    <button
      className={`${styles.NavItem} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
