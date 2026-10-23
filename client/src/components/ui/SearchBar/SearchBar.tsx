import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  className = "",
  autoFocus = false,
  disabled = false,
  value: controlledValue,
  onChange,
}) => {
  const { t } = useI18n();
  const [internalQuery, setInternalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const query = isControlled ? controlledValue : internalQuery;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isControlled) {
      setInternalQuery(value);
    }

    onChange?.(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    const newValue = "";

    if (!isControlled) {
      setInternalQuery(newValue);
    }

    onChange?.(newValue);
    onSearch?.(newValue);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  const containerClasses = [
    styles.searchBar,
    isFocused && styles["searchBar--focused"],
    disabled && styles["searchBar--disabled"],
    query && styles["searchBar--filled"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // The click only forwards focus to the input, which the keyboard reaches
    // directly; role="search" rather than <search> for older browsers
    // biome-ignore lint/a11y/useKeyWithClickEvents: pointer convenience only
    // biome-ignore lint/a11y/useSemanticElements: see above
    <div
      className={containerClasses}
      onClick={handleContainerClick}
      role="search"
    >
      <div className={styles.searchBar__container}>
        <div className={styles.searchBar__leadingIcon}>
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
        </div>

        <div className={styles.searchBar__inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? t.ui.search}
            className={styles.searchBar__input}
            disabled={disabled}
            aria-label={t.ui.searchInput}
          />
        </div>

        {query && (
          <button
            type="button"
            className={styles.searchBar__trailingIcon}
            onClick={handleClear}
            aria-label={t.ui.clearSearch}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
