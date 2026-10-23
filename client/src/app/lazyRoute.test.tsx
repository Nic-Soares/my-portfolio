import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DelayedFallback, withFloor } from "./lazyRoute.tsx";

const resolveAfter = <T,>(ms: number, value: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

describe("lazyRoute", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("shows the fallback only after 150ms", () => {
    render(
      <DelayedFallback>
        <p>Skeleton</p>
      </DelayedFallback>,
    );
    expect(screen.queryByText("Skeleton")).toBeNull();
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByText("Skeleton")).toBeInTheDocument();
  });

  it("does not hold a fast load", async () => {
    const done = vi.fn();
    withFloor(() => resolveAfter(100, "page")).then(done);
    await vi.advanceTimersByTimeAsync(100);
    expect(done).toHaveBeenCalledWith("page");
  });

  it("keeps a shown skeleton for at least 400ms", async () => {
    const done = vi.fn();
    withFloor(() => resolveAfter(200, "page")).then(done);
    await vi.advanceTimersByTimeAsync(549);
    expect(done).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(done).toHaveBeenCalledWith("page");
  });
});
