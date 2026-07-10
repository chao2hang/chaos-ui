import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { PullToRefresh } from "@/components/mobile/mobile-pull-to-refresh";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("PullToRefresh", () => {
  it("renders children", () => {
    const { container, getByText } = render(
      <PullToRefresh onRefresh={() => {}}>
        <div>content</div>
      </PullToRefresh>,
    );
    expect(
      container.querySelector('[data-slot="pull-to-refresh"]'),
    ).not.toBeNull();
    expect(getByText("content")).toBeTruthy();
  });

  it("exports and module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-pull-to-refresh");
    expect(mod.PullToRefresh).toBeDefined();
  });

  it("triggers onRefresh when pull exceeds threshold", async () => {
    const onRefresh = vi.fn(async () => {});
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;

    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 250 }] }); // dy=150, *0.5=75 >= 60
    fireEvent.touchEnd(el);

    await waitFor(() => {
      expect(onRefresh).toHaveBeenCalled();
    });
  });

  it("does not trigger onRefresh when pull is below threshold", () => {
    const onRefresh = vi.fn();
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 120 }] }); // dy=20, *0.5=10 < 60
    fireEvent.touchEnd(el);
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("does not trigger onRefresh when disabled", () => {
    const onRefresh = vi.fn();
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60} disabled>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 250 }] });
    fireEvent.touchEnd(el);
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("shows custom pull text during pull", () => {
    const { container } = render(
      <PullToRefresh
        onRefresh={() => {}}
        threshold={60}
        pullText="Pull down"
        releaseText="Release now"
        refreshingText="Refreshing"
      >
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 130 }] }); // dy=30, *0.5=15 (pull state)
    expect(screen.getByText("Pull down")).toBeDefined();
  });

  it("shows release text when pull >= threshold", () => {
    const { container } = render(
      <PullToRefresh
        onRefresh={() => {}}
        threshold={60}
        pullText="Pull down"
        releaseText="Release now"
        refreshingText="Refreshing"
      >
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 250 }] }); // 75 >= 60 -> release
    expect(screen.getByText("Release now")).toBeDefined();
  });

  it("falls back to i18n keys when no custom text provided", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => {}} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 130 }] });
    // i18n mock returns the key as text
    expect(screen.getByText("pullToRefresh.pull")).toBeDefined();
  });

  it("awaits async onRefresh and resets after resolve", async () => {
    let resolve: () => void = () => {};
    const onRefresh = vi.fn(
      () =>
        new Promise<void>((res) => {
          resolve = res;
        }),
    );
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 250 }] });
    fireEvent.touchEnd(el);
    await waitFor(() => {
      expect(onRefresh).toHaveBeenCalled();
    });
    resolve();
    await waitFor(() => {
      expect(onRefresh).toHaveReturned();
    });
  });

  it("resets distance when pull released below threshold", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => {}} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 130 }] }); // 15 < 60
    fireEvent.touchEnd(el);
    expect(screen.getByText("content")).toBeDefined();
  });

  it("applies custom className and forwards div props", () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => {}} className="ptr-custom" data-foo="bar">
        <div>content</div>
      </PullToRefresh>,
    );
    const root = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    expect(root.className).toContain("ptr-custom");
    expect(root.getAttribute("data-foo")).toBe("bar");
  });

  it("does not start pull when container scrolled (scrollTop > 0)", () => {
    const onRefresh = vi.fn();
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={60}>
        <div>content</div>
      </PullToRefresh>,
    );
    const el = container.querySelector(
      '[data-slot="pull-to-refresh"]',
    ) as HTMLElement;
    Object.defineProperty(el, "scrollTop", {
      configurable: true,
      value: 50,
    });
    fireEvent.touchStart(el, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(el, { touches: [{ clientY: 250 }] });
    fireEvent.touchEnd(el);
    expect(onRefresh).not.toHaveBeenCalled();
  });
});
