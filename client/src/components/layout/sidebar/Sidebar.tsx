import styles from './Sidebar.module.css';
import NavRail from '@/components/common/navegate/NavRail/NavRail';
import { NavItem } from '@/components/common/navegate/NavItem/NavItem';
import type { SidebarProps } from '@/types';

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <NavRail>
        <NavItem icon='home' label='Home' selected={activePage === 'Home'} onClick={() => setActivePage('Home')} />
        <NavItem icon='folder' label='Projects' selected={activePage === 'Projects'} onClick={() => setActivePage('Projects')} />
        <NavItem icon='concierge' label='Services' selected={activePage === 'Services'} onClick={() => setActivePage('Services')} disabled={true} />
        <NavItem icon='account_circle' label='About me' selected={activePage === 'About me'} onClick={() => setActivePage('About me')} disabled={true} />
      </NavRail>

      <NavRail className={styles['nav-footer']}>
        <div style={{ width: '50px', height: '50px', backgroundColor: 'gray' }}></div>
        <div style={{ width: '50px', height: '50px', backgroundColor: 'gray' }}></div>
      </NavRail>
    </aside>
  );
}

export default Sidebar;
