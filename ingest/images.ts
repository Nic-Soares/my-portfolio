// Project images (ADR-007): WebP at 800 and 1600px (never enlarged), a
// 1200×630 JPG share image for the hero, file names by content hash so a
// published file never changes and caches for a year.
import sharp from "sharp";
import type { ResponsiveImage } from "../shared/project.ts";
import type { ObjectStore } from "./types.ts";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const WIDTHS = [800, 1600];
const IMMUTABLE = "public, max-age=31536000, immutable";

async function sha256(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new Uint8Array(bytes));
  return [...new Uint8Array(digest).slice(0, 12)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function putOnce(
  store: ObjectStore,
  key: string,
  render: () => Promise<Uint8Array>,
  contentType: string,
) {
  if (await store.has(key)) return;
  await store.put(key, await render(), {
    contentType,
    cacheControl: IMMUTABLE,
  });
}

export interface PublishedImage {
  image: Omit<ResponsiveImage, "sizes">;
  // The 1200×630 share image (heroes only)
  share?: string;
}

// Publishes one source image under media/; `mediaBase` is the URL prefix the
// site serves media/ from ("/media" through the server)
export async function publishImage(
  store: ObjectStore,
  source: Uint8Array,
  mediaBase: string,
  { share = false }: { share?: boolean } = {},
): Promise<PublishedImage> {
  if (source.byteLength > MAX_IMAGE_BYTES) {
    throw new Error(
      `image is ${(source.byteLength / 1024 / 1024).toFixed(1)} MB; the limit is 10 MB`,
    );
  }
  const hash = await sha256(source);
  const metadata = await sharp(source).metadata();
  if (!metadata.width) throw new Error("not a readable image");

  const widths = WIDTHS.filter((width) => width < metadata.width);
  widths.push(Math.min(metadata.width, WIDTHS[WIDTHS.length - 1]));
  const unique = [...new Set(widths)];

  const urls: string[] = [];
  for (const width of unique) {
    const key = `media/${hash}-${width}.webp`;
    await putOnce(
      store,
      key,
      async () =>
        new Uint8Array(
          await sharp(source)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toBuffer(),
        ),
      "image/webp",
    );
    urls.push(`${mediaBase}/${hash}-${width}.webp`);
  }

  const largest = urls[urls.length - 1];
  const image =
    urls.length > 1
      ? {
          src: largest,
          srcSet: urls.map((url, i) => `${url} ${unique[i]}w`).join(", "),
        }
      : { src: largest };
  if (!share) return { image };

  const shareKey = `media/${hash}-share.jpg`;
  await putOnce(
    store,
    shareKey,
    async () =>
      new Uint8Array(
        await sharp(source)
          .resize({ width: 1200, height: 630, fit: "cover" })
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer(),
      ),
    "image/jpeg",
  );

  return { image, share: `${mediaBase}/${hash}-share.jpg` };
}
