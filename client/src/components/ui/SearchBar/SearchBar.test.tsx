import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SearchBar from "./SearchBar.tsx";

describe("SearchBar", () => {
  it("clears the query with a keyboard-reachable button", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox", { name: "Search input" });
    fireEvent.change(input, { target: { value: "spotify" } });

    const clear = screen.getByRole("button", { name: "Clear search" });
    expect(clear.tagName).toBe("BUTTON");
    expect(clear).not.toHaveAttribute("tabindex", "-1");

    fireEvent.click(clear);
    expect(input).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
  });
});
