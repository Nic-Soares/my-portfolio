import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Footer from "./Footer.tsx";

describe("Footer", () => {
  it("renders the link columns with router and external links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation", { name: "Footer" });
    for (const title of ["Social", "Navigation", "Resources"]) {
      expect(
        within(nav).getByRole("heading", { name: title }),
      ).toBeInTheDocument();
    }
    expect(within(nav).getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(within(nav).getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("shows the copyright line for the current year", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        `${new Date().getFullYear()} Nicolas Soares. Fullstack Developer`,
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument();
  });
});
