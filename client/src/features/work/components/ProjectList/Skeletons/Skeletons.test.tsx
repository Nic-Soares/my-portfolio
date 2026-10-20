import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectGridSkeleton from "./ProjectGridSkeleton.tsx";
import ProjectsHeaderSkeleton from "./ProjectsHeaderSkeleton.tsx";

function stubSizeClass(compact: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: compact && query === "(width < 600px)",
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  );
}

describe("Project skeletons", () => {
  it("shows as many cards as the Figma Loading screen", () => {
    stubSizeClass(false);
    const { container, unmount } = render(<ProjectGridSkeleton />);
    expect(container.firstElementChild?.children).toHaveLength(8);
    unmount();

    stubSizeClass(true);
    const compact = render(<ProjectGridSkeleton />);
    expect(compact.container.firstElementChild?.children).toHaveLength(3);
  });

  it("is hidden from assistive tech", () => {
    const { container } = render(<ProjectsHeaderSkeleton />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
