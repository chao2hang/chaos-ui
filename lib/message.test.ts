import { describe, it, expect, vi, beforeEach } from "vitest";
import { message } from "./message";
import type {
  MessageType,
  MessagePlacement,
  MessageOptions,
  MessageGlobalConfig,
} from "./message";

// Mock sonner: capture every call's (content, config) so we assert wiring.
// vi.hoisted ensures the mock fns exist before the (hoisted) vi.mock factory runs.
const { toastMock, methodMocks } = vi.hoisted(() => {
  const toastMock = vi.fn<(content: unknown, config?: unknown) => string>();
  toastMock.mockReturnValue("base-id");
  const methodMocks = {
    success: vi.fn<(content: unknown, config?: unknown) => string>(),
    error: vi.fn<(content: unknown, config?: unknown) => string>(),
    warning: vi.fn<(content: unknown, config?: unknown) => string>(),
    info: vi.fn<(content: unknown, config?: unknown) => string>(),
    loading: vi.fn<(content: unknown, config?: unknown) => string>(),
    dismiss: vi.fn<(id?: string | number) => void>(),
    promise: vi.fn(),
  };
  methodMocks.success.mockReturnValue("s-id");
  methodMocks.error.mockReturnValue("e-id");
  methodMocks.warning.mockReturnValue("w-id");
  methodMocks.info.mockReturnValue("i-id");
  methodMocks.loading.mockReturnValue("l-id");
  return { toastMock, methodMocks };
});

vi.mock("sonner", () => ({
  toast: Object.assign(toastMock, methodMocks),
}));

describe("message", () => {
  beforeEach(() => {
    Object.values(methodMocks).forEach((m) => m.mockClear());
    toastMock.mockClear();
  });

  it("exports message", () => {
    expect(message).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: MessageType | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MessagePlacement | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: MessageOptions | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: MessageGlobalConfig | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });

  it("base call forwards content + built config", () => {
    message("hi");
    expect(toastMock).toHaveBeenCalledTimes(1);
    expect(toastMock.mock.calls[0]![0]).toBe("hi");
    // with no options, config is an empty object
    expect(toastMock.mock.calls[0]![1]).toEqual({});
  });

  it("success forwards to toast.success", () => {
    message.success("done");
    expect(methodMocks.success).toHaveBeenCalledTimes(1);
    expect(methodMocks.success.mock.calls[0]![0]).toBe("done");
  });

  it("error forwards to toast.error", () => {
    message.error("fail");
    expect(methodMocks.error).toHaveBeenCalledWith("fail", expect.any(Object));
  });

  it("warning forwards to toast.warning", () => {
    message.warning("careful");
    expect(methodMocks.warning).toHaveBeenCalledTimes(1);
  });

  it("info forwards to toast.info", () => {
    message.info("note");
    expect(methodMocks.info).toHaveBeenCalledTimes(1);
  });

  it("loading forwards to toast.loading and defaults duration to 0", () => {
    message.loading("loading...");
    expect(methodMocks.loading).toHaveBeenCalledTimes(1);
    expect(methodMocks.loading.mock.calls[0]![1]).toMatchObject({
      duration: 0,
    });
  });

  it("loading honors an explicit duration instead of 0", () => {
    message.loading("loading...", { duration: 5 });
    // Public API is seconds; sonner receives milliseconds.
    expect(methodMocks.loading.mock.calls[0]![1]).toMatchObject({
      duration: 5000,
    });
  });

  it("maps options.key -> config.id", () => {
    message.success("x", { key: "my-key" });
    expect(methodMocks.success.mock.calls[0]![1]).toMatchObject({
      id: "my-key",
    });
  });

  it("maps options.duration (seconds) -> config.duration (ms)", () => {
    message.success("x", { duration: 7 });
    expect(methodMocks.success.mock.calls[0]![1]).toMatchObject({
      duration: 7000,
    });
  });

  it("maps options.description -> config.description", () => {
    message.success("x", { description: "sub" });
    expect(methodMocks.success.mock.calls[0]![1]).toMatchObject({
      description: "sub",
    });
  });

  it("maps options.action -> config.action with label+onClick", () => {
    const onClick = vi.fn();
    message.success("x", { action: { label: "Undo", onClick } });
    expect(methodMocks.success.mock.calls[0]![1]).toMatchObject({
      action: { label: "Undo", onClick },
    });
  });

  it("maps options.icon -> config.icon", () => {
    message.success("x", { icon: "ICON" });
    expect(methodMocks.success.mock.calls[0]![1]).toMatchObject({
      icon: "ICON",
    });
  });

  it("maps options.className -> config.classNames.toast", () => {
    message.success("x", { className: "my-class" });
    expect(methodMocks.success.mock.calls[0]![1]).toEqual({
      classNames: { toast: "my-class" },
    });
  });

  it("maps options.onClick / onDismiss / onAutoClose", () => {
    const onClick = vi.fn();
    const onDismiss = vi.fn();
    const onAutoClose = vi.fn();
    message.success("x", { onClick, onDismiss, onAutoClose });
    expect(methodMocks.success.mock.calls[0]![1]).toMatchObject({
      onClick,
      onDismiss,
      onAutoClose,
    });
  });

  it("builds no config keys when options omitted/empty", () => {
    message.success("x");
    expect(methodMocks.success.mock.calls[0]![1]).toEqual({});
  });

  it("promise forwards to toast.promise with loading default", async () => {
    methodMocks.promise.mockResolvedValue("resolved");
    const p = message.promise(Promise.resolve("data"), {
      success: "ok",
      error: "err",
    });
    expect(methodMocks.promise).toHaveBeenCalledTimes(1);
    const [promiseArg, cfg] = methodMocks.promise.mock.calls[0]!;
    expect(promiseArg).toBeInstanceOf(Promise);
    expect(cfg).toMatchObject({
      loading: "Loading...",
      success: "ok",
      error: "err",
    });
    await p;
  });

  it("promise honors an explicit loading message", async () => {
    methodMocks.promise.mockResolvedValue(undefined);
    await message.promise(Promise.resolve(1), { loading: "custom load" });
    expect(methodMocks.promise.mock.calls[0]![1]).toMatchObject({
      loading: "custom load",
    });
  });

  it("destroy without id calls toast.dismiss with no args", () => {
    message.destroy();
    expect(methodMocks.dismiss).toHaveBeenCalledTimes(1);
    expect(methodMocks.dismiss.mock.calls[0]![0]).toBeUndefined();
  });

  it("destroy with id calls toast.dismiss(id)", () => {
    message.destroy("toast-1");
    expect(methodMocks.dismiss).toHaveBeenCalledWith("toast-1");
  });

  it("config is callable without throwing", () => {
    expect(() => message.config({ duration: 10, maxCount: 3 })).not.toThrow();
  });
});
