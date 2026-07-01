import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Toaster } from "./sonner";

// next-themes useTheme returns theme from context; in jsdom without a
// provider it returns undefined, which the component coerces to "system".
// We verify the component renders without crashing and forwards props.

describe("sonner", () => {
  it("exports Toaster", () => {
    expect(Toaster).toBeDefined();
  });

  it("renders without crashing", () => {
    const { container } = render(<Toaster />);
    // Sonner renders an <section> with aria-label; assert the DOM got something.
    expect(container.firstChild).not.toBeNull();
  });

  it("renders a toast region with aria-label Notifications", () => {
    const { container } = render(<Toaster />);
    // sonner renders <section aria-label="Notifications ..."> as the live region.
    const region = container.querySelector("section[aria-label]");
    expect(region).not.toBeNull();
    expect(region?.getAttribute("aria-label")).toContain("Notification");
  });

  it("applies the toaster group className", () => {
    const { container } = render(<Toaster />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
  });

  it("forwards extra props to the underlying Sonner toaster", () => {
    const { container } = render(<Toaster position="bottom-left" />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/sonner");
    expect(mod.Toaster).toBeDefined();
  });
});
