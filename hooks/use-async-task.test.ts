import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsyncTask } from "./use-async-task";

describe("useAsyncTask", () => {
  it("runs and resolves data", async () => {
    const task = vi.fn(async () => "done");
    const { result } = renderHook(() => useAsyncTask(task));
    expect(result.current.status).toBe("idle");
    let value: unknown;
    await act(async () => {
      value = await result.current.run();
    });
    expect(value).toBe("done");
    expect(result.current.status).toBe("success");
    expect(result.current.data).toBe("done");
  });

  it("tracks errors and supports reset", async () => {
    const task = vi.fn(async () => {
      throw new Error("fail");
    });
    const { result } = renderHook(() => useAsyncTask(task));
    await act(async () => {
      try {
        await result.current.run();
      } catch {
        // expected
      }
    });
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error?.message).toBe("fail");
    act(() => result.current.reset());
    expect(result.current.status).toBe("idle");
  });
});
