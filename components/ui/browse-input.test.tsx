import { describe, it, expect } from "vitest";
import { BrowseInput, browseInputVariants } from "./browse-input";
import type { BrowseInputProps } from "./browse-input";

describe("browse-input", () => {
  it("exports BrowseInput", () => {
    expect(BrowseInput).toBeDefined();
  });

  it("exports browseInputVariants", () => {
    expect(browseInputVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BrowseInputProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
