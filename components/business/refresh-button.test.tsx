import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RefreshButton } from "./refresh-button";

describe("RefreshButton", () => {
  it("renders default label", () => {
    render(<RefreshButton onClick={vi.fn()} />);
    expect(screen.getByText("刷新")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<RefreshButton onClick={onClick} />);
    fireEvent.click(screen.getByText("刷新"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables when loading", () => {
    render(<RefreshButton onClick={vi.fn()} loading />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveProperty("disabled", true);
  });

  it("supports custom label", () => {
    render(<RefreshButton onClick={vi.fn()} label="Reload" />);
    expect(screen.getByText("Reload")).toBeDefined();
  });
});
