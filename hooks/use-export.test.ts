import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useExport } from "./use-export";

vi.mock("@/lib/download", () => ({
  download: {
    text: vi.fn(),
    blob: vi.fn(),
  },
}));

describe("useExport", () => {
  it("downloads text and tracks progress", async () => {
    const { download } = await import("@/lib/download");
    const { result } = renderHook(() => useExport());
    await act(async () => {
      await result.current.exportFile(async () => "hello", "f.txt");
    });
    expect(download.text).toHaveBeenCalledWith("f.txt", "hello", "text/plain");
    expect(result.current.progress).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });

  it("downloads blobs", async () => {
    const { download } = await import("@/lib/download");
    const blob = new Blob(["x"]);
    const { result } = renderHook(() => useExport());
    await act(async () => {
      await result.current.exportFile(async () => blob, "f.bin");
    });
    expect(download.blob).toHaveBeenCalledWith("f.bin", blob);
  });

  it("captures errors", async () => {
    const { result } = renderHook(() => useExport());
    await act(async () => {
      await result.current.exportFile(async () => {
        throw new Error("boom");
      }, "f.txt");
    });
    expect(result.current.error?.message).toBe("boom");
  });
});
