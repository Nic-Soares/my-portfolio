// Project contracts (ADR-008), one Zod source for:
// - what each project repository writes in .portfolio/ (project.json +
//   content.<locale>.json), validated by ingestion and exported as the JSON
//   Schema the editor uses;
// - what the API serves and the client renders (ProjectData).
// The two differ only in images: a repository points at a file in
// .portfolio/images/, the served project carries the published URLs.
import { z } from "zod";
import { markdownProblems } from "./markdown.ts";

export const SCHEMA_VERSION = 1;

export const WORK_AREAS = [
  "Data",
  "Frontend",
  "Backend",
  "Automation",
  "DevOps",
  "Design",
] as const;

// Text that renders as Markdown: no HTML, links only over https
const markdown = z.string().superRefine((text, ctx) => {
  for (const problem of markdownProblems(text)) {
    ctx.addIssue({ code: "custom", message: problem });
  }
});

const plain = z.string().min(1);
const https = z.url({ protocol: /^https$/ });
const id = z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, digits and -");
const aspectRatio = z
  .string()
  .regex(/^\d+(\.\d+)? \/ \d+(\.\d+)?$/, 'like "3 / 2"');

// A file inside the repository's .portfolio/images/
const imagePath = z
  .string()
  .regex(
    /^images\/[\w./-]+\.(png|jpe?g|webp)$/i,
    "a .png, .jpg or .webp file under images/",
  )
  .refine((path) => !path.includes(".."), "must stay inside images/");

// A published image: its URL and, for photos, width variants for srcset
const publishedImage = {
  src: z.string().min(1),
  srcSet: z.string().optional(),
  sizes: z.string().optional(),
};

const common = { id: id.optional(), snug: z.boolean().optional() };

interface BlockBase {
  id?: string;
  snug?: boolean;
}

// The blocks, written out because TypeScript can't infer a recursive type
// (columns hold blocks) from a schema built per image format. The schemas
// below are typed against these, and content.test.ts validates the real
// content with them.
export type Block<Image> =
  | (BlockBase & { type: "header"; level: 1 | 2 | 3; text: string })
  | (BlockBase & { type: "paragraph"; text: string })
  | { type: "intro"; text: string; id?: string }
  | (BlockBase &
      Image & {
        type: "image";
        alt: string;
        aspectRatio?: string;
        caption?: string;
      })
  | (BlockBase & {
      type: "code";
      code: string;
      language: string;
      title?: string;
    })
  | (BlockBase & { type: "list"; items: string[]; ordered?: boolean })
  | (BlockBase & {
      type: "video";
      src: string;
      alt?: string;
      aspectRatio?: string;
      caption?: string;
    })
  | (BlockBase & { type: "table"; headers: string[]; rows: string[][] })
  | (BlockBase & {
      type: "columns";
      columns: Block<Image>[][];
      layout?: string;
    });

export type SourceBlock = Block<{ src: string }>;
export type ContentBlock = Block<ResponsiveImage>;

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}

function blockSchema<Image>(
  imageShape: z.ZodRawShape,
): z.ZodType<Block<Image>> {
  const block: z.ZodType<Block<Image>> = z.lazy(() =>
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("header"),
        level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
        text: plain,
        ...common,
      }),
      z.object({ type: z.literal("paragraph"), text: markdown, ...common }),
      // Overview lead paragraph, shown beside the project facts
      z.object({ type: z.literal("intro"), text: markdown, id: id.optional() }),
      z.object({
        type: z.literal("image"),
        ...imageShape,
        alt: plain,
        aspectRatio: aspectRatio.optional(),
        caption: markdown.optional(),
        ...common,
      }),
      z.object({
        type: z.literal("code"),
        code: z.string(),
        language: plain,
        title: z.string().optional(),
        ...common,
      }),
      z.object({
        type: z.literal("list"),
        items: z.array(markdown).min(1),
        ordered: z.boolean().optional(),
        ...common,
      }),
      // Videos stay on their own host
      z.object({
        type: z.literal("video"),
        src: https,
        alt: z.string().optional(),
        aspectRatio: aspectRatio.optional(),
        caption: markdown.optional(),
        ...common,
      }),
      z.object({
        type: z.literal("table"),
        headers: z.array(markdown).min(1),
        rows: z.array(z.array(markdown)),
        ...common,
      }),
      z.object({
        type: z.literal("columns"),
        columns: z.array(z.array(block)).min(2),
        // Column widths as fractions, e.g. "1-2"
        layout: z
          .string()
          .regex(/^\d+(-\d+)+$/, 'like "1-2"')
          .optional(),
        ...common,
      }),
    ]),
  ) as z.ZodType<Block<Image>>;
  return block;
}

