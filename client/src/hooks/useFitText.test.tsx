import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFitText } from "./useFitText.ts";

// jsdom has no layout: the box is 100px tall and its content is
// `contentHeight` × the current scale
function Box({ contentHeight }: { contentHeight: number }) {
  const ref = useFitText<HTMLDivElement>(0.75);
  return (
    <div
      ref={(node) => {
        ref.current = node;
        if (!node) return;
        Object.defineProperty(node, "clientHeight", {
          value: 100,
          configurable: true,
        });
        Object.defineProperty(node, "scrollHeight", {
          configurable: true,
          get: () =>
            contentHeight *
            Number(node.style.getPropertyValue("--fit-scale") || 1),
        });
      }}
      data-testid="box"
    />
  );
}

describe("useFitText", () => {
  it("keeps the full size when the content fits", () => {
    const { getByTestId } = render(<Box contentHeight={90} />);
    expect(getByTestId("box").style.getPropertyValue("--fit-scale")).toBe("1");
  });

  it("shrinks in 5% steps until the content fits", () => {
    const { getByTestId } = render(<Box contentHeight={115} />);
    // 115 × 0.85 = 97.75 ≤ 100
    expect(getByTestId("box").style.getPropertyValue("--fit-scale")).toBe(
      "0.85",
    );
  });

  it("never goes below the minimum", () => {
    const { getByTestId } = render(<Box contentHeight={300} />);
    expect(getByTestId("box").style.getPropertyValue("--fit-scale")).toBe(
      "0.75",
    );
  });
});
