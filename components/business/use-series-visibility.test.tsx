import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSeriesVisibility } from "./use-series-visibility";

describe("useSeriesVisibility", () => {
  it("starts with no hidden series by default", () => {
    const { result } = renderHook(() => useSeriesVisibility());
    expect(result.current.hiddenNames).toEqual([]);
    expect(result.current.isHidden("订单")).toBe(false);
  });

  it("honors defaultHiddenSeries", () => {
    const { result } = renderHook(() =>
      useSeriesVisibility({ defaultHiddenSeries: ["费用"] }),
    );
    expect(result.current.isHidden("费用")).toBe(true);
    expect(result.current.hiddenNames).toEqual(["费用"]);
  });

  it("toggles series visibility and notifies callback", async () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useSeriesVisibility({ onSeriesVisibilityChange: onChange }),
    );

    act(() => {
      result.current.toggle("订单");
    });
    expect(result.current.isHidden("订单")).toBe(true);
    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(["订单"]);
    });

    act(() => {
      result.current.toggle("订单");
    });
    expect(result.current.isHidden("订单")).toBe(false);
    await vi.waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith([]);
    });
  });

  it("allows all series to be hidden", () => {
    const { result } = renderHook(() => useSeriesVisibility());
    act(() => {
      result.current.toggle("订单");
      result.current.toggle("费用");
    });
    expect(result.current.isHidden("订单")).toBe(true);
    expect(result.current.isHidden("费用")).toBe(true);
    expect(result.current.hiddenNames).toEqual(["订单", "费用"].sort());
  });

  it("ignores toggle when interactiveLegend is false", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useSeriesVisibility({
        interactiveLegend: false,
        onSeriesVisibilityChange: onChange,
      }),
    );
    act(() => {
      result.current.toggle("订单");
    });
    expect(result.current.isHidden("订单")).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});
