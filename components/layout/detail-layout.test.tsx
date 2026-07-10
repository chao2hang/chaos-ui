import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DetailLayout } from "./detail-layout";
import type { DetailTab } from "./detail-layout";

// Breadcrumb primitives are not used here, but DetailLayout imports Tabs (Base UI)
// which is fine in jsdom. Mock i18n defensively in case Button imports it.
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("detail-layout", () => {
  it("exports DetailLayout", () => {
    expect(DetailLayout).toBeDefined();
  });

  it("exports types", () => {
    const _t: DetailTab = { value: "v", label: "L", content: null };
    expect(_t.value).toBe("v");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/detail-layout");
    expect(mod.DetailLayout).toBeDefined();
  });

  it("renders title", () => {
    render(<DetailLayout title="Order #123" />);
    expect(screen.getByText("Order #123")).toBeDefined();
  });

  it("renders subtitle when provided", () => {
    render(<DetailLayout title="Order" subtitle="Created 2024-01-01" />);
    expect(screen.getByText("Created 2024-01-01")).toBeDefined();
  });

  it("omits subtitle paragraph when not provided", () => {
    const { container } = render(<DetailLayout title="Order" />);
    const subtitle = container.querySelector("p.text-muted-foreground");
    expect(subtitle).toBeNull();
  });

  it("renders children when no tabs provided", () => {
    render(
      <DetailLayout title="Order">
        <div>Detail Body</div>
      </DetailLayout>,
    );
    expect(screen.getByText("Detail Body")).toBeDefined();
  });

  it("does not render children when tabs provided (renders tabs instead)", () => {
    render(
      <DetailLayout
        title="Order"
        tabs={[
          { value: "info", label: "Info", content: <div>Info Content</div> },
        ]}
      >
        <div>Hidden Body</div>
      </DetailLayout>,
    );
    // Tab trigger renders
    expect(screen.getByText("Info")).toBeDefined();
    // First tab content is shown by default
    expect(screen.getByText("Info Content")).toBeDefined();
    // Children are not rendered when tabs exist
    expect(screen.queryByText("Hidden Body")).toBeNull();
  });

  it("renders back button and fires onBack", () => {
    const onBack = vi.fn();
    const { container } = render(
      <DetailLayout title="Order" onBack={onBack} />,
    );
    const backBtn = container.querySelector("button");
    expect(backBtn).not.toBeNull();
    fireEvent.click(backBtn!);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("does not render back button when onBack omitted", () => {
    const { container } = render(<DetailLayout title="Order" />);
    expect(container.querySelector("button")).toBeNull();
  });

  it("renders actions on the right", () => {
    render(
      <DetailLayout
        title="Order"
        actions={<button type="button">Save</button>}
      />,
    );
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("switches tab content when a tab trigger is clicked", () => {
    render(
      <DetailLayout
        title="Order"
        tabs={[
          { value: "info", label: "Info", content: <div>Info Content</div> },
          {
            value: "history",
            label: "History",
            content: <div>History Content</div>,
          },
        ]}
      />,
    );
    // Default first tab content visible
    expect(screen.getByText("Info Content")).toBeDefined();
    // Click the History tab trigger
    fireEvent.click(screen.getByText("History"));
    expect(screen.getByText("History Content")).toBeDefined();
  });

  it("renders empty tabs array as children fallback", () => {
    render(
      <DetailLayout title="Order" tabs={[]}>
        <div>Fallback Body</div>
      </DetailLayout>,
    );
    expect(screen.getByText("Fallback Body")).toBeDefined();
  });

  it("applies className to root", () => {
    const { container } = render(
      <DetailLayout title="Order" className="my-detail" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.classList.contains("my-detail")).toBe(true);
  });
});
