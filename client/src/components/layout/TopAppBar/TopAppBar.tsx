import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../navigation/Logo/Logo.tsx";
import { LanguageAction, ThemeAction } from "../navigation/NavActions.tsx";
import styles from "./TopAppBar.module.css";

// Top app bar for Compact/Medium (Figma "TopAppBar"): logo + actions.
// The Figma title layer is hidden, so there is no title.
export default function TopAppBar() {
  const scrolled = useScrolled();

  return (
    <header className={styles.bar} data-scrolled={scrolled || undefined}>
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

// True once the page leaves the top (M3 "on scroll" app bar state)
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
}
