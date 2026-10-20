import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import UnderConstruction from "./UnderConstruction.tsx";

vi.stubGlobal(
  "matchMedia",
  vi.fn(() => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  })),
);

describe("UnderConstruction", () => {
  it("shows the state and sends people to the projects", () => {
    render(
      <MemoryRouter initialEntries={["/coming-soon"]}>
        <Routes>
          <Route path="/coming-soon" element={<UnderConstruction />} />
          <Route path="/projects" element={<p>Projects page</p>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Under construction" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to home" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "View projects" }));
    expect(screen.getByText("Projects page")).toBeInTheDocument();
  });
});
