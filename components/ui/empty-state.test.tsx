import { describe, it, expect } from "vitest";
import {} from "./empty-state";
import type { EmptyStateTexts } from "./empty-state";

describe("empty-state", () => {
  it("exports types", () => {
    const _tc1: EmptyStateTexts | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
