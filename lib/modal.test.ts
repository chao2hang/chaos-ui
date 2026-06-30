import { describe, it, expect, vi, beforeEach } from "vitest";
import { Modal } from "./modal";
import type { ModalConfirmOptions, ModalAlertOptions } from "./modal";

// Capture what modalStore.push receives so we can assert wiring.
const pushMock = vi.fn<(config: Record<string, unknown>) => string>();
pushMock.mockImplementation((config) => {
  // Store the resolve callback so tests can invoke it.
  lastPushed = config as unknown as {
    kind: string;
    resolve?: (v: boolean | undefined) => Promise<void>;
  };
  return "test-id";
});
const closeAllMock = vi.fn();

let lastPushed: {
  kind: string;
  resolve?: (v: boolean | undefined) => Promise<void>;
} | null = null;

vi.mock("@/lib/modal-store", () => ({
  modalStore: {
    push: (config: Record<string, unknown>) => pushMock(config),
    closeAll: () => closeAllMock(),
  },
}));

describe("modal", () => {
  beforeEach(() => {
    pushMock.mockClear();
    closeAllMock.mockClear();
    lastPushed = null;
  });

  it("exports Modal", () => {
    expect(Modal).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: ModalConfirmOptions | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ModalAlertOptions | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("Modal.confirm pushes a confirm modal", () => {
    Modal.confirm({ title: "Sure?", content: "body" });
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(lastPushed!.kind).toBe("confirm");
  });

  it("Modal.info pushes an info modal", () => {
    Modal.info({ title: "tip" });
    expect(lastPushed!.kind).toBe("info");
  });

  it("Modal.warning pushes a warning modal", () => {
    Modal.warning({ title: "warn" });
    expect(lastPushed!.kind).toBe("warning");
  });

  it("Modal.success pushes a success modal", () => {
    Modal.success({ title: "ok" });
    expect(lastPushed!.kind).toBe("success");
  });

  it("Modal.error pushes an error modal with destructive okVariant", () => {
    Modal.error({ title: "err" });
    expect(lastPushed!.kind).toBe("error");
    // The push payload should carry okVariant: "destructive"
    expect(pushMock.mock.calls[0]![0]).toMatchObject({ okVariant: "destructive" });
  });

  it("confirm forwards rest options (title, content, okText, width, maskClosable)", () => {
    Modal.confirm({
      title: "T",
      content: "C",
      okText: "ok",
      cancelText: "cancel",
      width: 520,
      maskClosable: false,
      closable: true,
    });
    expect(pushMock.mock.calls[0]![0]).toMatchObject({
      title: "T",
      content: "C",
      okText: "ok",
      cancelText: "cancel",
      width: 520,
      maskClosable: false,
      closable: true,
    });
  });

  it("resolve(true) calls onOk", async () => {
    const onOk = vi.fn();
    Modal.confirm({ title: "t", onOk });
    expect(lastPushed!.resolve).toBeDefined();
    await lastPushed!.resolve!(true);
    expect(onOk).toHaveBeenCalledTimes(1);
  });

  it("resolve(false) calls onCancel", () => {
    const onCancel = vi.fn();
    Modal.confirm({ title: "t", onCancel });
    lastPushed!.resolve!(false);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("resolve(undefined) calls neither onOk nor onCancel", async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    Modal.confirm({ title: "t", onOk, onCancel });
    await lastPushed!.resolve!(undefined);
    expect(onOk).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("resolve(true) swallows onOk rejection (async error branch)", async () => {
    const onOk = vi.fn(() => Promise.reject(new Error("boom")));
    Modal.confirm({ title: "t", onOk });
    // Should not throw
    await expect(lastPushed!.resolve!(true)).resolves.toBeUndefined();
    expect(onOk).toHaveBeenCalledTimes(1);
  });

  it("resolve(true) awaits async onOk before returning", async () => {
    let settle!: () => void;
    const onOkPromise = new Promise<void>((r) => {
      settle = r;
    });
    const onOk = vi.fn(() => onOkPromise);
    Modal.confirm({ title: "t", onOk });
    const p = lastPushed!.resolve!(true);
    // While onOk is pending, the resolve promise must not have settled.
    let settled = false;
    void p.then(() => {
      settled = true;
    });
    // Flush microtasks — promise should still be pending because onOk is pending.
    await Promise.resolve();
    await Promise.resolve();
    expect(settled).toBe(false);
    settle();
    await p;
    expect(settled).toBe(true);
    expect(onOk).toHaveBeenCalledTimes(1);
  });

  it("Modal.closeAll delegates to modalStore.closeAll", () => {
    Modal.closeAll();
    expect(closeAllMock).toHaveBeenCalledTimes(1);
  });

  it("alert methods (info/warning/success/error) drop cancelText", () => {
    Modal.info({ title: "i" });
    expect(pushMock.mock.calls[0]![0]).toMatchObject({ cancelText: undefined });
    Modal.warning({ title: "w" });
    Modal.success({ title: "s" });
    Modal.error({ title: "e" });
    expect(pushMock).toHaveBeenCalledTimes(4);
  });
});
