import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ProjectPager } from "./ProjectPager.tsx";

const spotify = { slug: "spotify-clone", name: "Spotify Web" };
const reference = { slug: "reference", name: "Reference" };

function renderPager(props: Parameters<typeof ProjectPager>[0]) {
  return render(
    <MemoryRouter>
      <ProjectPager {...props} />
    </MemoryRouter>,
  );
}

describe("ProjectPager", () => {
  it("links to the previous and next project", () => {
    renderPager({ previous: spotify, next: reference });

    expect(
      screen.getByRole("link", { name: /Previous project/ }),
    ).toHaveAttribute("href", "/projects/spotify-clone");
    expect(screen.getByRole("link", { name: /Next project/ })).toHaveAttribute(
      "href",
      "/projects/reference",
    );
  });

  it("shows only Next on the first project and only Previous on the last", () => {
    const { unmount } = renderPager({ previous: null, next: reference });
    expect(screen.queryByRole("link", { name: /Previous project/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Reference/ })).toBeInTheDocument();
    unmount();

    renderPager({ previous: spotify, next: null });
    expect(screen.queryByRole("link", { name: /Next project/ })).toBeNull();
    expect(
      screen.getByRole("link", { name: /Spotify Web/ }),
    ).toBeInTheDocument();
  });

  it("renders nothing when there is no other project", () => {
    renderPager({ previous: null, next: null });
    expect(screen.queryByRole("navigation")).toBeNull();
  });
});
