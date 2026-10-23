import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, normalize, sep } from "node:path";
import { AwsClient } from "aws4fetch";
import type { ObjectStore } from "./types.ts";

// A folder standing in for the bucket (local runs and tests)
export function folderStore(root: string): ObjectStore {
  const path = (key: string) => {
    const file = normalize(join(root, key));
    if (!file.startsWith(normalize(root) + sep)) {
      throw new Error(`Key outside the store: ${key}`);
    }
    return file;
  };
  return {
    async get(key) {
      return readFile(path(key)).then(
        (buffer) => new Uint8Array(buffer),
        () => null,
      );
    },
    async has(key) {
      return stat(path(key)).then(
        () => true,
        () => false,
      );
    },
    async put(key, body) {
      await mkdir(dirname(path(key)), { recursive: true });
      await writeFile(path(key), body);
    },
  };
}

export interface R2Config {
  accountId: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

// Cloudflare R2 through its S3-compatible API, signed with the write key
// pair (an Actions secret; the server never has it)
export function r2Store(config: R2Config): ObjectStore {
  const client = new AwsClient({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: "s3",
    region: "auto",
  });
  const base = `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucket}`;
  const url = (key: string) =>
    `${base}/${key.split("/").map(encodeURIComponent).join("/")}`;
  const fail = async (response: Response, what: string) => {
    throw new Error(
      `R2 ${what} failed: ${response.status} ${await response.text()}`,
    );
  };
  return {
    async get(key) {
      const response = await client.fetch(url(key));
      if (response.status === 404) return null;
      if (!response.ok) await fail(response, `GET ${key}`);
      return new Uint8Array(await response.arrayBuffer());
    },
    async has(key) {
      const response = await client.fetch(url(key), { method: "HEAD" });
      if (response.status === 404) return false;
      if (!response.ok) await fail(response, `HEAD ${key}`);
      return true;
    },
    async put(key, body, { contentType, cacheControl }) {
      const response = await client.fetch(url(key), {
        method: "PUT",
        body: new Uint8Array(body),
        headers: { "Content-Type": contentType, "Cache-Control": cacheControl },
      });
      if (!response.ok) await fail(response, `PUT ${key}`);
    },
  };
}
