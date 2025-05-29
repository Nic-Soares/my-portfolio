import styles from './Sidebar.module.css'
import NavRail from '../../common/navegate/NavRail/NavRail';
import { NavItem } from '../../common/navegate/NavItem/NavItem';

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
}

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <NavRail>
        <NavItem icon='home' label='Home' selected={activePage === 'Home'} onClick={() => setActivePage('Home')} />
        <NavItem icon='folder' label='Projects' selected={activePage === 'Projects'} onClick={() => setActivePage('Projects')} />
        <NavItem icon='concierge' label='Services' selected={activePage === 'Services'} onClick={() => setActivePage('Services')} />
        <NavItem icon='account_circle' label='About me' selected={activePage === 'About me'} onClick={() => setActivePage('About me')} />
      </NavRail>

      <NavRail className={styles['nav-footer']}>
        <md-outlined-icon-button toggle>
          <md-icon>language_us</md-icon>
          <md-icon slot="selected">check</md-icon>
        </md-outlined-icon-button>
        <md-outlined-icon-button toggle>
          <md-icon>light_mode</md-icon>
          <md-icon slot="selected">dark_mode</md-icon>
        </md-outlined-icon-button>
      </NavRail>
    </aside>
  );
}

export default Sidebar;
