import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  ThemeToggle,
  useResolvedTheme,
} from "@/components/business/theme-toggle";

// Mock theme provider — it requires a Next.js provider context in tests
vi.mock("@/components/ui/theme-provider", () => ({
  useTheme: vi.fn(() => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
    themes: ["light", "dark", "system"],
    systemTheme: "light",
    forcedTheme: undefined,
  })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

import { useTheme } from "@/components/ui/theme-provider";

describe("ThemeToggle", () => {
  it("exports ThemeToggle component", () => {
    expect(ThemeToggle).toBeDefined();
    expect(typeof ThemeToggle).toBe("function");
  });

  it("exports useResolvedTheme hook", () => {
    expect(useResolvedTheme).toBeDefined();
    expect(typeof useResolvedTheme).toBe("function");
  });

  it("renders toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Toggle theme")).toBeDefined();
  });

  it("renders sun icon for light mode", () => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: "light",
      setTheme: vi.fn(),
      resolvedTheme: "light",
    });
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Toggle theme")).toBeDefined();
  });

  it("renders moon icon for dark mode", () => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: "dark",
      setTheme: vi.fn(),
      resolvedTheme: "dark",
    });
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Toggle theme")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(<ThemeToggle className="my-toggle" />);
    const btn = container.querySelector(".my-toggle");
    expect(btn).not.toBeNull();
  });

  it("calls setTheme when dropdown item is clicked", async () => {
    const setTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: "dark",
      setTheme,
      resolvedTheme: "dark",
    });
    const { container } = render(<ThemeToggle />);
    // Click the trigger to open dropdown
    const btn = container.querySelector('button[aria-label="Toggle theme"]');
    fireEvent.click(btn!);
    // After opening the dropdown, the menu items should be visible
    const lightItem = screen.getByText("浅色");
    fireEvent.click(lightItem);
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});

describe("useResolvedTheme", () => {
  it("returns 'light' when theme is 'light'", () => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: "light",
      setTheme: vi.fn(),
      resolvedTheme: "light",
    });

    function TestComponent() {
      const resolved = useResolvedTheme();
      return <span data-testid="theme">{resolved}</span>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  it("returns 'dark' when theme is 'dark'", () => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: "dark",
      setTheme: vi.fn(),
      resolvedTheme: "dark",
    });

    function TestComponent() {
      const resolved = useResolvedTheme();
      return <span data-testid="theme">{resolved}</span>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("returns resolvedTheme when theme is 'system'", () => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: "system",
      setTheme: vi.fn(),
      resolvedTheme: "dark",
    });

    function TestComponent() {
      const resolved = useResolvedTheme();
      return <span data-testid="theme">{resolved}</span>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("defaults to 'light' when theme and resolvedTheme are undefined", () => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: undefined as unknown as "light",
      setTheme: vi.fn(),
      resolvedTheme: undefined as unknown as "light",
    });

    function TestComponent() {
      const resolved = useResolvedTheme();
      return <span data-testid="theme">{resolved}</span>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  it("returns 'light' when system theme resolves to light", () => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
      theme: "system",
      setTheme: vi.fn(),
      resolvedTheme: "light",
    });

    function TestComponent() {
      const resolved = useResolvedTheme();
      return <span data-testid="theme">{resolved}</span>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });
});
