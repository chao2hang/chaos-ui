import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { act } from "@testing-library/react";
import { Spin } from "@/components/ui/spin";
import type { SpinProps } from "@/components/ui/spin";

describe("Spin", () => {
  it("SpinProps type is importable", () => {
    const _p: SpinProps = { spinning: true, delay: 200, tip: "loading" };
    expect(_p.delay).toBe(200);
  });

  it("shows spinner immediately when spinning + no delay", () => {
    const { container } = render(<Spin spinning>content</Spin>);
    expect(container.querySelector('[data-slot="spin"]')).not.toBeNull();
  });

  it("does not show spinner during delay window", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Spin spinning delay={500}>
        content
      </Spin>,
    );
    act(() => {
      vi.advanceTimersByTime(200);
    });
    const overlay = container.querySelector(".absolute.inset-0");
    expect(overlay).toBeNull();
    vi.useRealTimers();
  });

  it("shows spinner after delay elapses", () => {
    vi.useFakeTimers();
    const { container } = render(
      <Spin spinning delay={500}>
        content
      </Spin>,
    );
    act(() => {
      vi.advanceTimersByTime(600);
    });
    const overlay = container.querySelector(".absolute.inset-0");
    expect(overlay).not.toBeNull();
    vi.useRealTimers();
  });

  it("does not show when spinning=false", () => {
    const { container } = render(<Spin spinning={false}>content</Spin>);
    expect(container.querySelector(".absolute.inset-0")).toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/spin");
    expect(mod.Spin).toBeDefined();
  });
});
