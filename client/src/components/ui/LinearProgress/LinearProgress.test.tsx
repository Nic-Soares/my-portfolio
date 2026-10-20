import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LinearProgress from "./LinearProgress.tsx";

describe("LinearProgress", () => {
  it("is an indeterminate progressbar without a value", () => {
    render(<LinearProgress />);
    const bar = screen.getByRole("progressbar", { name: "Loading" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("reports a clamped value when determinate", () => {
    render(<LinearProgress value={140} label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "100%");
  });
});
