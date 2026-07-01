import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MobileCard,
  type MobileCardProps,
} from "@/components/mobile/mobile-card";

describe("MobileCard", () => {
  it("is exported and type is importable", () => {
    expect(MobileCard).toBeDefined();
    const _p: MobileCardProps = { children: "hello" };
    expect(_p.children).toBe("hello");
  });

  it("renders children content", () => {
    render(<MobileCard>Card body</MobileCard>);
    expect(screen.getByText("Card body")).toBeDefined();
  });

  it("renders title when provided", () => {
    render(<MobileCard title="My Title">Content</MobileCard>);
    expect(screen.getByText("My Title")).toBeDefined();
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("renders description when provided", () => {
    render(<MobileCard description="A description">Content</MobileCard>);
    expect(screen.getByText("A description")).toBeDefined();
  });

  it("renders both title and description", () => {
    render(
      <MobileCard title="Title" description="Desc">
        Content
      </MobileCard>,
    );
    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Desc")).toBeDefined();
  });

  it("renders actions in footer when provided", () => {
    render(
      <MobileCard actions={<button type="button">Action</button>}>
        Content
      </MobileCard>,
    );
    expect(screen.getByText("Action")).toBeDefined();
  });

  it("does not render header section when title and description are absent", () => {
    const { container } = render(<MobileCard>Just content</MobileCard>);
    // CardHeader should not be rendered

    const header = container.querySelector("[data-slot='card-header']");
    expect(header).toBeNull();
  });

  it("renders header section when only title is provided", () => {
    render(<MobileCard title="T">Content</MobileCard>);
    expect(screen.getByText("T")).toBeDefined();
  });

  it("renders header section when only description is provided", () => {
    render(<MobileCard description="D">Content</MobileCard>);
    expect(screen.getByText("D")).toBeDefined();
  });

  it("does not render footer when actions is not provided", () => {
    const { container } = render(<MobileCard>Content</MobileCard>);
    const footer = container.querySelector("[data-slot='card-footer']");
    expect(footer).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MobileCard className="my-custom">Content</MobileCard>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("my-custom");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-card");
    expect(mod.MobileCard).toBeDefined();
  });
});
