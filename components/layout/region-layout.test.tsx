import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RegionLayout } from "./region-layout";
import type { RegionLayoutProps } from "./region-layout";

describe("region-layout", () => {
  it("exports RegionLayout", () => {
    expect(RegionLayout).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/region-layout");
    expect(mod.RegionLayout).toBeDefined();
  });

  it("exports types", () => {
    const _p: RegionLayoutProps | undefined = undefined;
    expect(_p).toBeUndefined();
  });

  it("renders only the main region when no optional regions are provided", () => {
    render(<RegionLayout main={<div>Main Content</div>} />);
    expect(screen.getByText("Main Content")).toBeDefined();
    const main = screen.getByText("Main Content").closest("main");
    expect(main).not.toBeNull();
  });

  it("renders top, left, main, right, and bottom regions", () => {
    render(
      <RegionLayout
        top={<div>Header</div>}
        left={<div>Side Nav</div>}
        main={<div>Body</div>}
        right={<div>Inspector</div>}
        bottom={<div>Footer</div>}
      />,
    );
    expect(screen.getByText("Header")).toBeDefined();
    expect(screen.getByText("Side Nav")).toBeDefined();
    expect(screen.getByText("Body")).toBeDefined();
    expect(screen.getByText("Inspector")).toBeDefined();
    expect(screen.getByText("Footer")).toBeDefined();
  });

  it("renders left region inside an aside with border-r", () => {
    const { container } = render(
      <RegionLayout left={<div>Left</div>} main={<div>Main</div>} />,
    );
    const asides = container.querySelectorAll("aside");
    expect(asides.length).toBe(1);
    expect(asides[0]?.classList.contains("border-r")).toBe(true);
  });

  it("renders right region inside an aside with border-l", () => {
    const { container } = render(
      <RegionLayout right={<div>Right</div>} main={<div>Main</div>} />,
    );
    const asides = container.querySelectorAll("aside");
    expect(asides.length).toBe(1);
    expect(asides[0]?.classList.contains("border-l")).toBe(true);
  });

  it("applies default leftWidth and rightWidth to asides", () => {
    const { container } = render(
      <RegionLayout
        left={<div>L</div>}
        main={<div>M</div>}
        right={<div>R</div>}
      />,
    );
    const asides = container.querySelectorAll("aside");
    expect(asides[0]?.getAttribute("style") ?? "").toContain("width: 260px");
    expect(asides[1]?.getAttribute("style") ?? "").toContain("width: 320px");
  });

  it("applies custom leftWidth and rightWidth", () => {
    const { container } = render(
      <RegionLayout
        left={<div>L</div>}
        main={<div>M</div>}
        right={<div>R</div>}
        leftWidth={180}
        rightWidth="240px"
      />,
    );
    const asides = container.querySelectorAll("aside");
    expect(asides[0]?.getAttribute("style") ?? "").toContain("width: 180px");
    expect(asides[1]?.getAttribute("style") ?? "").toContain("width: 240px");
  });

  it("sets resize:horizontal on asides when resizable", () => {
    const { container } = render(
      <RegionLayout
        left={<div>L</div>}
        main={<div>M</div>}
        right={<div>R</div>}
        resizableLeft
        resizableRight
      />,
    );
    const asides = container.querySelectorAll("aside");
    expect(asides[0]?.getAttribute("style") ?? "").toContain("resize: horizontal");
    expect(asides[1]?.getAttribute("style") ?? "").toContain("resize: horizontal");
  });

  it("omits resize style when not resizable", () => {
    const { container } = render(
      <RegionLayout left={<div>L</div>} main={<div>M</div>} />,
    );
    const aside = container.querySelector("aside");
    expect(aside?.getAttribute("style") ?? "").not.toContain("resize");
  });

  it("applies gap style to the middle row", () => {
    const { container } = render(
      <RegionLayout left={<div>L</div>} main={<div>M</div>} gap={12} />,
    );
    const middle = container.querySelector("main")?.parentElement;
    expect(middle?.getAttribute("style") ?? "").toContain("gap: 12px");
  });

  it("applies a custom className on the root", () => {
    const { container } = render(
      <RegionLayout main={<div>M</div>} className="custom-region" />,
    );
    const root = container.firstElementChild;
    expect(root?.classList.contains("custom-region")).toBe(true);
  });

  // ---- Deeper interaction tests ----

  it("renders the main region inside a <main> element that fills remaining space", () => {
    const { container } = render(
      <RegionLayout
        left={<div>L</div>}
        main={<div>M</div>}
        right={<div>R</div>}
      />,
    );
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
    expect(main?.classList.contains("flex-1")).toBe(true);
    expect(main?.classList.contains("overflow-auto")).toBe(true);
  });

  it("renders the top region in a shrink-0 wrapper", () => {
    render(
      <RegionLayout top={<div>Top</div>} main={<div>M</div>} />,
    );
    const topWrap = screen.getByText("Top").parentElement;
    expect(topWrap?.classList.contains("shrink-0")).toBe(true);
  });

  it("renders the bottom region in a bordered, shrink-0 wrapper", () => {
    render(
      <RegionLayout bottom={<div>Bottom</div>} main={<div>M</div>} />,
    );
    const bottomWrap = screen.getByText("Bottom").parentElement;
    expect(bottomWrap?.classList.contains("shrink-0")).toBe(true);
    expect(bottomWrap?.classList.contains("border-t")).toBe(true);
  });

  it("renders left and right asides simultaneously with distinct borders", () => {
    const { container } = render(
      <RegionLayout
        left={<div>L</div>}
        main={<div>M</div>}
        right={<div>R</div>}
      />,
    );
    const asides = container.querySelectorAll("aside");
    expect(asides.length).toBe(2);
    expect(asides[0]?.classList.contains("border-r")).toBe(true);
    expect(asides[1]?.classList.contains("border-l")).toBe(true);
  });

  it("uses default gap of 0 (no gap style on the middle row) when not provided", () => {
    const { container } = render(
      <RegionLayout left={<div>L</div>} main={<div>M</div>} />,
    );
    const middle = container.querySelector("main")?.parentElement;
    // gap=0 -> inline style gap: 0 still present
    expect(middle?.getAttribute("style") ?? "").toContain("gap: 0");
  });

  it("applies a string width verbatim to the left aside", () => {
    const { container } = render(
      <RegionLayout left={<div>L</div>} main={<div>M</div>} leftWidth="200px" />,
    );
    const aside = container.querySelector("aside");
    expect(aside?.getAttribute("style") ?? "").toContain("width: 200px");
  });

  it("does not render left/right/top/bottom wrappers when omitted", () => {
    const { container } = render(<RegionLayout main={<div>M</div>} />);
    expect(container.querySelectorAll("aside").length).toBe(0);
    expect(container.querySelector("main")).not.toBeNull();
  });

  it("asides are resizable only on the side enabled", () => {
    const { container } = render(
      <RegionLayout
        left={<div>L</div>}
        main={<div>M</div>}
        right={<div>R</div>}
        resizableLeft
        resizableRight={false}
      />,
    );
    const asides = container.querySelectorAll("aside");
    expect(asides[0]?.getAttribute("style") ?? "").toContain("resize: horizontal");
    expect(asides[1]?.getAttribute("style") ?? "").not.toContain("resize");
  });
});
