// Projects from the server's API (ADR-007). Requests are cached per locale
// (and per slug) for the session, so every render reads the same request; a
// failed request is dropped from the cache, so Try again fetches again.
import { withFloor } from "@/app/lazyRoute.tsx";
import type { Locale } from "@/i18n/locale.ts";
import type { ProjectData, ProjectSummary } from "./project-data.types.ts";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

// A request and, once it settles, its outcome: a page that already has its
// data renders it straight away instead of suspending again
export interface Request<T> {
  promise: Promise<T>;
  status: "pending" | "fulfilled" | "rejected";
  value?: T;
  error?: unknown;
}

const cache = new Map<string, Request<unknown>>();

function cached<T>(url: string, load: () => Promise<T>): Request<T> {
  const existing = cache.get(url) as Request<T> | undefined;
  if (existing) return existing;
  const request: Request<T> = { promise: withFloor(load), status: "pending" };
  // The fields React's use() reads on a settled promise, so a page that
  // already has its data renders without suspending again
  const tagged = request.promise as Promise<T> & Record<string, unknown>;
  request.promise.then(
    (value) => {
      request.status = "fulfilled";
      request.value = value;
      Object.assign(tagged, { status: "fulfilled", value });
    },
    (error) => {
      request.status = "rejected";
      request.error = error;
      Object.assign(tagged, { status: "rejected", reason: error });
      cache.delete(url);
    },
  );
  cache.set(url, request);
  return request;
}

// The JSON body, or null on 404
async function getJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new ApiError(response.status, `${url} answered ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function projectsRequest(locale: Locale): Request<ProjectSummary[]> {
  const url = `/api/v1/projects?locale=${locale}`;
  return cached(url, async () => {
    const body = await getJson<{ projects: ProjectSummary[] }>(url);
    if (!body) throw new ApiError(404, `${url} not found`);
    return body.projects;
  });
}

// null when there's no project with that slug
export function projectRequest(
  slug: string,
  locale: Locale,
): Request<ProjectData | null> {
  const url = `/api/v1/projects/${encodeURIComponent(slug)}?locale=${locale}`;
  return cached(url, async () => {
    const body = await getJson<{ project: ProjectData }>(url);
    return body?.project ?? null;
  });
}

// Tests start each case without cached answers
export function clearProjectsCache() {
  cache.clear();
}

// Tests wait for every request in flight (see renderLoaded)
export function projectRequestsInFlight(): Promise<unknown>[] {
  return [...cache.values()].map((request) => request.promise);
}
