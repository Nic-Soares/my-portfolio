import { SidebarItem } from "../../../data/project-data.types.ts";
import styles from "./SummaryNav.module.css";

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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.host}>
      <nav className={styles.nav} aria-label="page content">
        <div
          className={`label-medium text-on-surface-variant ${styles.overline}`}
        >
          On this page
        </div>
        <h2 className={`headline-small text-on-surface ${styles.dynamicTitle}`}>
          {title}
        </h2>

        <div className={`${styles.indicator} ${styles.hide}`}></div>

        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.listItem} aria-current="false">
              <a
                href={`#${item.anchorId}`}
                className={styles.link}
                onClick={(e) => handleClick(e, item.anchorId)}
                tabIndex={0}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
