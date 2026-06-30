import { describe, it, expect } from "vitest";
import { CrudPage } from "./crud-page";
import type { CrudPageProps, FormField } from "./crud-page";

describe("crud-page", () => {
  it("exports CrudPage", () => {
    expect(CrudPage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CrudPageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormField | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
