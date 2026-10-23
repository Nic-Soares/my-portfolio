import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Markdown } from "./Markdown.tsx";

describe("Markdown", () => {
  it("renders formatting and https links as elements", () => {
    const { container } = render(
      <p>
        <Markdown text="**Bold** and [site](https://a.dev)" inline />
      </p>,
    );
    expect(container.querySelector("strong")).toHaveTextContent("Bold");
    const link = screen.getByRole("link", { name: "site" });
    expect(link).toHaveAttribute("href", "https://a.dev");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows HTML as text, never as markup", () => {
    const { container } = render(
      <Markdown text='<img src=x onerror="alert(1)">' inline />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container).toHaveTextContent('<img src=x onerror="alert(1)">');
  });

  it("drops links that aren't https, keeping the label", () => {
    render(<Markdown text="[click](javascript:alert)" inline />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("click")).toBeInTheDocument();
  });

  it("renders paragraphs and numbered lists in block mode", () => {
    const { container } = render(<Markdown text={"Lead\n\n1. one\n2. two"} />);
    expect(container.querySelectorAll("p")).toHaveLength(1);
    expect(container.querySelectorAll("ol > li")).toHaveLength(2);
  });
});
