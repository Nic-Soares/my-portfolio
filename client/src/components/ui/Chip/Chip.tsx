import styles from "./Chip.module.css";

interface ChipProps {
  label: string;
  leadingIcon?: string; // Material Symbols icon name (Kit "Label & leading icon")
  avatar?: string; // image URL (Kit "Label & avatar"); wins over leadingIcon
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void; // makes the chip a button; without it the chip is static
  href?: string; // makes the chip a link instead
  onRemove?: () => void; // shows the closing icon as its own button
  removeLabel?: string; // accessible name for the closing icon
}

// M3 Input chip (Kit "Input chip"): 32px, 8px corners, Label Large.
// Unselected: Outline Variant border, On Surface Variant label.
// Selected: Secondary Container, On Secondary Container label.
const Chip = ({
  label,
  leadingIcon,
  avatar,
  selected = false,
  disabled = false,
  onClick,
  href,
  onRemove,
  removeLabel = `Remove ${label}`,
}: ChipProps) => {
  const className = [
    styles.chip,
    selected ? styles["chip--selected"] : "",
    disabled ? styles["chip--disabled"] : "",
    avatar ? styles["chip--avatar"] : leadingIcon ? styles["chip--icon"] : "",
    onRemove ? styles["chip--removable"] : "",
  ].join(" ");

  const content = (
    <>
      {avatar ? (
        <img className={styles.chip__avatar} src={avatar} alt="" />
      ) : leadingIcon ? (
        <span
          className={`material-symbols-outlined ${styles.chip__icon}`}
          aria-hidden="true"
        >
          {leadingIcon}
        </span>
      ) : null}
      <span className={`label-large ${styles.chip__label}`}>{label}</span>
    </>
  );

  return (
    <span className={className}>
      {href ? (
        <a className={styles.chip__action} href={href}>
          {content}
        </a>
      ) : onClick ? (
        <button
          type="button"
          className={styles.chip__action}
          aria-pressed={selected}
          disabled={disabled}
          onClick={onClick}
        >
          {content}
        </button>
      ) : (
        <span className={styles.chip__action}>{content}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className={styles.chip__remove}
          aria-label={removeLabel}
          disabled={disabled}
          onClick={onRemove}
        >
          <span
            className={`material-symbols-outlined ${styles.chip__icon}`}
            aria-hidden="true"
          >
            close
          </span>
        </button>
      )}
    </span>
  );
};

export default Chip;
