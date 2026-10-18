import { Link } from "react-router-dom";
import Logo from "../navigation/Logo/Logo.tsx";
import { LanguageAction, ThemeAction } from "../navigation/NavActions.tsx";
import styles from "./TopAppBar.module.css";

// Top app bar for Compact/Medium (Figma "TopAppBar"): logo + actions.
// The Figma title layer is hidden, so there is no title.
export default function TopAppBar() {
  return (
    <header className={styles.bar}>
      <Link to="/" className={styles.logo} aria-label="Home">
        <Logo />
      </Link>
      <div className={styles.actions}>
        <LanguageAction width="wide" />
        <ThemeAction width="wide" />
      </div>
    </header>
  );
}
