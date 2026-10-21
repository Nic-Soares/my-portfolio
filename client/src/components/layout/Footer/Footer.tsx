import CopyrightIcon from "@assets/images/footer/copyright.svg?react";
import Divider from "@assets/images/footer/divider.svg?react";
import LogoMark from "@assets/images/footer/logo.svg?react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  type FooterLink,
  footerColumns,
  footerOwner,
  footerRole,
  footerTagline,
} from "./footer.data.ts";

function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        className={`title-small-plus ${styles.link}`}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link className={`title-small-plus ${styles.link}`} to={link.href}>
      {link.label}
    </Link>
  );
}

// Site footer (Figma "Footer"): wave divider, brand + link columns, bottom
// bar. Large = side by side; Medium/Compact = stacked; Compact also stacks
// the bottom bar.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} aria-hidden="true">
        <Divider />
      </div>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Home">
              <LogoMark aria-hidden="true" />
            </Link>
            <p className={`title-large ${styles.tagline}`}>{footerTagline}</p>
          </div>
          <nav className={styles.links} aria-label="Footer">
            {footerColumns.map((column) => (
              <div key={column.title} className={styles.column}>
                <h2 className={`title-small ${styles.columnTitle}`}>
                  {column.title}
                </h2>
                <ul className={styles.columnLinks}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.bottomBar}>
          <p className="label-medium-emphasized">{footerOwner}</p>
          <p className={`body-small ${styles.copyright}`}>
            <CopyrightIcon
              className={styles.copyrightIcon}
              role="img"
              aria-label="Copyright"
            />
            {new Date().getFullYear()} {footerOwner}. {footerRole}
          </p>
        </div>
      </div>
    </footer>
  );
}
