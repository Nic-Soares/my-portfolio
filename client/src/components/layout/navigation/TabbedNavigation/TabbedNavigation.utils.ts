export type TabData = {
  id: string;
  label?: string;
  icon?: string;
  selectedIcon?: string;
  disabled?: boolean;
  toggleable?: boolean;
  visible?: boolean;
};

const MIN_VISIBLE_TABS = 2;
const MAX_VISIBLE_TABS = 5;

export function makePlaceholder(index: number): TabData {
  return {
    id: `__placeholder_${Date.now()}_${index}`,
    label: "",
    disabled: true,
    visible: true,
  };
}

export function normalizeTabs(tabs: TabData[] | undefined): TabData[] {
  const provided = Array.isArray(tabs) ? tabs.slice() : [];
  const visible = provided.filter((t) => t.visible !== false);

  // Trim if too many visible
  if (visible.length > MAX_VISIBLE_TABS) {
    const result: TabData[] = [];
    let visibleCount = 0;
    for (const t of provided) {
      if (t.visible === false) {
        result.push(t);
        continue;
      }
      if (visibleCount < MAX_VISIBLE_TABS) {
        result.push(t);
        visibleCount++;
      }
    }
    const trimmedIds = visible.slice(MAX_VISIBLE_TABS).map((t) => t.id);
    console.warn(
      `[TabbedNavigation] More than ${MAX_VISIBLE_TABS} visible tabs provided. Trimming: ${trimmedIds.join(
        ", ",
      )}`,
    );
    return result;
  }

  // Append placeholders if too few visible
  if (visible.length < MIN_VISIBLE_TABS) {
    const needed = MIN_VISIBLE_TABS - visible.length;
    const result = provided.slice();
    for (let i = 0; i < needed; i++) {
      result.push(makePlaceholder(i));
    }
    console.warn(
      `[TabbedNavigation] Fewer than ${MIN_VISIBLE_TABS} visible tabs provided. Appended ${needed} placeholder(s).`,
    );
    return result;
  }

  return provided;
}

export function getVisibleTabs(normalizedTabs: TabData[]): TabData[] {
  return normalizedTabs.filter((t) => t.visible !== false);
}
