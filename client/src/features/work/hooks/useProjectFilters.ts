import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import type { ProjectData, WorkArea } from "../data/project-data.types.ts";

const SEARCH_DELAY = 250; // ms the search waits for typing to pause

// Projects filter state, kept in the URL (?area=data,frontend&q=spotify)
// so a filtered list can be shared and survives a reload. Several areas can
// be selected; a project shows if it has any of them.
export function useProjectFilters(projects: ProjectData[]) {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const areaParam = (params.get("area") ?? "").split(",").filter(Boolean);
  const queryParam = params.get("q") ?? "";

  // Areas that have projects, in a stable order, with their counts
  const areas = useMemo(() => {
    const counts = new Map<WorkArea, number>();
    for (const project of projects) {
      for (const area of project.areas) {
        counts.set(area, (counts.get(area) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([area, count]) => ({ area, count }));
  }, [projects]);

  const selectedAreas = areas
    .map((entry) => entry.area)
    .filter((area) => areaParam.includes(area.toLowerCase()));

  // The input follows keystrokes; the URL (and the list) after a pause
  const [query, setQuery] = useState(queryParam);
  useEffect(() => setQuery(queryParam), [queryParam]);
  useEffect(() => {
    if (query === queryParam) return;
    const timer = setTimeout(() => {
      setParams(
        (current) => {
          const next = new URLSearchParams(current);
          if (query.trim()) next.set("q", query);
          else next.delete("q");
          return next;
        },
        { replace: true },
      );
    }, SEARCH_DELAY);
    return () => clearTimeout(timer);
  }, [query, queryParam, setParams]);

  const setAreas = (next: WorkArea[]) =>
    setParams(
      (current) => {
        const params = new URLSearchParams(current);
        if (next.length) {
          params.set("area", next.map((area) => area.toLowerCase()).join(","));
        } else params.delete("area");
        return params;
      },
      { replace: true },
    );

  const clear = () => {
    setQuery("");
    setParams({}, { replace: true });
  };

  const term = queryParam.trim().toLowerCase();
  const filtered = projects.filter(
    (project) =>
      (selectedAreas.length === 0 ||
        project.areas.some((area) => selectedAreas.includes(area))) &&
      (!term ||
        // Areas match by id and by their label in the current language
        `${project.name} ${project.description} ${project.areas.join(" ")} ${project.areas.map((area) => t.work.areas[area]).join(" ")}`
          .toLowerCase()
          .includes(term)),
  );

  return {
    areas,
    selectedAreas,
    setAreas,
    query,
    setQuery,
    clear,
    filtered,
    isFiltered: Boolean(selectedAreas.length || term),
  };
}
