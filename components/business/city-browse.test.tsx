import { describe, it, expect } from "vitest";
import { CityBrowse } from "./city-browse";
import type { CityBrowseProps } from "./city-browse";

describe("city-browse", () => {
  it("exports CityBrowse", () => {
    expect(CityBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CityBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
