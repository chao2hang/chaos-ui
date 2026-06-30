import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusTag, statusConfig } from "./status-tag";
import type { Status, StatusTagProps } from "./status-tag";

describe("StatusTag", () => {
  it("exports StatusTag", () => {
    expect(StatusTag).toBeDefined();
  });

  it("exports statusConfig", () => {
    expect(statusConfig).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: Status | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: StatusTagProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders the default label for each status", () => {
    const { rerender } = render(<StatusTag status="draft" />);
    expect(screen.getByText("Draft")).toBeDefined();
    rerender(<StatusTag status="pending" />);
    expect(screen.getByText("Pending")).toBeDefined();
    rerender(<StatusTag status="approved" />);
    expect(screen.getByText("Approved")).toBeDefined();
    rerender(<StatusTag status="rejected" />);
    expect(screen.getByText("Rejected")).toBeDefined();
    rerender(<StatusTag status="completed" />);
    expect(screen.getByText("Completed")).toBeDefined();
    rerender(<StatusTag status="cancelled" />);
    expect(screen.getByText("Cancelled")).toBeDefined();
  });

  it("applies status-specific className", () => {
    const { container } = render(<StatusTag status="approved" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-info/15");
    expect(badge.className).toContain("text-info");
  });

  it("applies destructive classes for rejected", () => {
    const { container } = render(<StatusTag status="rejected" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("text-destructive");
  });

  it("applies line-through for cancelled", () => {
    const { container } = render(<StatusTag status="cancelled" />);
    expect((container.firstChild as HTMLElement).className).toContain("line-through");
  });

  it("label prop overrides the default label", () => {
    render(<StatusTag status="draft" label="My Draft" />);
    expect(screen.getByText("My Draft")).toBeDefined();
    expect(screen.queryByText("Draft")).toBeNull();
  });

  it("renders unknown status string with fallback classes", () => {
    const { container } = render(<StatusTag status="archived" />);
    expect(screen.getByText("archived")).toBeDefined();
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-muted");
  });

  it("lowercases the status before lookup", () => {
    render(<StatusTag status="APPROVED" />);
    expect(screen.getByText("Approved")).toBeDefined();
  });

  it("size=sm adds small sizing classes", () => {
    const { container } = render(<StatusTag status="draft" size="sm" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("h-4");
    expect(badge.className).toContain("text-[0.65rem]");
  });

  it("size defaults to default (no sm classes)", () => {
    const { container } = render(<StatusTag status="draft" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).not.toContain("h-4");
  });

  it("statusConfig contains all 6 statuses", () => {
    const keys = Object.keys(statusConfig);
    expect(keys).toEqual(
      expect.arrayContaining([
        "draft",
        "pending",
        "approved",
        "rejected",
        "completed",
        "cancelled",
      ]),
    );
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/status-tag");
    expect(mod.StatusTag).toBeDefined();
  });
});
