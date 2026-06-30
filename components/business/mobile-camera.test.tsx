import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileCamera } from "./mobile-camera";
import type { MobileCameraProps } from "./mobile-camera";

// jsdom does not implement mediaDevices; the component should degrade to a
// visible "unsupported" state rather than throwing.

describe("MobileCamera", () => {
  beforeEach(() => {
    // Ensure no mediaDevices so the component reports "unsupported".
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: undefined,
    });
  });

  it("renders an unsupported status message in a headless environment", () => {
    render(<MobileCamera />);
    expect(screen.getByText("当前环境不支持摄像头")).toBeDefined();
  });

  it("renders a retry button when not live", () => {
    render(<MobileCamera />);
    expect(screen.getByText("重试")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileCameraProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });

  it("module exports a function component", () => {
    expect(typeof MobileCamera).toBe("function");
  });
});
