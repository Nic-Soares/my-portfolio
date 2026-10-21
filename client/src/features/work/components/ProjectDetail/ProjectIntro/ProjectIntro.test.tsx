import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectIntro from "./ProjectIntro.tsx";

describe("ProjectIntro", () => {
  it("lists the facts as terms and shows the lead paragraph", () => {
    render(
      <ProjectIntro
        id="role-stack"
        facts={[
          { label: "Year", value: "2025" },
          { label: "Type", value: "Personal project" },
        ]}
        text="Spotify Web is a full-stack music catalog."
      />,
    );
    const terms = screen.getAllByRole("term").map((t) => t.textContent);
    expect(terms).toEqual(["Year", "Type"]);
    const values = screen.getAllByRole("definition").map((d) => d.textContent);
    expect(values).toEqual(["2025", "Personal project"]);
    expect(
      screen.getByText("Spotify Web is a full-stack music catalog."),
    ).toBeInTheDocument();
  });
});
