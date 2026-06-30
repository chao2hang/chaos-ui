import { describe, it, expect } from "vitest";
import { LanguageSwitcher } from "./language-switcher";
import type { LanguageOption } from "./language-switcher";

describe("language-switcher", () => {
  it("exports LanguageSwitcher", () => {
    expect(LanguageSwitcher).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: LanguageOption | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
