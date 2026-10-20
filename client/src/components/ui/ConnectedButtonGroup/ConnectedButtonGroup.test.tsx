import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ConnectedButtonGroup from "./ConnectedButtonGroup.tsx";

const options = [{ label: "A" }, { label: "B" }, { label: "C" }];

describe("ConnectedButtonGroup selection modes", () => {
  it("single (default): one segment at a time", () => {
    render(<ConnectedButtonGroup options={options} />);
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    fireEvent.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "B" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("multiple: segments toggle independently", () => {
    const onChange = vi.fn();
    render(
      <ConnectedButtonGroup
        options={options}
        selectionMode="multiple"
        onSelectedIndicesChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "C" }));
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(onChange).toHaveBeenLastCalledWith([0, 2]);
    fireEvent.click(screen.getByRole("button", { name: "C" }));
    expect(onChange).toHaveBeenLastCalledWith([0]);
  });
});
