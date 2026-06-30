import { describe, it, expect } from "vitest";
import { useInfiniteScroll } from "./use-infinite-scroll";

describe("use-infinite-scroll", () => {
  it("exports useInfiniteScroll", () => {
    expect(useInfiniteScroll).toBeDefined();
  });
});
