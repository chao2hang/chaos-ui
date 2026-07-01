import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MobileEmptyState,
  type MobileEmptyStateProps,
} from "@/components/mobile/mobile-empty-state";

// Mock react-i18next since EmptyState uses useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (_key: string, fallback: string) => fallback,
  }),
}));

describe("MobileEmptyState", () => {
  it("is exported and type is importable", () => {
    expect(MobileEmptyState).toBeDefined();
    const _p: MobileEmptyStateProps = {};
    expect(_p).toBeDefined();
  });

  it("renders with default variant", () => {
    render(<MobileEmptyState />);
    // Default variant shows "No data" from EmptyState fallback
    expect(screen.getByText("No data")).toBeDefined();
  });

  it("renders with custom title", () => {
    render(<MobileEmptyState title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeDefined();
  });

  it("renders with custom description", () => {
    render(<MobileEmptyState description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeDefined();
  });

  it("renders with custom icon", () => {
    const CustomIcon = () => <span data-testid="custom-icon">Icon</span>;
    render(<MobileEmptyState icon={CustomIcon} />);
    expect(screen.getByTestId("custom-icon")).toBeDefined();
  });

  it("renders action when provided", () => {
    render(<MobileEmptyState action={<button type="button">Retry</button>} />);
    expect(screen.getByText("Retry")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(<MobileEmptyState className="my-empty" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("my-empty");
  });

  it("applies py-8 padding class from MobileEmptyState", () => {
    const { container } = render(<MobileEmptyState />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("py-8");
  });

  it("renders search variant", () => {
    render(<MobileEmptyState variant="search" />);
    expect(screen.getByText("No results")).toBeDefined();
  });

  it("renders error variant", () => {
    render(<MobileEmptyState variant="error" />);
    expect(screen.getByText("Something went wrong")).toBeDefined();
  });

  it("renders network variant", () => {
    render(<MobileEmptyState variant="network" />);
    expect(screen.getByText("No connection")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-empty-state");
    expect(mod.MobileEmptyState).toBeDefined();
  });
});
