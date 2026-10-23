// Where ingestion reads projects from and writes the catalog to (ADR-007).
// GitHub and R2 in production; folders on disk locally and in tests.

export interface RepoSnapshot {
  // owner/name
  repo: string;
  // The last commit that touched .portfolio/ on the default branch
  sha: string;
}

export interface RepoSource {
  // Your repositories with the `portfolio` topic, forks excluded
  list(): Promise<RepoSnapshot[]>;
  // Every file under .portfolio/, by path relative to it
  // (project.json, content.en.json, images/hero.webp…)
  files(snapshot: RepoSnapshot): Promise<Map<string, Uint8Array>>;
}

export interface PutOptions {
  contentType: string;
  cacheControl: string;
}

export interface ObjectStore {
  get(key: string): Promise<Uint8Array | null>;
  has(key: string): Promise<boolean>;
  put(key: string, body: Uint8Array, options: PutOptions): Promise<void>;
  // Every key under a prefix ("catalog/", "media/")
  list(prefix: string): Promise<string[]>;
  delete(key: string): Promise<void>;
}
