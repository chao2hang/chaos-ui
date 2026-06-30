import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignActionButton } from "./sign-action-button";

describe("SignActionButton", () => {
  it("renders the default sign label when unsigned", () => {
    render(<SignActionButton onSign={() => {}} />);
    expect(screen.getByRole("button", { name: "签收" })).toBeDefined();
  });

  it("renders the signed label and is disabled when signed", () => {
    render(<SignActionButton signed />);
    const btn = screen.getByRole("button", { name: "已签收" });
    expect(btn.hasAttribute("disabled")).toBe(true);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });

  it("invokes onSign when clicked", () => {
    const onSign = vi.fn();
    render(<SignActionButton onSign={onSign} />);
    fireEvent.click(screen.getByRole("button", { name: "签收" }));
    expect(onSign).toHaveBeenCalledTimes(1);
  });

  it("uses a custom label when provided", () => {
    render(<SignActionButton label="电子签章" onSign={() => {}} />);
    expect(screen.getByRole("button", { name: "电子签章" })).toBeDefined();
  });

  it("does not invoke onSign when already signed", () => {
    const onSign = vi.fn();
    render(<SignActionButton signed onSign={onSign} />);
    fireEvent.click(screen.getByRole("button", { name: "已签收" }));
    expect(onSign).not.toHaveBeenCalled();
  });
});
