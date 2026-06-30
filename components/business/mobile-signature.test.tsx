import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileSignature } from "./mobile-signature";
import type { MobileSignatureProps } from "./mobile-signature";

// jsdom does not implement canvas 2d context; mock it to null so the
// component's null-context guard path is exercised without console noise.

describe("MobileSignature", () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  });

  it("renders the placeholder prompt before signing", () => {
    render(<MobileSignature />);
    expect(screen.getByText("请在此处签名")).toBeDefined();
  });

  it("renders clear and save buttons", () => {
    render(<MobileSignature />);
    expect(screen.getByRole("button", { name: /清除/ })).toBeDefined();
    expect(screen.getByRole("button", { name: /保存/ })).toBeDefined();
  });

  it("keeps save disabled until ink is present", () => {
    render(<MobileSignature />);
    const saveBtn = screen.getByRole("button", { name: /保存/ });
    expect((saveBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders without throwing when canvas context is unavailable", () => {
    render(<MobileSignature />);
    expect(screen.getByText("请在此处签名")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileSignatureProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
