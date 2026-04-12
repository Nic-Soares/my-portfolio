/**
 * Barrel file for project data.
 * Re-exports the `projectsData` array from each project's data file so consumers
 * can import a single aggregated source.
 *
 * Example:
 *   import { projectsData } from '@/features/work/data/projects';
 */

import { projectsData as spotifyClone } from "./spotify-clone.data";
import { referenceData } from "./reference.data";

export const projectsData = [...spotifyClone, referenceData];
