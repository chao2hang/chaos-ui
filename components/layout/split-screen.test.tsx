import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SplitScreen } from "./split-screen";

describe("SplitScreen", () => {
  it("renders both panes", () => {
    render(
      <SplitScreen left={<div>Left pane</div>} right={<div>Right pane</div>} />,
    );
    expect(screen.getByText("Left pane")).toBeDefined();
    expect(screen.getByText("Right pane")).toBeDefined();
  });

  it("renders a separator", () => {
    render(<SplitScreen left="L" right="R" />);
    expect(screen.getByRole("separator")).toBeDefined();
  });

  it("supports vertical direction with horizontal separator", () => {
    render(
      <SplitScreen
        direction="vertical"
        left={<div>Top</div>}
        right={<div>Bottom</div>}
      />,
    );
    expect(screen.getByText("Top")).toBeDefined();
    expect(screen.getByText("Bottom")).toBeDefined();
    const sep = screen.getByRole("separator");
    expect(sep.getAttribute("aria-orientation")).toBe("horizontal");
  });
});
