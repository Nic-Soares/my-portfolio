import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProjectData, WorkArea } from "../data/project-data.types.ts";

const SEARCH_DELAY = 250; // ms the search waits for typing to pause

// Projects filter state, kept in the URL (?area=data&q=spotify) so a
// filtered list can be shared and survives a reload.
export function useProjectFilters(projects: ProjectData[]) {
  const [params, setParams] = useSearchParams();
  const areaParam = params.get("area");
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

  const area =
    areas.find((entry) => entry.area.toLowerCase() === areaParam)?.area ?? null;

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

  const setArea = (next: WorkArea | null) =>
    setParams(
      (current) => {
        const params = new URLSearchParams(current);
        if (next) params.set("area", next.toLowerCase());
        else params.delete("area");
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
      (!area || project.areas.includes(area)) &&
      (!term ||
        `${project.name} ${project.description} ${project.areas.join(" ")}`
          .toLowerCase()
          .includes(term)),
  );

  return {
    areas,
    area,
    setArea,
    query,
    setQuery,
    clear,
    filtered,
    isFiltered: Boolean(area || term),
  };
}
