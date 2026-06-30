import { describe, it, expect } from "vitest";
import { worker, createWorkerFromFn, runInWorker, parallelMap } from "./worker";

describe("worker", () => {
  it("exports the helper bag", () => {
    expect(worker().runInWorker).toBe(runInWorker);
  });

  it("createWorkerFromFn returns null in jsdom (no Worker)", () => {
    expect(createWorkerFromFn(() => 1)).toBeNull();
  });

  it("runInWorker falls back to in-thread execution", async () => {
    const fn = (n: number) => n * n;
    const result = await runInWorker(fn, [5]);
    expect(result).toBe(25);
  });

  it("runInWorker rejects when fn throws (fallback path)", async () => {
    const fn = () => {
      throw new Error("boom");
    };
    await expect(runInWorker(fn, [])).rejects.toThrow("boom");
  });

  it("runInWorker resolves async functions", async () => {
    const fn = async (n: number) => n + 1;
    const result = await runInWorker(fn, [10]);
    expect(result).toBe(11);
  });

  it("parallelMap maps all items", async () => {
    const items = [1, 2, 3, 4, 5];
    const result = await parallelMap(items, async (n) => n * 2, 2);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  it("parallelMap handles empty input", async () => {
    const result = await parallelMap([], () => 1);
    expect(result).toEqual([]);
  });
});
