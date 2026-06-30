import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useApproval } from "./use-approval";

describe("useApproval", () => {
  it("submits and tracks success", async () => {
    const handler = vi.fn(async () => ({ ok: true }));
    const { result } = renderHook(() => useApproval(handler));
    expect(result.current.status).toBe("idle");
    await act(async () => {
      await result.current.submit("approve", "ok");
    });
    expect(handler).toHaveBeenCalledWith("approve", "ok");
    expect(result.current.status).toBe("success");
    expect(result.current.data).toEqual({ ok: true });
  });

  it("tracks errors", async () => {
    const handler = vi.fn(async () => {
      throw new Error("nope");
    });
    const { result } = renderHook(() => useApproval(handler));
    await act(async () => {
      try {
        await result.current.submit("reject");
      } catch {
        // expected
      }
    });
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error?.message).toBe("nope");
  });
});
