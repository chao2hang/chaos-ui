import { describe, it, expect } from "vitest";
import { validators, patterns } from "@/lib/validation";

describe("lib/validation", () => {
  it("pattern", () => {
    expect(validators.pattern("abc", /^a/)).toBe(true);
    expect(validators.pattern("xyz", /^a/)).toBe(false);
  });
  it("required", () => {
    expect(validators.required("x")).toBe(true);
    expect(validators.required("")).toBe(false);
    expect(validators.required("   ")).toBe(false);
    expect(validators.required(null)).toBe(false);
    expect(validators.required(undefined)).toBe(false);
    expect(validators.required([1])).toBe(true);
    expect(validators.required([])).toBe(false);
    expect(validators.required(0)).toBe(true);
  });
  it("minLength/maxLength", () => {
    expect(validators.minLength("abc", 3)).toBe(true);
    expect(validators.minLength("ab", 3)).toBe(false);
    expect(validators.maxLength("abc", 3)).toBe(true);
    expect(validators.maxLength("abcd", 3)).toBe(false);
  });
  it("range", () => {
    expect(validators.range(5, 1, 10)).toBe(true);
    expect(validators.range(0, 1, 10)).toBe(false);
  });
  it("matches", () => {
    expect(validators.matches("a", "a")).toBe(true);
    expect(validators.matches("a", "b")).toBe(false);
  });
  it("phone", () => {
    expect(validators.phone("13812345678")).toBe(true);
    expect(validators.phone("123456")).toBe(false);
  });
  it("email", () => {
    expect(validators.email("a@b.com")).toBe(true);
    expect(validators.email("invalid")).toBe(false);
  });
  it("idCard", () => {
    expect(validators.idCard("11010519491231002X")).toBe(true);
    expect(validators.idCard("invalid")).toBe(false);
  });
  it("bankCard", () => {
    expect(validators.bankCard("6222021234567890123")).toBe(true);
    expect(validators.bankCard("123")).toBe(false);
  });
  it("uscc", () => {
    expect(validators.uscc("91110108MA00ABCDEF")).toBe(true);
    expect(validators.uscc("invalid")).toBe(false);
  });
  it("url", () => {
    expect(validators.url("https://example.com")).toBe(true);
    expect(validators.url("not-url")).toBe(false);
  });
  it("ipv4", () => {
    expect(validators.ipv4("192.168.1.1")).toBe(true);
    expect(validators.ipv4("999.1.1.1")).toBe(false);
  });
  it("positiveInteger/nonNegativeInteger", () => {
    expect(validators.positiveInteger(5)).toBe(true);
    expect(validators.positiveInteger(0)).toBe(false);
    expect(validators.nonNegativeInteger(0)).toBe(true);
    expect(validators.nonNegativeInteger(-1)).toBe(false);
  });
  it("decimal", () => {
    expect(validators.decimal(2)(1.234)).toBe(false);
    expect(validators.decimal(2)(1.2)).toBe(true);
    expect(validators.decimal(2)(1)).toBe(true);
  });
  it("patterns exported", () => {
    expect(patterns.phone).toBeInstanceOf(RegExp);
  });
});
