import { describe, it, expect, vi } from "vitest";
import { eventBus } from "@/lib/event-bus";

describe("lib/event-bus", () => {
  it("on/emit", () => {
    const handler = vi.fn();
    eventBus.on("test", handler);
    eventBus.emit("test", { a: 1 });
    expect(handler).toHaveBeenCalledWith({ a: 1 });
  });

  it("on returns unsubscribe", () => {
    const handler = vi.fn();
    const unsub = eventBus.on("test", handler);
    unsub();
    eventBus.emit("test");
    expect(handler).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const handler = vi.fn();
    eventBus.once("once-test", handler);
    eventBus.emit("once-test");
    eventBus.emit("once-test");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("off removes handler", () => {
    const handler = vi.fn();
    eventBus.on("off-test", handler);
    eventBus.off("off-test", handler);
    eventBus.emit("off-test");
    expect(handler).not.toHaveBeenCalled();
  });

  it("off without handler removes all", () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    eventBus.on("multi", h1);
    eventBus.on("multi", h2);
    eventBus.off("multi");
    eventBus.emit("multi");
    expect(h1).not.toHaveBeenCalled();
    expect(h2).not.toHaveBeenCalled();
  });

  it("clear removes all events", () => {
    const handler = vi.fn();
    eventBus.on("clear-test", handler);
    eventBus.clear();
    eventBus.emit("clear-test");
    expect(handler).not.toHaveBeenCalled();
  });

  it("emit with no handlers does nothing", () => {
    expect(() => eventBus.emit("no-handlers")).not.toThrow();
  });

  it("handler error is caught", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    eventBus.on("err-test", () => { throw new Error("boom"); });
    expect(() => eventBus.emit("err-test")).not.toThrow();
    spy.mockRestore();
  });
});
