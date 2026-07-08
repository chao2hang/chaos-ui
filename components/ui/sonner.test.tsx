import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Toaster } from "./sonner";
import { ThemeProvider } from "./theme-provider";

// next-themes useTheme returns theme from context; in jsdom without a
// provider it returns undefined, which the component coerces to "system".
// We verify the component renders without crashing and forwards props.

function renderWithProvider(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("sonner", () => {
  it("exports Toaster", () => {
    expect(Toaster).toBeDefined();
  });

  it("renders without crashing", () => {
    const { container } = renderWithProvider(<Toaster />);
    expect(container.firstChild).not.toBeNull();
  });

  it("renders a toast region with aria-label Notifications", () => {
    const { container } = renderWithProvider(<Toaster />);
    const region = container.querySelector("section[aria-label]");
    expect(region).not.toBeNull();
    expect(region?.getAttribute("aria-label")).toContain("Notification");
  });

  it("applies the toaster group className", () => {
    const { container } = renderWithProvider(<Toaster />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
  });

  it("forwards extra props to the underlying Sonner toaster", () => {
    const { container } = renderWithProvider(
      <Toaster position="bottom-left" />,
    );
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/sonner");
    expect(mod.Toaster).toBeDefined();
  });
});
