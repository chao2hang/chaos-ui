import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useImport } from "./use-import";

describe("useImport", () => {
  it("parses text into rows", async () => {
    const { result } = renderHook(() =>
      useImport<{ name: string }>(),
    );
    const file = { text: async () => "raw" } as unknown as File;
    await act(async () => {
      await result.current.importFile(file, (text) => [{ name: text }]);
    });
    expect(result.current.rows).toEqual([{ name: "raw" }]);
    expect(result.current.progress).toBe(1);
  });

  it("captures parse errors", async () => {
    const { result } = renderHook(() => useImport());
    const file = { text: async () => "x" } as unknown as File;
    await act(async () => {
      await result.current.importFile(file, () => {
        throw new Error("bad");
      });
    });
    expect(result.current.errors[0]?.message).toBe("bad");
  });

  it("reset clears state", async () => {
    const { result } = renderHook(() => useImport());
    const file = { text: async () => "x" } as unknown as File;
    await act(async () => {
      await result.current.importFile(file, () => [{ a: 1 }] as never);
    });
    act(() => result.current.reset());
    expect(result.current.rows).toEqual([]);
  });
});
