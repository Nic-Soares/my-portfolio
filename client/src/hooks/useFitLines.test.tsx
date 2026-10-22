import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FitLines } from "@/components/ui/FitLines/FitLines.tsx";

// jsdom has no layout: a paragraph takes 4 lines at 20px and 3 lines from
// 18px down; its height is the lines × the current line height
const original = HTMLParagraphElement.prototype.getBoundingClientRect;

describe("FitLines", () => {
  let sheet: HTMLStyleElement;

  beforeEach(() => {
    sheet = document.createElement("style");
    sheet.textContent = ".headline { font-size: 20px; line-height: 24px; }";
    document.head.append(sheet);
    HTMLParagraphElement.prototype.getBoundingClientRect = function () {
      const style = getComputedStyle(this);
      const lines = Number.parseFloat(style.fontSize) > 18 ? 4 : 3;
      return { height: lines * Number.parseFloat(style.lineHeight) } as DOMRect;
    };
  });

  afterEach(() => {
    sheet.remove();
    HTMLParagraphElement.prototype.getBoundingClientRect = original;
  });

  const renderHeadline = (lines: number) =>
    render(
      <FitLines lines={lines} className="headline">
        A headline that wraps
      </FitLines>,
    ).container.querySelector("p") as HTMLElement;

  it("shrinks the font until the text fits the line budget", () => {
    const p = renderHeadline(3);
    // 20px → 19px → 18px: 3 lines
    expect(p.style.fontSize).toBe("18px");
    expect(p.style.lineHeight).toBe("21.6px");
  });

  it("leaves the text alone when it already fits", () => {
    expect(renderHeadline(4).style.fontSize).toBe("");
  });
});
