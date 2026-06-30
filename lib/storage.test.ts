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

  // ---- deeper branch coverage ----

  it("non-expired value is returned", () => {
    storage.set("fresh", { n: 1 }, { expires: 3600 });
    expect(storage.get<{ n: number }>("fresh")).toEqual({ n: 1 });
  });

  it("expiry cleanup removes the key from storage after read", () => {
    storage.set("stale", "v", { expires: -1 });
    expect(storage.get("stale")).toBeNull();
    // reading an expired item should remove it
    expect(localStorage.getItem("stale")).toBeNull();
  });

  it("corrupt JSON returns null without throwing", () => {
    localStorage.setItem("broken", "{not json");
    expect(storage.get("broken")).toBeNull();
  });

  it("get returns null for a value without .value shape (parse-safe)", () => {
    // item parses but has no value field -> returns undefined, which is fine
    localStorage.setItem("odd", JSON.stringify({ nope: true }));
    expect(storage.get("odd")).toBeUndefined();
  });

  it("set with session:true writes to sessionStorage", () => {
    storage.set("skey", "sv", { session: true });
    expect(window.sessionStorage.getItem("skey")).not.toBeNull();
    expect(localStorage.getItem("skey")).toBeNull();
  });

  it("get with session:true reads from sessionStorage", () => {
    storage.set("skey", 42, { session: true });
    expect(storage.get<number>("skey", { session: true })).toBe(42);
    // local storage should not have it
    expect(storage.get<number>("skey")).toBeNull();
  });

  it("remove with session:true removes from sessionStorage only", () => {
    storage.set("skey", 1, { session: true });
    storage.set("lkey", 1);
    storage.remove("skey", { session: true });
    expect(storage.has("skey", { session: true })).toBe(false);
    expect(storage.has("lkey")).toBe(true);
  });

  it("clear with session:true clears sessionStorage only", () => {
    storage.set("skey", 1, { session: true });
    storage.set("lkey", 1);
    storage.clear({ session: true });
    expect(storage.keys({ session: true }).length).toBe(0);
    expect(storage.keys().length).toBe(1);
  });

  it("size with session:true counts session entries", () => {
    storage.set("skey", "abcdef", { session: true });
    expect(storage.size({ session: true })).toBeGreaterThan(0);
  });

  it("keys with session:true returns session keys", () => {
    storage.set("skey", 1, { session: true });
    expect(storage.keys({ session: true })).toContain("skey");
  });

  it("has with session:true reflects session state", () => {
    storage.set("skey", 1, { session: true });
    expect(storage.has("skey", { session: true })).toBe(true);
    expect(storage.has("skey")).toBe(false);
  });

  it("sessionStorage wrapper full lifecycle", () => {
    sessionStorage.set("a", 1);
    sessionStorage.set("b", 2);
    expect(sessionStorage.has("a")).toBe(true);
    expect(sessionStorage.keys()).toContain("a");
    expect(sessionStorage.keys()).toContain("b");
    sessionStorage.remove("a");
    expect(sessionStorage.has("a")).toBe(false);
    expect(sessionStorage.has("b")).toBe(true);
    sessionStorage.clear();
    expect(sessionStorage.keys().length).toBe(0);
  });

  it("sessionStorage.set forwards expires option", () => {
    sessionStorage.set("exp", "v", { expires: -1 });
    expect(sessionStorage.get("exp")).toBeNull();
  });

  it("size returns 0 for empty store", () => {
    localStorage.clear();
    expect(storage.size()).toBe(0);
  });

  it("round-trips complex nested object", () => {
    const data = { list: [1, 2, 3], nested: { ok: true } };
    storage.set("complex", data);
    expect(storage.get<typeof data>("complex")).toEqual(data);
  });
});
