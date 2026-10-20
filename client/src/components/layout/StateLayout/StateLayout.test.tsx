import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import StateIllustration from "./StateIllustration.tsx";
import StateLayout, { type StateAction } from "./StateLayout.tsx";

vi.stubGlobal(
  "matchMedia",
  vi.fn(() => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  })),
);

function renderState(props: Partial<Parameters<typeof StateLayout>[0]> = {}) {
  return render(
    <MemoryRouter initialEntries={["/missing"]}>
      <Routes>
        <Route
          path="/missing"
          element={
            <StateLayout
              illustration={<div data-testid="art" />}
              headline="Page not found"
              supportingText="The link you followed doesn't exist."
              {...props}
            />
          }
        />
        <Route path="/" element={<p>Home page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("StateLayout", () => {
  it("renders the illustration, headline and supporting text", () => {
    renderState();
    expect(screen.getByTestId("art")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The link you followed doesn't exist."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("uses an h2 when it sits inside a page", () => {
    renderState({ headingLevel: "h2" });
    expect(
      screen.getByRole("heading", { level: 2, name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("renders no buttons without actions", () => {
    renderState();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("runs a handler action and navigates with a route action", () => {
    const onRetry = vi.fn();
    const actions: [StateAction, StateAction] = [
      { label: "Try again", onClick: onRetry },
      { label: "Back to home", to: "/" },
    ];
    renderState({ actions });

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByRole("button", { name: "Back to home" }));
    expect(screen.getByText("Home page")).toBeInTheDocument();
  });
});

describe("StateIllustration", () => {
  it("is decorative and shows its mark", () => {
    const { container } = render(
      <StateIllustration
        shape="very-sunny"
        color="primary-container"
        decor={[
          {
            shape: "gem",
            color: "tertiary-container",
            x: 268,
            y: -16,
            size: 96,
          },
          {
            shape: "pill",
            color: "secondary-container",
            x: -22,
            y: 268,
            size: 64,
          },
        ]}
        mark="404"
      />,
    );
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.querySelectorAll("svg")).toHaveLength(3);
    expect(root).toHaveTextContent("404");
  });
});
