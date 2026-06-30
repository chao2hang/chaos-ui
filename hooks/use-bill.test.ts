import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBill } from "./use-bill";

describe("useBill", () => {
  it("starts in draft", () => {
    const { result } = renderHook(() => useBill());
    expect(result.current.status).toBe("draft");
    expect(result.current.history).toEqual(["draft"]);
  });

  it("allows valid transitions and blocks invalid ones", () => {
    const { result } = renderHook(() => useBill("draft"));
    expect(result.current.transition("paid")).toBe(false);
    expect(result.current.can("submitted")).toBe(true);
    act(() => result.current.transition("submitted"));
    expect(result.current.status).toBe("submitted");
    act(() => result.current.transition("approved"));
    expect(result.current.status).toBe("approved");
    act(() => result.current.transition("paid"));
    expect(result.current.status).toBe("paid");
    expect(result.current.history).toEqual(["draft", "submitted", "approved", "paid"]);
  });

  it("reset returns to a status", () => {
    const { result } = renderHook(() => useBill("approved"));
    act(() => result.current.reset("draft"));
    expect(result.current.status).toBe("draft");
    expect(result.current.history).toEqual(["draft"]);
  });
});
