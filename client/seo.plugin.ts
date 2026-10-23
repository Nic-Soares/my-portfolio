import { dirname, join } from "node:path";
import { type Plugin, type ResolvedConfig, runnerImport } from "vite";
import svgr from "vite-plugin-svgr";

type StaticPagesModule = typeof import("./src/app/seo/staticPages.ts");

// Replaced in the built index.html by each route's tags
const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;

// After the build, writes one HTML file per route with that route's title,
// description, Open Graph and JSON-LD (link previews don't run JS), plus
// sitemap.xml and robots.txt. Every file still boots the same SPA.
export function seoPages(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "seo-pages",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    async closeBundle() {
      const { module } = await runnerImport<StaticPagesModule>(
        join(config.root, "src/app/seo/staticPages.ts"),
        {
          configFile: false,
          root: config.root,
          mode: config.mode,
          envDir: config.envDir,
          resolve: { alias: config.resolve.alias },
          plugins: [svgr()],
          logLevel: "error",
        },
      );
      const { staticPages, sitemap, robots, SITE_URL } = module;
      const outDir = config.build.outDir;
      const template = await Deno.readTextFile(join(outDir, "index.html"));
      if (!SEO_BLOCK.test(template)) {
        throw new Error("seo-pages: index.html has no seo:start/seo:end block");
      }

      const pages = staticPages();
      for (const page of pages) {
        // `about.html`, not `about/index.html`: hosts with clean URLs (and
        // vite preview) serve it at /about, matching the canonical
        const file = page.path === "/" ? "index" : page.path.slice(1);
        const target = join(outDir, `${file}.html`);
        await Deno.mkdir(dirname(target), { recursive: true });
        await Deno.writeTextFile(
          target,
          template.replace(SEO_BLOCK, page.head),
        );
      }
      await Deno.writeTextFile(join(outDir, "sitemap.xml"), sitemap(pages));
      await Deno.writeTextFile(join(outDir, "robots.txt"), robots());

      if (!config.env.VITE_SITE_URL) {
        config.logger.warn(
          `seo-pages: VITE_SITE_URL is not set; canonical, Open Graph and the sitemap point at ${SITE_URL}`,
        );
      }
      config.logger.info(`seo-pages: ${pages.length} pages, sitemap, robots`);
    },
  };
}
