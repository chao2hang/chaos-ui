import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLineEditor } from "./use-line-editor";

describe("useLineEditor", () => {
  it("starts, edits, commits", async () => {
    const onCommit = vi.fn();
    const { result } = renderHook(() =>
      useLineEditor<string>("initial", { onCommit }),
    );
    expect(result.current.isEditing).toBe(false);
    act(() => result.current.start());
    expect(result.current.isEditing).toBe(true);
    act(() => result.current.setDraft("changed"));
    expect(result.current.dirty).toBe(true);
    await act(async () => {
      await result.current.commit();
    });
    expect(onCommit).toHaveBeenCalledWith("changed");
    expect(result.current.isEditing).toBe(false);
  });

  it("cancel reverts draft", () => {
    const { result } = renderHook(() => useLineEditor<string>("initial"));
    act(() => result.current.start());
    act(() => result.current.setDraft("temp"));
    act(() => result.current.cancel());
    expect(result.current.draft).toBe("initial");
    expect(result.current.isEditing).toBe(false);
  });

  it("validate blocks commit", async () => {
    const onCommit = vi.fn();
    const { result } = renderHook(() =>
      useLineEditor<string>("", { onCommit, validate: (v) => (v ? null : "required") }),
    );
    act(() => result.current.start());
    await act(async () => {
      await result.current.commit();
    });
    expect(result.current.error).toBe("required");
    expect(onCommit).not.toHaveBeenCalled();
  });
});
