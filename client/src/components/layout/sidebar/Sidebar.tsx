import styles from './Sidebar.module.css'
import NavRail from '../../common/navegate/NavRail/NavRail';
import { NavItem } from '../../common/navegate/NavItem/NavItem';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <NavRail>
        <NavItem icon='home' label='Home'/>
        <NavItem icon='' label=''/>
        <NavItem icon='' label=''/>
        <NavItem icon='' label=''/>
      </NavRail>

      <nav className={styles['nav-footer']}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
