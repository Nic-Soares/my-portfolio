import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { projectsData } from "@/features/work/data/projects/index.ts";
import ProjectCarousel from "./ProjectCarousel.tsx";

// Descriptions are matched as plain text (they may contain "+" and the like)
const text = (value: string) =>
  new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

describe("ProjectCarousel", () => {
  it("brings a compressed card to the middle when pressed", () => {
    render(
      <MemoryRouter>
        <ProjectCarousel />
      </MemoryRouter>,
    );
    const [first, second] = projectsData;

    // The first project is the large card; the second is compressed
    expect(screen.getByText(text(first.description))).toBeInTheDocument();
    expect(screen.queryByText(text(second.description))).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: `Show project 02: ${second.name}` }),
    );

    expect(screen.getByText(text(second.description))).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: `Show project 01: ${first.name}` }),
    ).toBeInTheDocument();
  });
});
