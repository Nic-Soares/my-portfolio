import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NavigationBar from "./NavigationBar.tsx";

describe("NavigationBar", () => {
  it("shows the same destinations as the rail and marks the current one", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <NavigationBar />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual([
      "homeHome",
      "personAbout Me",
      "folderProjects",
    ]);
    expect(screen.getByRole("link", { name: /About Me/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
