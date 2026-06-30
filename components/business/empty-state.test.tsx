import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState, variantConfig } from "@/components/business/empty-state";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string, fallback?: string) => fallback ?? k, i18n: { language: "en" } }),
}));

describe("empty-state", () => {
  it("exports EmptyState and variantConfig", () => {
    expect(EmptyState).toBeDefined();
    expect(variantConfig).toBeDefined();
    expect(variantConfig.default).toBeDefined();
    expect(variantConfig.search).toBeDefined();
    expect(variantConfig.error).toBeDefined();
    expect(variantConfig.network).toBeDefined();
  });

  it("renders default variant fallback texts", () => {
    render(<EmptyState />);
    expect(screen.getByText("No data")).toBeDefined();
    expect(
      screen.getByText("There are no items to display."),
    ).toBeDefined();
  });

  it("renders search variant fallback texts", () => {
    render(<EmptyState variant="search" />);
    expect(screen.getByText("No results")).toBeDefined();
    expect(
      screen.getByText("Try adjusting your search or filter criteria."),
    ).toBeDefined();
  });

  it("renders error variant fallback texts", () => {
    render(<EmptyState variant="error" />);
    expect(screen.getByText("Something went wrong")).toBeDefined();
  });

  it("renders network variant fallback texts", () => {
    render(<EmptyState variant="network" />);
    expect(screen.getByText("No connection")).toBeDefined();
  });

  it("renders custom title and description overriding fallback", () => {
    render(
      <EmptyState title="自定义标题" description="自定义描述" />,
    );
    expect(screen.getByText("自定义标题")).toBeDefined();
    expect(screen.getByText("自定义描述")).toBeDefined();
  });

  it("renders texts prop overriding i18n (skips useTranslation)", () => {
    render(
      <EmptyState texts={{ title: "T1", description: "D1" }} />,
    );
    expect(screen.getByText("T1")).toBeDefined();
    expect(screen.getByText("D1")).toBeDefined();
  });

  it("renders action node when provided", () => {
    render(
      <EmptyState
        action={<button type="button" data-testid="act">刷新</button>}
      />,
    );
    expect(screen.getByTestId("act")).toBeDefined();
  });

  it("falls back to default config for unknown variant", () => {
    render(<EmptyState variant="unknown-variant" />);
    expect(screen.getByText("No data")).toBeDefined();
  });

  it("renders custom icon component", () => {
    const CustomIcon = (props: { className?: string }) => (
      <svg data-testid="ci" className={props.className} />
    );
    render(<EmptyState icon={CustomIcon} />);
    expect(screen.getByTestId("ci")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/empty-state");
    expect(mod.EmptyState).toBeDefined();
  });
});
