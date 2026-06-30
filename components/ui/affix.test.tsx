import { describe, it, expect, vi, afterEach, beforeAll } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Affix } from "@/components/ui/affix";
import type { AffixProps } from "@/components/ui/affix";

// jsdom's default Element.prototype.getBoundingClientRect returns all-zeros.
// The Affix effect calls handleScroll() on mount (before tests can patch the
// wrapper node), and with a zero rect the offsetTop branch computes
// `0 - 0 < offsetTop` → affixed immediately, muddying assertions. We override
// getBoundingClientRect at the prototype level per-test so the mount-time call
// sees the intended rect, and restore it afterwards.
let origGBCR: typeof Element.prototype.getBoundingClientRect;

function setGBCR(rect: DOMRect) {
  origGBCR = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () {
    return rect;
  };
}

function restoreGBCR() {
  Element.prototype.getBoundingClientRect = origGBCR;
}

function targetRect(): DOMRect {
  return {
    top: 0,
    bottom: 800,
    left: 0,
    right: 1000,
    width: 1000,
    height: 800,
    x: 0,
    y: 0,
    toJSON() {},
  } as DOMRect;
}

function rect(top: number, bottom: number, width = 200, height = 40, left = 10): DOMRect {
  return {
    top,
    bottom,
    left,
    right: left + width,
    width,
    height,
    x: left,
    y: top,
    toJSON() {},
  } as DOMRect;
}

beforeAll(() => {
  // ensure restoreGBCR has a baseline to restore from
  origGBCR = Element.prototype.getBoundingClientRect;
});

afterEach(restoreGBCR);

