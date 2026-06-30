import { describe, it, expect } from "vitest";
import { WriteoffBrowse } from "./writeoff-browse";
import type { WriteoffBrowseProps } from "./writeoff-browse";

describe("writeoff-browse", () => {
  it("exports WriteoffBrowse", () => {
    expect(WriteoffBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WriteoffBrowseProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
