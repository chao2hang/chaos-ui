import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileGeolocation } from "./mobile-geolocation";
import type { MobileGeolocationProps } from "./mobile-geolocation";

describe("MobileGeolocation", () => {
  let getCurrentPosition: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getCurrentPosition = vi.fn();
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition },
    });
  });

  it("renders the idle prompt before locating", () => {
    render(<MobileGeolocation />);
    expect(screen.getByText("点击按钮获取当前位置")).toBeDefined();
    expect(screen.getByText("获取定位")).toBeDefined();
  });

  it("shows a locating message after clicking the button", () => {
    getCurrentPosition.mockImplementation(() => undefined);
    render(<MobileGeolocation />);
    fireEvent.click(screen.getByText("获取定位"));
    expect(screen.getByText("正在定位…")).toBeDefined();
  });

  it("calls onLocate and shows coordinates on success", () => {
    const onLocate = vi.fn();
    getCurrentPosition.mockImplementation((onSuccess: (p: { coords: { latitude: number; longitude: number } }) => void) =>
      onSuccess({ coords: { latitude: 31.230416, longitude: 121.473701 } }),
    );
    render(<MobileGeolocation onLocate={onLocate} />);
    fireEvent.click(screen.getByText("获取定位"));
    expect(onLocate).toHaveBeenCalledWith({ lat: 31.230416, lng: 121.473701 });
    expect(screen.getByText(/31\.230416° N/)).toBeDefined();
    expect(screen.getByText(/121\.473701° E/)).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileGeolocationProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
