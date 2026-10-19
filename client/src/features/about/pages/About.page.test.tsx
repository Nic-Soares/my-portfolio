import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { aboutData } from "../data/about.data.ts";
import AboutPage from "./About.page.tsx";

describe("AboutPage", () => {
  it("renders the profile, experience and contact from the data", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      })),
    );
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: aboutData.name }),
    ).toBeInTheDocument();
    for (const job of aboutData.experience) {
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: `${job.role} · ${job.company}`,
        }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: aboutData.contact.email }),
    ).toHaveAttribute("href", `mailto:${aboutData.contact.email}`);
  });
});
