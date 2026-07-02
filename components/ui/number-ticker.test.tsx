import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { NumberTicker } from "@/components/ui/number-ticker";

describe("NumberTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders with data-slot", () => {
    const { container } = render(<NumberTicker value={100} duration={0} />);
    expect(container.querySelector('[data-slot="number-ticker"]')).not.toBeNull();
  });

  it("renders with initial value (from=0 by default)", () => {
    const { container } = render(<NumberTicker value={100} duration={0} />);
    const valueEl = container.querySelector('[data-slot="number-ticker-value"]');
    expect(valueEl?.textContent).toBe("100");
  });

  it("animates from 'from' to 'value'", () => {
    // Suppress benign act() warning from recursive requestAnimationFrame scheduling
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(
      <NumberTicker value={100} from={50} duration={1000} easing="linear" />
    );
    act(() => {
      vi.advanceTimersByTime(16);
    });
    const valueEl = container.querySelector('[data-slot="number-ticker-value"]');
    // After first frame, value has moved slightly from 50 towards 100
    const numVal = parseFloat(valueEl?.textContent ?? "0");
    expect(numVal).toBeGreaterThanOrEqual(50);
    expect(numVal).toBeLessThan(100);
  });

  it("reaches target value after animation completes", () => {
    const { container } = render(
      <NumberTicker value={100} from={0} duration={1000} easing="linear" />
    );

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    const valueEl = container.querySelector('[data-slot="number-ticker-value"]');
    expect(valueEl?.textContent).toBe("100");
  });

  it("applies format function", () => {
    const format = (n: number) => `$${n.toFixed(2)}`;
    const { container } = render(
      <NumberTicker value={99.5} format={format} duration={0} />
    );
    const valueEl = container.querySelector('[data-slot="number-ticker-value"]');
    expect(valueEl?.textContent).toBe("$99.50");
  });

  it("respects decimals prop", () => {
    const { container } = render(
      <NumberTicker value={42.567} decimals={2} duration={0} />
    );
    const valueEl = container.querySelector('[data-slot="number-ticker-value"]');
    expect(valueEl?.textContent).toBe("42.57");
  });

  it("renders prefix", () => {
    const { container } = render(
      <NumberTicker value={100} prefix="$" duration={0} />
    );
    const prefixEl = container.querySelector('[data-slot="number-ticker-prefix"]');
    expect(prefixEl?.textContent).toBe("$");
  });

  it("renders suffix", () => {
    const { container } = render(
      <NumberTicker value={100} suffix="%" duration={0} />
    );
    const suffixEl = container.querySelector('[data-slot="number-ticker-suffix"]');
    expect(suffixEl?.textContent).toBe("%");
  });

  it("renders both prefix and suffix", () => {
    const { container } = render(
      <NumberTicker value={50} prefix="From" suffix="items" duration={0} />
    );
    expect(container.querySelector('[data-slot="number-ticker-prefix"]')?.textContent).toBe("From");
    expect(container.querySelector('[data-slot="number-ticker-suffix"]')?.textContent).toBe("items");
  });

  it("skips animation when prefers-reduced-motion is active", () => {
    // Override matchMedia to indicate reduced motion preference
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    const { container } = render(
      <NumberTicker value={100} from={0} duration={1000} />
    );

    // Should immediately show final value without animation
    const valueEl = container.querySelector('[data-slot="number-ticker-value"]');
    expect(valueEl?.textContent).toBe("100");

    window.matchMedia = originalMatchMedia;
  });

  it("applies custom className to root element", () => {
    const { container } = render(
      <NumberTicker value={42} className="text-2xl font-bold" duration={0} />
    );
    const root = container.querySelector('[data-slot="number-ticker"]');
    expect(root?.className).toContain("text-2xl");
    expect(root?.className).toContain("font-bold");
  });

  it("forwards additional span props", () => {
    render(<NumberTicker value={42} data-testid="ticker" duration={0} />);
    expect(screen.getByTestId("ticker")).toBeDefined();
  });
});
