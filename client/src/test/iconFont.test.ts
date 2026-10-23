import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The self-hosted Material Symbols file holds only the icons listed in
// styles/fonts.css (icon_names=…). An icon missing from that list would
// render as its name in plain text.
const SRC = join(import.meta.dirname, "..");
const fonts = readFileSync(join(SRC, "styles", "fonts.css"), "utf8");
const loaded = (fonts.match(/icon_names=([a-z_,0-9]+)/)?.[1] ?? "").split(",");

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory())
      return name === "gallery" || name === "test" ? [] : sources(path);
    return /\.tsx?$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });
}

function usedIcons(): string[] {
  const names = new Set<string>();
  for (const file of sources(SRC)) {
    const code = readFileSync(file, "utf8");
    // icon="x", selectedIcon="x", icon: "x", and icon = "x" defaults
    for (const m of code.matchAll(
      /\b(?:selectedIcon|icon)\s*[=:]\s*"([a-z_0-9]+)"/g,
    ))
      names.add(m[1]);
    // <span className="material-symbols-outlined" …>x</span>
    for (const m of code.matchAll(
      /material-symbols-outlined[^>]*>\s*([a-z_0-9]+)\s*</g,
    ))
      names.add(m[1]);
  }
  return [...names].sort();
}

describe("icon font subset", () => {
  it("lists icon_names in alphabetical order (Google Fonts requires it)", () => {
    expect(loaded).toEqual([...loaded].sort());
  });

  it("loads every icon the components use", () => {
    expect(usedIcons().filter((name) => !loaded.includes(name))).toEqual([]);
  });
});
