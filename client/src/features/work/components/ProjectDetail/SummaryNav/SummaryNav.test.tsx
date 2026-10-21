import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SummaryNav } from "./SummaryNav.tsx";

const items = [
  { label: "Role & stack", anchorId: "role-stack" },
  { label: "Screens", anchorId: "screens" },
];

// Places each section heading at a given distance from the viewport top
function placeSections(tops: Record<string, number>) {
  for (const [id, top] of Object.entries(tops)) {
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement("div");
      element.id = id;
      document.body.append(element);
    }
    element.getBoundingClientRect = () => ({ top }) as DOMRect;
  }
}

function scroll() {
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("SummaryNav", () => {
  // jsdom has no layout; a tall page keeps the "scrolled to the bottom" rule out
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: 5000,
    configurable: true,
  });

  afterEach(() => {
    for (const { anchorId } of items)
      document.getElementById(anchorId)?.remove();
  });

  it("marks the section that has scrolled past the top as current", async () => {
    placeSections({ "role-stack": 100, screens: 900 });
    render(<SummaryNav title="Overview" items={items} />);

    expect(screen.getByRole("link", { name: "Role & stack" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Screens" })).not.toHaveAttribute(
      "aria-current",
    );

    placeSections({ "role-stack": -600, screens: 120 });
    scroll();
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));

    expect(screen.getByRole("link", { name: "Screens" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("marks nothing before the first section", () => {
    placeSections({ "role-stack": 700, screens: 1400 });
    render(<SummaryNav title="Overview" items={items} />);

    expect(
      screen.getByRole("link", { name: "Role & stack" }),
    ).not.toHaveAttribute("aria-current");
  });
});
