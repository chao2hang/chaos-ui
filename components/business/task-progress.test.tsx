import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskProgress } from "./task-progress";

describe("TaskProgress", () => {
  it("renders status and percent", () => {
    render(<TaskProgress percent={75} status="running" message="生成中" />);
    expect(screen.getByText("running")).toBeDefined();
    expect(screen.getByText("75%")).toBeDefined();
    expect(screen.getByText("生成中")).toBeDefined();
  });

  it("clamps percent to 0-100", () => {
    render(<TaskProgress percent={250} status="pending" />);
    expect(screen.getByText("100%")).toBeDefined();
  });

  it("exposes a progressbar with aria-valuenow", () => {
    render(<TaskProgress percent={42} status="running" />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("42");
  });
});
