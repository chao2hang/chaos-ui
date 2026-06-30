import { describe, it, expect } from "vitest";
import {
  supportedLocales,
  getStoredLocale,
  LocaleProvider,
  useLocale,
} from "./use-locale";

describe("use-locale", () => {
  it("exports supportedLocales", () => {
    expect(supportedLocales).toBeDefined();
  });
  it("exports getStoredLocale", () => {
    expect(getStoredLocale).toBeDefined();
  });
  it("exports LocaleProvider", () => {
    expect(LocaleProvider).toBeDefined();
  });
  it("exports useLocale", () => {
    expect(useLocale).toBeDefined();
  });
});
