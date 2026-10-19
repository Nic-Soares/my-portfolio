import { Children, type ReactNode } from "react";
import styles from "./Chip.module.css";

// Figma "SkillChipRow": chips 8px apart; wraps when there is no room
const ChipRow = ({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel?: string;
}) => (
  <ul className={styles.row} aria-label={ariaLabel}>
    {Children.map(children, (chip) => (
      <li>{chip}</li>
    ))}
  </ul>
);

export default ChipRow;