describe("Affix", () => {
  it("AffixProps type is importable", () => {
    const _p: AffixProps = {
      children: <div>content</div>,
      offsetTop: 100,
      onChange: () => {},
    };
    expect(_p.offsetTop).toBe(100);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/affix");
    expect(mod.Affix).toBeDefined();
  });

  it("renders children", () => {
    setGBCR(rect(200, 900));
    const { getByText, container } = render(
      <Affix offsetTop={100}>
        <div>Pinned Toolbar</div>
      </Affix>,
    );
    expect(getByText("Pinned Toolbar")).toBeDefined();
    expect(container.querySelector("div")).not.toBeNull();
  });

  it("applies wrapperClassName to the wrapper div", () => {
    setGBCR(rect(200, 900));
    const { container } = render(
      <Affix offsetTop={100} wrapperClassName="my-wrapper">
        <div>x</div>
      </Affix>,
    );
    expect(container.querySelector(".my-wrapper")).not.toBeNull();
  });

  it("does not affix when disabled (no onChange fired)", () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    setGBCR(rect(50, 750));
    render(
      <Affix offsetTop={100} disabled target={() => fakeTarget} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    fireEvent.scroll(fakeTarget);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("fires onChange(true) and applies fixed style when scrolled past offsetTop", async () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    // mount non-affixed (top 200 > 100)
    setGBCR(rect(200, 900));
    const { container } = render(
      <Affix
        offsetTop={100}
        target={() => fakeTarget}
        onChange={onChange}
        className="affixed-class"
      >
        <div>content</div>
      </Affix>,
    );
    expect(onChange).not.toHaveBeenCalled();

    // scroll → top 50 < 100 → affixed
    setGBCR(rect(50, 750));
    fireEvent.scroll(fakeTarget);
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(true));
    const inner = container.querySelector(".affixed-class") as HTMLElement;
    await waitFor(() => expect(inner.style.position).toBe("fixed"));
    expect(inner.style.top).toBe("100px");
    expect(inner.style.left).toBe("10px");
  });

  it("captures placeholder width/height when affixed (offsetTop)", async () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    setGBCR(rect(200, 900));
    const { container } = render(
      <Affix offsetTop={100} target={() => fakeTarget} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    const wrapper = container.querySelector("div") as HTMLElement;
    setGBCR(rect(50, 750, 200, 40, 10));
    fireEvent.scroll(fakeTarget);
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(true));
    // The wrapper keeps the placeholder dimensions so layout doesn't collapse.
    expect(wrapper.style.width).toBe("200px");
    expect(wrapper.style.height).toBe("40px");
  });

  it("handles offsetBottom branch (affixed)", async () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    setGBCR(rect(0, 700)); // 800 - 700 = 100 < offsetBottom 50? no → not affixed
    const { container } = render(
      <Affix offsetBottom={50} target={() => fakeTarget} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    expect(onChange).not.toHaveBeenCalled();

    // rect.bottom 760 → 800-760 = 40 < 50 → affixed
    setGBCR(rect(0, 760));
    fireEvent.scroll(fakeTarget);
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(true));
    const inner = container.querySelector('div > div[class]') as HTMLElement;
    await waitFor(() => expect(inner.style.position).toBe("fixed"));
    expect(inner.style.bottom).toBe("50px");
  });

  it("offsetBottom not affixed when target bottom far from rect", () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    // rect.bottom 100 → 800-100 = 700, not < 50 → not affixed
    setGBCR(rect(0, 100));
    render(
      <Affix offsetBottom={50} target={() => fakeTarget} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    fireEvent.scroll(fakeTarget);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("reverts to non-affixed when scrolling back above threshold", async () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    setGBCR(rect(200, 900));
    const { container } = render(
      <Affix offsetTop={100} target={() => fakeTarget} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    // affix
    setGBCR(rect(50, 750));
    fireEvent.scroll(fakeTarget);
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(true));
    const inner = container.querySelector('div > div[class]') as HTMLElement;
    await waitFor(() => expect(inner.style.position).toBe("fixed"));

    // scroll back up
    setGBCR(rect(150, 850));
    fireEvent.scroll(fakeTarget);
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(false));
    await waitFor(() => expect(inner.style.position).toBe(""));
  });

  it("placeholder style is cleared when reverting from affixed", async () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    setGBCR(rect(200, 900));
    const { container } = render(
      <Affix offsetTop={100} target={() => fakeTarget} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    const wrapper = container.querySelector("div") as HTMLElement;
    setGBCR(rect(50, 750));
    fireEvent.scroll(fakeTarget);
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(true));
    expect(wrapper.style.width).toBe("200px");

    setGBCR(rect(150, 850));
    fireEvent.scroll(fakeTarget);
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(false));
    expect(wrapper.style.width).toBe("");
    expect(wrapper.style.height).toBe("");
  });

  it("defaults to window target when target is undefined", () => {
    setGBCR(rect(200, 900));
    const { container } = render(
      <Affix offsetTop={100}>
        <div>w</div>
      </Affix>,
    );
    fireEvent.scroll(window);
    expect(container.querySelector("div")).not.toBeNull();
  });

  it("listens to window resize and re-evaluates", async () => {
    const onChange = vi.fn();
    setGBCR(rect(200, 900));
    const { container } = render(
      <Affix offsetTop={100} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    expect(onChange).not.toHaveBeenCalled();
    setGBCR(rect(50, 750));
    fireEvent.resize(window);
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(true));
    expect(container.querySelector("div")).not.toBeNull();
  });

  it("does not affix when offsetTop threshold not crossed", () => {
    const onChange = vi.fn();
    const fakeTarget = document.createElement("div");
    fakeTarget.getBoundingClientRect = () => targetRect();
    // top 200 → 200 - 0 = 200, not < 100 → not affixed
    setGBCR(rect(200, 900));
    render(
      <Affix offsetTop={100} target={() => fakeTarget} onChange={onChange}>
        <div>content</div>
      </Affix>,
    );
    fireEvent.scroll(fakeTarget);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders without offsetTop or offsetBottom (no affix logic active)", () => {
    setGBCR(rect(200, 900));
    const { getByText } = render(
      <Affix>
        <div>no offsets</div>
      </Affix>,
    );
    expect(getByText("no offsets")).toBeDefined();
  });
});
