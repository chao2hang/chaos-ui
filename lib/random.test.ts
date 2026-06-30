import { describe, it, expect } from "vitest";
import {
  randomInt,
  randomFloat,
  uuid,
  uniqueSequence,
  randomPick,
  randomSample,
  randomString,
  randomColor,
} from "@/lib/random";

describe("lib/random", () => {
  it("randomInt within range", () => {
    const n = randomInt(1, 10);
    expect(n).toBeGreaterThanOrEqual(1);
    expect(n).toBeLessThanOrEqual(10);
  });
  it("randomFloat within range", () => {
    const n = randomFloat(0, 1);
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThanOrEqual(1);
  });
  it("uuid is a string", () => {
    expect(typeof uuid()).toBe("string");
    expect(uuid().length).toBeGreaterThan(0);
  });
  it("uniqueSequence has unique values", () => {
    const seq = uniqueSequence(10);
    expect(new Set(seq).size).toBe(seq.length);
  });
  it("randomPick returns element or undefined", () => {
    expect([1, 2, 3]).toContain(randomPick([1, 2, 3]));
    expect(randomPick([])).toBeUndefined();
  });
  it("randomSample returns n items", () => {
    const sample = randomSample([1, 2, 3, 4, 5], 3);
    expect(sample.length).toBe(3);
  });
  it("randomString length", () => {
    expect(randomString(8).length).toBe(8);
  });
  it("randomColor is a hex", () => {
    expect(randomColor()).toMatch(/^#/);
  });
});
