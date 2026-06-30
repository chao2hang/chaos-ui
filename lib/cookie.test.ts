import { describe, it, expect, beforeEach } from "vitest";
import { cookie } from "@/lib/cookie";

beforeEach(() => {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0]?.trim();
    if (name) document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
});

describe("lib/cookie", () => {
  it("set/get cookie", () => {
    cookie.set("token", "abc123");
    expect(cookie.get("token")).toBe("abc123");
  });

  it("get missing returns null", () => {
    expect(cookie.get("nope")).toBeNull();
  });

  it("remove deletes cookie", () => {
    cookie.set("temp", "v");
    cookie.remove("temp");
    expect(cookie.get("temp")).toBeNull();
  });

  it("has checks existence", () => {
    cookie.set("k", "v");
    expect(cookie.has("k")).toBe(true);
    expect(cookie.has("missing")).toBe(false);
  });

  it("getAll returns object", () => {
    cookie.set("a", "1");
    cookie.set("b", "2");
    const all = cookie.getAll();
    expect(all.a).toBe("1");
    expect(all.b).toBe("2");
  });

  it("set with options", () => {
    cookie.set("k", "v", { sameSite: "lax" });
    expect(cookie.get("k")).toBe("v");
  });
});
