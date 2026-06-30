import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BarcodeDisplay } from "./barcode-display";
import type { BarcodeDisplayProps } from "./barcode-display";

describe("barcode-display", () => {
  it("exports BarcodeDisplay", () => {
    expect(BarcodeDisplay).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BarcodeDisplayProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders the value text below bars by default", () => {
    const { getByText, container } = render(
      <BarcodeDisplay value="1234567890" />,
    );
    expect(getByText("1234567890")).toBeDefined();
    expect(container.querySelector('[data-slot="barcode-display"]')).not.toBeNull();
  });

  it("hides the value text when showText=false", () => {
    const { queryByText } = render(
      <BarcodeDisplay value="ABC123" showText={false} />,
    );
    expect(queryByText("ABC123")).toBeNull();
  });

  it("renders an accessible role=img with aria-label", () => {
    const { container } = render(<BarcodeDisplay value="X1" />);
    const img = container.querySelector('[role="img"]');
    expect(img).not.toBeNull();
    expect(img?.getAttribute("aria-label")).toBe("Barcode: X1");
  });

  it("renders bars whose count depends on value length (start/stop + 2 per char)", () => {
    const { container } = render(<BarcodeDisplay value="A" />);
    // generateBars: [2,1, ...bars(2 per char), 2,1] = 2 + 2 + 2 = 6 bars for 1-char value
    const bars = container.querySelectorAll('[role="img"] > div');
    expect(bars.length).toBe(6);
    // 2-char value → 2 + 4 + 2 = 8
    const { container: c2 } = render(<BarcodeDisplay value="AB" showText={false} />);
    expect(c2.querySelectorAll('[role="img"] > div').length).toBe(8);
  });

  it("applies custom height to the bar container", () => {
    const { container } = render(
      <BarcodeDisplay value="A" height={72} />,
    );
    const img = container.querySelector('[role="img"]') as HTMLElement;
    expect(img.style.height).toBe("72px");
  });

  it("applies barWidth multiplier to each bar width", () => {
    const { container } = render(
      <BarcodeDisplay value="A" barWidth={3} />,
    );
    const bars = container.querySelectorAll('[role="img"] > div');
    // first bar width = base width (2) * barWidth (3) = 6px
    expect((bars[0] as HTMLElement).style.width).toBe("6px");
  });

  it("alternates bar background between foreground and transparent", () => {
    const { container } = render(<BarcodeDisplay value="AB" />);
    const bars = container.querySelectorAll('[role="img"] > div');
    expect((bars[0] as HTMLElement).className).toContain("bg-foreground");
    expect((bars[1] as HTMLElement).className).toContain("bg-transparent");
  });

  it("merges custom className and forwards div props", () => {
    const { container } = render(
      <BarcodeDisplay value="A" className="my-barcode" id="bc-1" />,
    );
    const root = container.querySelector('[data-slot="barcode-display"]') as HTMLElement;
    expect(root.className).toContain("my-barcode");
    expect(root.id).toBe("bc-1");
  });

  it("generates deterministic bars for the same value", () => {
    const { container: a } = render(<BarcodeDisplay value="SAME" showText={false} />);
    const barsA = a.querySelectorAll('[role="img"] > div');
    const widthsA = Array.from(barsA).map((b) => (b as HTMLElement).style.width);

    const { container: b } = render(<BarcodeDisplay value="SAME" showText={false} />);
    const barsB = b.querySelectorAll('[role="img"] > div');
    const widthsB = Array.from(barsB).map((b) => (b as HTMLElement).style.width);

    expect(widthsA).toEqual(widthsB);
  });
});
