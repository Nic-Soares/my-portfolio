// The client's tests talk to the real server app, in memory, over the
// .portfolio/ fixtures (Spotify Web and Reference): fetch("/api/…") goes to
// app.request instead of the network.
import { join } from "node:path";
import { act, render } from "@testing-library/react";
import { type ReactElement, Suspense } from "react";
import { vi } from "vitest";
import { aboutData } from "@/features/about/data/about.data.ts";
import {
  clearProjectsCache,
  projectRequestsInFlight,
} from "@/features/work/data/projectsApi.ts";
import { en } from "@/i18n/locales/en.ts";
import { createApp } from "../../../server/app.ts";
import { fixtureCatalog } from "../../../server/local/fixtureCatalog.ts";
import { cachedCatalog } from "../../../server/sources.ts";

const app = createApp({
  catalog: cachedCatalog(
    fixtureCatalog(
      join(import.meta.dirname, "../../../server/fixtures/projects"),
    ),
    Number.POSITIVE_INFINITY,
  ),
  assets: { get: async () => null, indexHtml: async () => "" },
  siteUrl: "http://localhost",
  texts: en,
  person: aboutData,
  log: () => {},
});

export function useProjectsApi() {
  clearProjectsCache();
  vi.stubGlobal("fetch", (input: RequestInfo | URL, init?: RequestInit) =>
    app.request(String(input).replace(/^https?:\/\/[^/]+/, ""), init),
  );
}

// Renders inside Suspense and waits until the API requests the page made
// have settled. React renders when act flushes, so the requests only exist
// after the first act; each later act waits for them and lets React resume.
// Loops because a page can load the list, then one project.
export async function renderLoaded(ui: ReactElement) {
  let result: ReturnType<typeof render> | undefined;
  await act(async () => {
    result = render(<Suspense fallback={null}>{ui}</Suspense>);
  });
  for (;;) {
    const pending = projectRequestsInFlight();
    await act(async () => {
      await Promise.allSettled(pending);
      // Microtasks only: some tests run on fake timers
      for (let tick = 0; tick < 10; tick++) await Promise.resolve();
    });
    if (projectRequestsInFlight().length === pending.length) break;
  }
  return result as ReturnType<typeof render>;
}
