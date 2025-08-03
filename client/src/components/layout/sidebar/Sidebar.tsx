import styles from './Sidebar.module.css';
import NavRail from '@/components/common/navegate/NavRail/NavRail';
import { NavItem } from '@/components/common/navegate/NavItem/NavItem';
import type { SidebarProps } from '@/types';
import IconButton from '@/components/common/buttons/icon-button/IconButton';

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
        <IconButton type='round' size='medium' style='outline' width='default'/>
        <IconButton type='round' size='medium' style='outline' width='default'/>
      </NavRail>
    </aside>
  );
}

export default Sidebar;
