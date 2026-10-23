import { describe, expect, it } from "vitest";
import { markdownProblems, parseBlocks, parseInline } from "./markdown.ts";

describe("parseInline", () => {
  it("reads bold, italic, code and links", () => {
    expect(
      parseInline("A **bold** *soft* `x()` [site](https://a.dev) end"),
    ).toEqual([
      { type: "text", value: "A " },
      { type: "strong", children: [{ type: "text", value: "bold" }] },
      { type: "text", value: " " },
      { type: "em", children: [{ type: "text", value: "soft" }] },
      { type: "text", value: " " },
      { type: "code", value: "x()" },
      { type: "text", value: " " },
      {
        type: "link",
        href: "https://a.dev",
        children: [{ type: "text", value: "site" }],
      },
      { type: "text", value: " end" },
    ]);
  });

  it("keeps unclosed markers and escapes as text", () => {
    expect(parseInline("2 * 3 and **open")).toEqual([
      { type: "text", value: "2 * 3 and **open" },
    ]);
    expect(parseInline("\\*not italic\\*")).toEqual([
      { type: "text", value: "*not italic*" },
    ]);
  });

  it("never turns HTML into anything but text", () => {
    expect(parseInline('<img src=x onerror="alert(1)">')).toEqual([
      { type: "text", value: '<img src=x onerror="alert(1)">' },
    ]);
  });
});

describe("parseBlocks", () => {
  it("splits paragraphs and ordered or unordered lists", () => {
    const blocks = parseBlocks("Intro line\ncontinues\n\n1. one\n2. two\n- a");
    expect(blocks.map((block) => block.type)).toEqual([
      "paragraph",
      "list",
      "list",
    ]);
    expect(blocks[0]).toEqual({
      type: "paragraph",
      children: [{ type: "text", value: "Intro line continues" }],
    });
    expect(blocks[1]).toMatchObject({ type: "list", ordered: true });
    expect(blocks[1].type === "list" && blocks[1].items).toHaveLength(2);
    expect(blocks[2]).toMatchObject({ type: "list", ordered: false });
  });
});

describe("markdownProblems", () => {
  it("accepts plain Markdown", () => {
    expect(markdownProblems("**Fine** [link](https://ok.dev)")).toEqual([]);
  });

  it("allows tags inside code, rejects HTML entities", () => {
    expect(markdownProblems("the `<audio>` element")).toEqual([]);
    expect(markdownProblems("the &lt;audio&gt; element")).toEqual([
      "HTML entities are not allowed; write the character itself",
    ]);
  });

  it("rejects HTML and links that aren't https", () => {
    expect(markdownProblems("<strong>x</strong>")).toEqual([
      "HTML tags are not allowed",
    ]);
    expect(markdownProblems("[x](javascript:alert(1))")).toEqual([
      "Link must use https: javascript:alert(1",
    ]);
    expect(markdownProblems("[x](http://plain.dev)")).toEqual([
      "Link must use https: http://plain.dev",
    ]);
  });
});
