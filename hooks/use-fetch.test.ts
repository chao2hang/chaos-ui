import { describe, it, expect } from "vitest";
import { useFetch } from "./use-fetch";

describe("use-fetch", () => {
  it("exports useFetch", () => {
    expect(useFetch).toBeDefined();
  });
});
