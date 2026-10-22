import { type KeyboardEvent, useEffect, useRef } from "react";
import styles from "./Menu.module.css";

export interface MenuOption {
  id: string;
  label: string;
  lang?: string; // when the label is in another language than the page
}

interface MenuProps {
  id: string;
  label: string; // accessible name of the menu
  options: MenuOption[];
  selectedId: string;
  placement: "right-end" | "bottom-end"; // beside the rail, under the app bar
  onSelect: (id: string) => void;
  onClose: () => void;
}

// M3 Menu (Standard, one group) with single-choice items (Figma "Language
// Menu"): Surface Container Low, Corner Large, Elevation 3; the selected item
// is Tertiary Container. Opens with focus on the selected item; arrows move,
// Enter/Space choose, Escape or a click outside closes.
export function Menu({
  id,
  label,
  options,
  selectedId,
  placement,
  onSelect,
  onClose,
}: MenuProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = listRef.current?.querySelector<HTMLElement>(
      '[aria-checked="true"]',
    );
    (
      selected ??
      listRef.current?.querySelector<HTMLElement>("[role=menuitemradio]")
    )?.focus();

    const onPointerDown = (event: PointerEvent) => {
      const host = listRef.current?.parentElement;
      if (host && !host.contains(event.target as Node)) onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [onClose]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = [
      ...(listRef.current?.querySelectorAll<HTMLElement>(
        "[role=menuitemradio]",
      ) ?? []),
    ];
    const index = items.indexOf(document.activeElement as HTMLElement);
    const moves: Record<string, number> = {
      ArrowDown: (index + 1) % items.length,
      ArrowUp: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      items[moves[event.key]]?.focus();
    } else if (event.key === "Escape" || event.key === "Tab") {
      if (event.key === "Escape") event.preventDefault();
      onClose();
    }
  };

  return (
    <div
      ref={listRef}
      id={id}
      role="menu"
      aria-label={label}
      className={`${styles.menu} ${styles[`menu--${placement}`]}`}
      onKeyDown={onKeyDown}
    >
      {options.map((option) => {
        const selected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            role="menuitemradio"
            aria-checked={selected}
            lang={option.lang}
            tabIndex={-1}
            className={`label-large ${styles.item} ${selected ? styles["item--selected"] : ""}`}
            onClick={() => onSelect(option.id)}
          >
            <span className={styles.content}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
