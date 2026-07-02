import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { SignaturePad } from "./signature-pad";
import type { SignaturePadHandle, SignaturePadProps } from "./signature-pad";

// jsdom does not implement canvas 2d context or pointer capture APIs;
// mock them so the component's guard paths are exercised without errors.

describe("SignaturePad", () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    // Mock setPointerCapture / releasePointerCapture (not in jsdom)
    if (!Element.prototype.setPointerCapture) {
      Element.prototype.setPointerCapture = vi.fn();
    }
    if (!Element.prototype.releasePointerCapture) {
      Element.prototype.releasePointerCapture = vi.fn();
    }
  });

  it("renders with data-slot='signature-pad'", () => {
    const { container } = render(<SignaturePad />);
    expect(
      container.querySelector('[data-slot="signature-pad"]'),
    ).not.toBeNull();
  });

  it("renders canvas element", () => {
    const { container } = render(<SignaturePad />);
    expect(
      container.querySelector('[data-slot="signature-pad-canvas"]'),
    ).not.toBeNull();
  });

  it("shows placeholder when empty", () => {
    render(<SignaturePad placeholder="Sign here please" />);
    expect(screen.getByText("Sign here please")).toBeDefined();
  });

  it("renders clear button when showActions is true", () => {
    render(<SignaturePad clearLabel="Reset" />);
    expect(screen.getByRole("button", { name: /Reset/ })).toBeDefined();
  });

  it("renders save button disabled when empty", () => {
    render(<SignaturePad saveLabel="Submit" />);
    const saveBtn = screen.getByRole("button", { name: /Submit/ });
    expect((saveBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders undo button disabled when empty", () => {
    render(<SignaturePad />);
    const undoBtn = screen.getByRole("button", { name: /Undo/ });
    expect((undoBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it("does not render action buttons when showActions=false", () => {
    render(<SignaturePad showActions={false} />);
    expect(
      screen.queryByRole("button", { name: /Clear/ }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Save/ }),
    ).toBeNull();
  });

  it("does not render action buttons in readOnly mode", () => {
    render(<SignaturePad readOnly value="data:image/png;base64,abc" />);
    expect(
      screen.queryByRole("button", { name: /Clear/ }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Save/ }),
    ).toBeNull();
  });

  it("renders read-only image overlay when readOnly with value", () => {
    const { container } = render(
      <SignaturePad readOnly value="data:image/png;base64,testdata" />,
    );
    const img = container.querySelector(
      '[data-slot="signature-pad-readonly"]',
    );
    expect(img).not.toBeNull();
    expect((img as HTMLImageElement).src).toContain("data:image/png");
  });

  it("renders guide line when guideLine prop is true", () => {
    const { container } = render(<SignaturePad guideLine />);
    expect(
      container.querySelector('[data-slot="signature-pad-guideline"]'),
    ).not.toBeNull();
  });

  it("does not render guide line when guideLine is false", () => {
    const { container } = render(<SignaturePad guideLine={false} />);
    expect(
      container.querySelector('[data-slot="signature-pad-guideline"]'),
    ).toBeNull();
  });

  it("adds pointer-events-none to canvas in readOnly mode", () => {
    const { container } = render(
      <SignaturePad readOnly value="data:image/png;base64,abc" />,
    );
    const canvas = container.querySelector(
      '[data-slot="signature-pad-canvas"]',
    );
    expect(canvas?.className).toContain("pointer-events-none");
  });

  it("fires onChange on pointer down", () => {
    const onChangeSpy = vi.fn();
    const { container } = render(<SignaturePad onChange={onChangeSpy} />);
    const canvas = container.querySelector(
      '[data-slot="signature-pad-canvas"]',
    ) as HTMLCanvasElement;
    fireEvent.pointerDown(canvas, {
      clientX: 10,
      clientY: 10,
      pointerId: 1,
    });
    expect(onChangeSpy).toHaveBeenCalledWith(false);
  });

  it("imperative API methods exist on ref", () => {
    const refObj = React.createRef<SignaturePadHandle>();
    render(<SignaturePad ref={refObj} />);
    expect(refObj.current).not.toBeNull();
    expect(typeof refObj.current!.clear).toBe("function");
    expect(typeof refObj.current!.isEmpty).toBe("function");
    expect(typeof refObj.current!.toDataURL).toBe("function");
    expect(typeof refObj.current!.toBlob).toBe("function");
    expect(typeof refObj.current!.undo).toBe("function");
  });

  it("isEmpty returns true initially", () => {
    const refObj = React.createRef<SignaturePadHandle>();
    render(<SignaturePad ref={refObj} />);
    expect(refObj.current!.isEmpty()).toBe(true);
  });

  it("toDataURL returns null when empty", () => {
    const refObj = React.createRef<SignaturePadHandle>();
    render(<SignaturePad ref={refObj} />);
    expect(refObj.current!.toDataURL()).toBeNull();
  });

  it("exports types", () => {
    const _p: SignaturePadProps | undefined = undefined;
    const _h: SignaturePadHandle | undefined = undefined;
    expect(_p).toBeUndefined();
    expect(_h).toBeUndefined();
  });
});