const sidebarItem = z.object({ label: plain, anchorId: id });

function tabSchema<B extends z.ZodType>(block: B) {
  return z.object({
    id,
    title: plain,
    sidebarItems: z.array(sidebarItem),
    content: z.array(block),
  });
}

const fact = z.object({ label: plain, value: plain });

// ---- What a project repository writes (.portfolio/) ----

export const sourceBlock = blockSchema<{ src: string }>({ src: imagePath });

// .portfolio/project.json: what doesn't change with the language
export const projectManifest = z.object({
  $schema: z.string().optional(),
  schemaVersion: z.literal(SCHEMA_VERSION),
  slug: id,
  areas: z.array(z.enum(WORK_AREAS)).min(1),
  // Lower comes first in the list; ties keep the slug order
  order: z.number().int().optional(),
  // Hidden from the site
  draft: z.boolean().optional(),
  // On the site, kept out of search engines and the sitemap
  noindex: z.boolean().optional(),
  hero: z.object({ image: imagePath }).optional(),
});

// .portfolio/content.<locale>.json: the text, in one language
export const projectContent = z.object({
  $schema: z.string().optional(),
  name: plain,
  description: plain,
  context: plain,
  heroAlt: z.string().optional(),
  facts: z.array(fact).optional(),
  tabs: z.array(tabSchema(sourceBlock)).min(1),
});

// ---- What the API serves and the client renders ----

export const contentBlock = blockSchema<ResponsiveImage>(publishedImage);

export const projectData = z.object({
  slug: id,
  name: plain,
  description: plain,
  areas: z.array(z.enum(WORK_AREAS)).min(1),
  context: plain,
  facts: z.array(fact).optional(),
  hero: z
    .object({
      type: z.enum(["image", "video"]),
      ...publishedImage,
      alt: z.string().optional(),
    })
    .optional(),
  tabs: z.array(tabSchema(contentBlock)),
  // 1200×630 image for link previews (Open Graph), made from the hero
  shareImage: z.string().optional(),
  noindex: z.boolean().optional(),
});

// What lists need (Projects, Home carousel, pager, page titles): the API's
// /projects answer, without the tabs
export type ProjectSummary = Pick<
  ProjectData,
  | "slug"
  | "name"
  | "description"
  | "areas"
  | "context"
  | "hero"
  | "noindex"
  | "shareImage"
>;

export function toSummary(project: ProjectData): ProjectSummary {
  const { slug, name, description, areas, context, hero, noindex, shareImage } =
    project;
  return {
    slug,
    name,
    description,
    areas,
    context,
    ...(hero && { hero }),
    ...(noindex && { noindex }),
    ...(shareImage && { shareImage }),
  };
}

export type ProjectManifest = z.infer<typeof projectManifest>;
export type ProjectContent = z.infer<typeof projectContent>;
export type ProjectData = z.infer<typeof projectData>;
export type ProjectTab = ProjectData["tabs"][number];
export type SidebarItem = z.infer<typeof sidebarItem>;
export type ProjectFact = z.infer<typeof fact>;
export type WorkArea = (typeof WORK_AREAS)[number];
