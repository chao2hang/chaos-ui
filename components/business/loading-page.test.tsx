import { describe, it, expect } from "vitest";
import { LoadingPage, FullPageLoader } from "./loading-page";

describe("loading-page", () => {
  it("exports LoadingPage", () => {
    expect(LoadingPage).toBeDefined();
  });

  it("exports FullPageLoader", () => {
    expect(FullPageLoader).toBeDefined();
  });
});
