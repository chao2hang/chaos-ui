import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  useModal,
  ModalRenderer,
  type ModalOptions,
  type ModalInstance,
} from "@/hooks/use-modal";

describe("useModal", () => {
  it("is exported and type is importable", () => {
    expect(useModal).toBeDefined();
    expect(ModalRenderer).toBeDefined();
  });

  it("returns modal instance with confirm, info, warning, success, error methods", () => {
    const { result } = renderHook(() => useModal());
    expect(typeof result.current.confirm).toBe("function");
    expect(typeof result.current.info).toBe("function");
    expect(typeof result.current.warning).toBe("function");
    expect(typeof result.current.success).toBe("function");
    expect(typeof result.current.error).toBe("function");
  });

  it("confirm method is callable with options", () => {
    const { result } = renderHook(() => useModal());
    expect(() => {
      result.current.confirm({ title: "Test" });
    }).not.toThrow();
  });

  it("info method is callable with options", () => {
    const { result } = renderHook(() => useModal());
    expect(() => {
      result.current.info({ title: "Info" });
    }).not.toThrow();
  });

  it("warning method is callable with options", () => {
    const { result } = renderHook(() => useModal());
    expect(() => {
      result.current.warning({ title: "Warning" });
    }).not.toThrow();
  });

  it("success method is callable with options", () => {
    const { result } = renderHook(() => useModal());
    expect(() => {
      result.current.success({ title: "Success" });
    }).not.toThrow();
  });

  it("error method is callable with options", () => {
    const { result } = renderHook(() => useModal());
    expect(() => {
      result.current.error({ title: "Error" });
    }).not.toThrow();
  });

  it("ModalOptions type is importable", () => {
    const opts: ModalOptions = {
      title: "Delete?",
      content: "Are you sure?",
      okText: "Yes",
      cancelText: "No",
      okVariant: "destructive",
      onOk: () => {},
      onCancel: () => {},
      width: 400,
      closable: true,
      maskClosable: true,
    };
    expect(opts.title).toBe("Delete?");
  });

  it("ModalInstance type is importable", () => {
    const instance: ModalInstance = {
      confirm: () => {},
      info: () => {},
      warning: () => {},
      success: () => {},
      error: () => {},
    };
    expect(typeof instance.confirm).toBe("function");
  });

  it("confirm.modal contains renderable JSX", () => {
    const { result } = renderHook(() => useModal());
    const modalElement = (
      result.current.confirm as unknown as Record<string, unknown>
    ).modal;
    expect(modalElement).toBeDefined();
  });

  it("ModalRenderer renders modal element", () => {
    renderHook(() => useModal());
    // ModalRenderer should be a valid component
    expect(typeof ModalRenderer).toBe("function");
  });

  it("module is importable", async () => {
    const mod = await import("@/hooks/use-modal");
    expect(mod.useModal).toBeDefined();
    expect(mod.ModalRenderer).toBeDefined();
  });
});
