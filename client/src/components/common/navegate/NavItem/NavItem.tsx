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
      <div className={styles.icon_container}>
        <div className={styles.state_layer}>
          {/* <span className={styles.icon}>{icon}</span> */}
          <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
        </div>
      </div>

      <span className={styles.label}>{label}</span>
    </button>
  )
}
