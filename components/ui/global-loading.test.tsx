import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { GlobalLoading } from "./global-loading";
import type { GlobalLoadingProps } from "./global-loading";

describe("GlobalLoading", () => {
  it("exports GlobalLoading", () => {
    expect(GlobalLoading).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: GlobalLoadingProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders nothing when loading is false", () => {
    const { container } = render(<GlobalLoading loading={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders when loading is true", () => {
    const { container } = render(<GlobalLoading loading={true} />);
    const root = container.querySelector('[data-slot="global-loading"]');
    expect(root).not.toBeNull();
  });

  it("renders the inner Spinner component", () => {
    const { container } = render(<GlobalLoading loading={true} />);
    const spinner = container.querySelector('[data-slot="spinner"]');
    expect(spinner).not.toBeNull();
  });

  it("renders loading text", () => {
    const { container } = render(
      <GlobalLoading loading={true} text="Fetching..." />,
    );
    const textEl = container.querySelector('[data-slot="global-loading-text"]');
    expect(textEl?.textContent).toBe("Fetching...");
  });

  it("does not render spinner when spinner=false", () => {
    const { container } = render(
      <GlobalLoading loading={true} spinner={false} />,
    );
    expect(container.querySelector('[data-slot="spinner"]')).toBeNull();
  });

  it("applies fullscreen classes by default", () => {
    const { container } = render(<GlobalLoading loading={true} />);
    const root = container.querySelector('[data-slot="global-loading"]');
    expect(root?.classList.contains("fixed")).toBe(true);
  });

  it("applies inline classes when fullscreen=false", () => {
    const { container } = render(
      <GlobalLoading loading={true} fullscreen={false} />,
    );
    const root = container.querySelector('[data-slot="global-loading"]');
    expect(root?.classList.contains("fixed")).toBe(false);
    expect(root?.classList.contains("min-h-20")).toBe(true);
  });
});
