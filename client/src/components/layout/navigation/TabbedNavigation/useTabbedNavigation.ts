import { useState, useEffect, useRef, RefObject } from "react";
import { TabData } from "./TabbedNavigation.utils.ts";

interface UseTabbedNavigationProps {
  renderTabs: TabData[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

interface UseTabbedNavigationReturn {
  currentSelectedId: string | undefined;
  isSticky: boolean;
  navRef: RefObject<HTMLElement | null>;
  sentinelRef: RefObject<HTMLDivElement | null>;
  handleClick: (tab: TabData) => void;
}

export function useTabbedNavigation({
  renderTabs,
  selectedId,
  onSelect,
}: UseTabbedNavigationProps): UseTabbedNavigationReturn {
  const isControlled = selectedId !== undefined;

  const [internalSelectedId, setInternalSelectedId] = useState<
    string | undefined
  >(() => {
    if (isControlled) return selectedId;
    return renderTabs[0]?.id;
  });

  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Derive a valid selected id during render instead of syncing via an effect
  // (avoids cascading re-renders from calling setState inside useEffect).
  const derivedSelectedId = renderTabs.some((t) => t.id === internalSelectedId)
    ? internalSelectedId
    : renderTabs[0]?.id;

  const currentSelectedId = isControlled ? selectedId : derivedSelectedId;

  // Detect sticky state using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (tab: TabData) => {
    if (tab.disabled) return;

    // toggleable behavior: in uncontrolled mode, clicking the same selected tab toggles off
    if (tab.toggleable && currentSelectedId === tab.id) {
      if (!isControlled) setInternalSelectedId(undefined);
      onSelect?.(tab.id);
      return;
    }

    if (!isControlled) setInternalSelectedId(tab.id);
    onSelect?.(tab.id);
  };

  return {
    currentSelectedId,
    isSticky,
    navRef,
    sentinelRef,
    handleClick,
  };
}
