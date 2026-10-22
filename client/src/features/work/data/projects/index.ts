/**
 * Project data per locale, in display order (the project list, the home
 * carousel and the pager all follow it). Each locale holds the same
 * projects with the same slugs, ids and areas; only the text differs.
 *
 * Read it through `useProjectData()`, which picks the current locale.
 */
import type { Locale } from "@/i18n/locale.ts";
import type { ProjectData } from "../project-data.types.ts";
import { referenceData } from "./reference.data.ts";
import { referenceDataEs } from "./reference.es.data.ts";
import { referenceDataPt } from "./reference.pt.data.ts";
import { projectsData as spotifyClone } from "./spotify-clone.data.ts";
import { projectsDataEs as spotifyCloneEs } from "./spotify-clone.es.data.ts";
import { projectsDataPt as spotifyClonePt } from "./spotify-clone.pt.data.ts";

export const projectsByLocale: Record<Locale, ProjectData[]> = {
  en: [...spotifyClone, referenceData],
  pt: [...spotifyClonePt, referenceDataPt],
  es: [...spotifyCloneEs, referenceDataEs],
};
