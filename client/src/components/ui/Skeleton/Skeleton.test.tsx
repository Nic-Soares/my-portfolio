import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skeleton from "./Skeleton.tsx";

describe("Skeleton", () => {
  it("is decorative and takes its size", () => {
    const { container } = render(
      <Skeleton shape="rect" tone="highest" width={160} height={96} />,
    );
    const block = container.firstElementChild as HTMLElement;
    expect(block).toHaveAttribute("aria-hidden", "true");
    expect(block.style.width).toBe("160px");
    expect(block.style.height).toBe("96px");
  });
});
