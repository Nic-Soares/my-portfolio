import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroDecor from "../HeroDecor/HeroDecor.tsx";
import Shape from "./Shape.tsx";
import { SHAPE_PATHS } from "./shapePaths.ts";

describe("Shape", () => {
  it("draws every Shape Set entry with a theme token", () => {
    for (const name of Object.keys(
      SHAPE_PATHS,
    ) as (keyof typeof SHAPE_PATHS)[]) {
      const { container, unmount } = render(
        <Shape shape={name} color="tertiary" />,
      );
      expect(container.querySelector("path")).toHaveAttribute(
        "fill",
        "var(--md-sys-color-tertiary)",
      );
      unmount();
    }
  });

  it("is decorative unless it has a title", () => {
    const { container } = render(<Shape shape="gem" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    render(<Shape shape="gem" title="Gem" />);
    expect(screen.getByRole("img", { name: "Gem" })).toBeInTheDocument();
  });
});

describe("HeroDecor", () => {
  it("is hidden from assistive tech", () => {
    const { container } = render(<HeroDecor />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
