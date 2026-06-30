import { describe, it, expect } from "vitest";
import {
  useIntersectionObserver,
  useInView,
} from "./use-intersection-observer";

describe("use-intersection-observer", () => {
  it("exports useIntersectionObserver", () => {
    expect(useIntersectionObserver).toBeDefined();
  });
  it("exports useInView", () => {
    expect(useInView).toBeDefined();
  });
});
