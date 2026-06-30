import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  GlobalLoadingProvider,
  useGlobalLoading,
  GlobalLoadingContext,
} from "./global-loading";
import type {
  GlobalLoadingProviderProps,
  GlobalLoadingContextValue,
} from "./global-loading";

function Probe({
  onState,
}: {
  onState: (v: ReturnType<typeof useGlobalLoading>) => void;
}) {
  const value = useGlobalLoading();
  onState(value);
  return null;
}

describe("global-loading", () => {
  it("exports GlobalLoadingProvider", () => {
    expect(GlobalLoadingProvider).toBeDefined();
  });

  it("exports useGlobalLoading", () => {
    expect(useGlobalLoading).toBeDefined();
  });

  it("exports GlobalLoadingContext", () => {
    expect(GlobalLoadingContext).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: GlobalLoadingProviderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: GlobalLoadingContextValue | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("does not render the overlay by default", () => {
    const { container } = render(
      <GlobalLoadingProvider>
        <span>app content</span>
      </GlobalLoadingProvider>,
    );
    expect(screen.getByText("app content")).toBeDefined();
    expect(
      container.querySelector('[data-slot="global-loading"]'),
    ).toBeNull();
  });

  it("renders the overlay after show() with a tip", () => {
    function Consumer() {
      const { show } = useGlobalLoading();
      return (
        <button type="button" onClick={() => show("Loading data...")}>
          trigger
        </button>
      );
    }
    const { container } = render(
      <GlobalLoadingProvider>
        <Consumer />
      </GlobalLoadingProvider>,
    );
    fireEvent.click(screen.getByText("trigger"));
    expect(
      container.querySelector('[data-slot="global-loading"]'),
    ).not.toBeNull();
    expect(screen.getByText("Loading data...")).toBeDefined();
    expect(screen.getByRole("status")).toBeDefined();
  });

  it("uses defaultTip when show() called with no argument", () => {
    function Consumer() {
      const { show } = useGlobalLoading();
      return (
        <button type="button" onClick={() => show()}>
          trigger
        </button>
      );
    }
    render(
      <GlobalLoadingProvider defaultTip="默认加载中">
        <Consumer />
      </GlobalLoadingProvider>,
    );
    fireEvent.click(screen.getByText("trigger"));
    expect(screen.getByText("默认加载中")).toBeDefined();
  });

  it("hides the overlay after hide()", () => {
    function Consumer() {
      const { show, hide } = useGlobalLoading();
      return (
        <>
          <button type="button" onClick={() => show("visible")}>
            show
          </button>
          <button type="button" onClick={() => hide()}>
            hide
          </button>
        </>
      );
    }
    const { container } = render(
      <GlobalLoadingProvider>
        <Consumer />
      </GlobalLoadingProvider>,
    );
    fireEvent.click(screen.getByText("show"));
    expect(
      container.querySelector('[data-slot="global-loading"]'),
    ).not.toBeNull();
    fireEvent.click(screen.getByText("hide"));
    expect(
      container.querySelector('[data-slot="global-loading"]'),
    ).toBeNull();
  });

  it("provides visible=false in default context when used outside provider", () => {
    const seen = vi.fn();
    render(<Probe onState={seen} />);
    expect(seen).toHaveBeenCalled();
    const value = seen.mock.calls[0]![0];
    expect(value.visible).toBe(false);
  });

  it("applies zIndex to the overlay", () => {
    function Consumer() {
      const { show } = useGlobalLoading();
      return (
        <button type="button" onClick={() => show()}>
          trigger
        </button>
      );
    }
    const { container } = render(
      <GlobalLoadingProvider zIndex={1234}>
        <Consumer />
      </GlobalLoadingProvider>,
    );
    fireEvent.click(screen.getByText("trigger"));
    const overlay = container.querySelector(
      '[data-slot="global-loading"]',
    ) as HTMLElement;
    expect(overlay.style.zIndex).toBe("1234");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/global-loading");
    expect(mod.GlobalLoadingProvider).toBeDefined();
  });
});
