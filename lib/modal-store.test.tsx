import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { modalStore, useImperativeModals } from "./modal-store";
import type { ModalKind, ImperativeModalConfig } from "./modal-store";

// A consumer component that renders the count + titles of open modals,
// so we can assert the external store drives a React render.
function ModalList() {
  const modals = useImperativeModals();
  return (
    <div>
      <span data-testid="count">{modals.length}</span>
      <ul>
        {modals.map((m) => (
          <li key={m.id} data-testid={`modal-${m.id}`}>
            {typeof m.title === "string" ? m.title : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe("modal-store", () => {
  beforeEach(() => {
    modalStore.closeAll();
  });

  it("exports modalStore", () => {
    expect(modalStore).toBeDefined();
  });
  it("exports useImperativeModals", () => {
    expect(useImperativeModals).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: ModalKind | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ImperativeModalConfig | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("starts with no modals", () => {
    expect(modalStore.getSnapshot()).toEqual([]);
  });

  it("getServerSnapshot returns a stable empty array for SSR", () => {
    const a = modalStore.getServerSnapshot();
    const b = modalStore.getServerSnapshot();
    expect(a).toEqual([]);
    expect(b).toEqual([]);
    expect(a).toBe(b); // stable reference
  });

  it("push adds a modal and returns its id", () => {
    const id = modalStore.push({ kind: "confirm", title: "Are you sure?" });
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
    const modals = modalStore.getSnapshot();
    expect(modals.length).toBe(1);
    expect(modals[0]!.title).toBe("Are you sure?");
    expect(modals[0]!.kind).toBe("confirm");
    expect(modals[0]!.id).toBe(id);
  });

  it("push preserves all config fields", () => {
    const id = modalStore.push({
      kind: "warning",
      title: "warn",
      content: "body",
      okText: "ok",
      cancelText: "no",
      okVariant: "destructive",
      width: 480,
      closable: false,
      maskClosable: true,
      icon: "i",
    });
    const m = modalStore.getSnapshot().find((x) => x.id === id)!;
    expect(m.content).toBe("body");
    expect(m.okText).toBe("ok");
    expect(m.cancelText).toBe("no");
    expect(m.okVariant).toBe("destructive");
    expect(m.width).toBe(480);
    expect(m.closable).toBe(false);
    expect(m.maskClosable).toBe(true);
    expect(m.icon).toBe("i");
  });

  it("close resolves the modal promise with the given value and removes it", () => {
    const resolve = vi.fn();
    const id = modalStore.push({ kind: "confirm", title: "t", resolve });
    modalStore.close(id, true);
    expect(resolve).toHaveBeenCalledWith(true);
    expect(modalStore.getSnapshot().find((m) => m.id === id)).toBeUndefined();
  });

  it("close with false resolves cancel", () => {
    const resolve = vi.fn();
    const id = modalStore.push({ kind: "confirm", title: "t", resolve });
    modalStore.close(id, false);
    expect(resolve).toHaveBeenCalledWith(false);
  });

  it("closeAll resolves every open modal with undefined and clears the list", () => {
    const r1 = vi.fn();
    const r2 = vi.fn();
    modalStore.push({ kind: "info", title: "a", resolve: r1 });
    modalStore.push({ kind: "error", title: "b", resolve: r2 });
    expect(modalStore.getSnapshot().length).toBe(2);
    modalStore.closeAll();
    expect(modalStore.getSnapshot().length).toBe(0);
    expect(r1).toHaveBeenCalledWith(undefined);
    expect(r2).toHaveBeenCalledWith(undefined);
  });

  it("subscribe is called on push/close/closeAll and unsubscribe stops updates", () => {
    const listener = vi.fn();
    const unsub = modalStore.subscribe(listener);
    modalStore.push({ kind: "info", title: "x" });
    expect(listener).toHaveBeenCalled();
    listener.mockClear();
    unsub();
    modalStore.push({ kind: "info", title: "y" });
    expect(listener).not.toHaveBeenCalled();
    modalStore.closeAll();
  });

  it("useImperativeModals re-renders on store changes", () => {
    render(<ModalList />);
    expect(screen.getByTestId("count").textContent).toBe("0");

    let id = "";
    act(() => {
      id = modalStore.push({ kind: "confirm", title: "Hello" });
    });
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByText("Hello")).toBeDefined();

    act(() => {
      modalStore.close(id, true);
    });
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("push generates unique ids for multiple modals", () => {
    const id1 = modalStore.push({ kind: "info", title: "one" });
    const id2 = modalStore.push({ kind: "info", title: "two" });
    expect(id1).not.toBe(id2);
    expect(modalStore.getSnapshot().length).toBe(2);
  });

  it("close on unknown id is a no-op (does not throw)", () => {
    expect(() => modalStore.close("does-not-exist", true)).not.toThrow();
  });
});
