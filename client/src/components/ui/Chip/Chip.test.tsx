import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Chip from "./Chip.tsx";
import ChipRow from "./ChipRow.tsx";

describe("Chip", () => {
  it("is static text when it has no action", () => {
    render(<Chip label="#Python" />);
    expect(screen.getByText("#Python")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("is a toggle button when clickable", () => {
    const onClick = vi.fn();
    render(<Chip label="TypeScript" selected onClick={onClick} />);
    const chip = screen.getByRole("button", { name: "TypeScript" });
    expect(chip).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("shows a leading icon or an avatar", () => {
    const { container } = render(
      <>
        <Chip label="Icon" leadingIcon="database" />
        <Chip label="Avatar" avatar="/me.png" />
      </>,
    );
    expect(screen.getByText("database")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("removes through its own closing button", () => {
    const onRemove = vi.fn();
    render(<Chip label="SQL" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove SQL" }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("disables every action", () => {
    render(
      <Chip label="Off" disabled onClick={() => {}} onRemove={() => {}} />,
    );
    for (const button of screen.getAllByRole("button")) {
      expect(button).toBeDisabled();
    }
  });

  it("lists chips in a row", () => {
    render(
      <ChipRow ariaLabel="Skills">
        <Chip label="A" />
        <Chip label="B" />
      </ChipRow>,
    );
    expect(screen.getByRole("list", { name: "Skills" }).children).toHaveLength(
      2,
    );
  });
});
