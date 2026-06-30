import { describe, it, expect, beforeEach } from "vitest";
import { storage, sessionStorage } from "@/lib/storage";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe("lib/storage", () => {
  it("set/get value", () => {
    storage.set("key", { foo: "bar" });
    expect(storage.get<{ foo: string }>("key")).toEqual({ foo: "bar" });
  });

  it("returns null for missing key", () => {
    expect(storage.get("missing")).toBeNull();
  });

  it("remove deletes key", () => {
    storage.set("k", 1);
    storage.remove("k");
    expect(storage.has("k")).toBe(false);
  });

  it("clear removes all", () => {
    storage.set("a", 1);
    storage.set("b", 2);
    storage.clear();
    expect(storage.keys().length).toBe(0);
  });

  it("has checks existence", () => {
    storage.set("k", 1);
    expect(storage.has("k")).toBe(true);
    expect(storage.has("nope")).toBe(false);
  });

  it("keys returns all keys", () => {
    storage.set("a", 1);
    storage.set("b", 2);
    expect(storage.keys()).toContain("a");
    expect(storage.keys()).toContain("b");
  });

  it("size returns positive", () => {
    storage.set("k", "value");
    expect(storage.size()).toBeGreaterThan(0);
  });

  it("expired value returns null", () => {
    storage.set("k", "v", { expires: -1 });
    expect(storage.get("k")).toBeNull();
  });

  it("sessionStorage wrapper", () => {
    sessionStorage.set("sk", "sv");
    expect(sessionStorage.get("sk")).toBe("sv");
  });
});
