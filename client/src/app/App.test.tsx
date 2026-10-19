import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App.tsx";

describe("App", () => {
  it("renders the home page", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      })),
    );
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Nicolas Soares/ }),
    ).toBeInTheDocument();
  });
});
