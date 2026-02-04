import { SidebarItem } from '../../../data/types';
import styles from './SummaryNav.module.css';

interface SummaryNavProps {
  title: string;
  items: SidebarItem[];
}

export const SummaryNav = ({ title, items }: SummaryNavProps) => {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Faz a rolagem suave até o título da seção
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={styles.nav}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index}>
            <a 
              href={`#${item.anchorId}`} 
              className={styles.link}
              onClick={(e) => handleClick(e, item.anchorId)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};