import { describe, it, expect } from "vitest";
import {
  crypto,
  hashString,
  hashFnv1a,
  randomId,
  randomToken,
  randomBytes,
  toBase64,
  fromBase64,
  toHex,
  fromHex,
} from "./crypto";

describe("crypto", () => {
  it("exports the helper bag", () => {
    expect(crypto()).toBeDefined();
    expect(crypto().hashString).toBe(hashString);
  });

  it("hashString is deterministic and stable", () => {
    expect(hashString("abc")).toBe(hashString("abc"));
    expect(hashString("abc")).not.toBe(hashString("abcd"));
  });

  it("hashFnv1a is deterministic", () => {
    expect(hashFnv1a("hello")).toBe(hashFnv1a("hello"));
    expect(hashFnv1a("")).toBe(0x811c9dc5);
  });

  it("randomId has the right length", () => {
    expect(randomId(8)).toHaveLength(8);
    expect(randomId()).toHaveLength(12);
  });

  it("randomToken is hex of 2x byte length", () => {
    const t = randomToken(8);
    expect(t).toHaveLength(16);
    expect(/^[0-9a-f]+$/.test(t)).toBe(true);
  });

  it("randomBytes returns requested length", () => {
    expect(randomBytes(4)).toHaveLength(4);
  });

  it("toBase64/fromBase64 round-trip", () => {
    const s = "Hello, 世界!";
    expect(fromBase64(toBase64(s))).toBe(s);
  });

  it("toHex/fromHex round-trip", () => {
    expect(toHex("AB")).toBe("4142");
    expect(Array.from(fromHex("4142"))).toEqual([65, 66]);
  });

  it("toHex from Uint8Array", () => {
    expect(toHex(new Uint8Array([0, 255, 16]))).toBe("00ff10");
  });
});
