import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { toast } from "sonner";
import {
  useNotification,
  type NotificationInstance,
  type NotificationOptions,
} from "./use-notification";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(() => "success-id"),
    error: vi.fn(() => "error-id"),
    warning: vi.fn(() => "warning-id"),
    info: vi.fn(() => "info-id"),
    dismiss: vi.fn(),
  },
}));

describe("use-notification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exports useNotification", () => {
    expect(useNotification).toBeDefined();
  });

  it("returns a stable notification instance with all methods", () => {
    const { result } = renderHook(() => useNotification());
    const n = result.current as NotificationInstance;
    expect(typeof n.open).toBe("function");
    expect(typeof n.success).toBe("function");
    expect(typeof n.error).toBe("function");
    expect(typeof n.warning).toBe("function");
    expect(typeof n.info).toBe("function");
    expect(typeof n.close).toBe("function");
    expect(typeof n.closeAll).toBe("function");
  });

  it("open() defaults to info type and forwards title + description + duration", () => {
    const { result } = renderHook(() => useNotification());
    const n = result.current;
    let id: string | number = "";
    act(() => {
      id = n.open({ title: "Hello", description: "World", duration: 5000 });
    });
    expect(id).toBe("info-id");
    expect(toast.info).toHaveBeenCalledWith("Hello", {
      description: "World",
      duration: 5000,
    });
  });

  it("open() with explicit type=success calls toast.success", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.open({ title: "Done", type: "success" });
    });
    expect(toast.success).toHaveBeenCalledWith("Done", {});
  });

  it("open() with type=error calls toast.error", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.open({ title: "Failed", type: "error" });
    });
    expect(toast.error).toHaveBeenCalledWith("Failed", {});
  });

  it("open() with type=warning calls toast.warning", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.open({ title: "Careful", type: "warning" });
    });
    expect(toast.warning).toHaveBeenCalledWith("Careful", {});
  });

  it("open() forwards id and action config", () => {
    const { result } = renderHook(() => useNotification());
    const onClick = vi.fn();
    const opts: NotificationOptions = {
      title: "Action",
      id: "my-id",
      action: { label: "Undo", onClick },
    };
    act(() => {
      result.current.open(opts);
    });
    expect(toast.info).toHaveBeenCalledWith("Action", {
      id: "my-id",
      action: { label: "Undo", onClick },
    });
  });

  it("success() shorthand forces success type", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.success({ title: "Saved" });
    });
    expect(toast.success).toHaveBeenCalledWith("Saved", {});
  });

  it("error() shorthand forces error type", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.error({ title: "Boom" });
    });
    expect(toast.error).toHaveBeenCalledWith("Boom", {});
  });

  it("warning() shorthand forces warning type", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.warning({ title: "Hmm" });
    });
    expect(toast.warning).toHaveBeenCalledWith("Hmm", {});
  });

  it("info() shorthand forces info type", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.info({ title: "FYI" });
    });
    expect(toast.info).toHaveBeenCalledWith("FYI", {});
  });

  it("close(id) dismisses only the given id", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.close("target-id");
    });
    expect(toast.dismiss).toHaveBeenCalledWith("target-id");
  });

  it("close() with no id dismisses all", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.close();
    });
    expect(toast.dismiss).toHaveBeenCalledWith();
  });

  it("closeAll() dismisses all toasts", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.closeAll();
    });
    expect(toast.dismiss).toHaveBeenCalledWith();
  });

  it("open() without optional fields passes an empty config object", () => {
    const { result } = renderHook(() => useNotification());
    act(() => {
      result.current.open({ title: "Bare" });
    });
    expect(toast.info).toHaveBeenCalledWith("Bare", {});
  });
});
