/**
 * Barrel file for project data.
 * Re-exports the `projectsData` array from each project's data file so consumers
 * can import a single aggregated source.
 *
 * Example:
 *   import { projectsData } from '@/features/work/data/projects/index.ts';
 */

import { referenceData } from "./reference.data.ts";
import { projectsData as spotifyClone } from "./spotify-clone.data.ts";

export const projectsData = [...spotifyClone, referenceData];
