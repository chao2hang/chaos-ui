import { describe, it, expect } from "vitest";
import { Mentions } from "./mentions";
import type { MentionsProps, MentionOption } from "./mentions";

describe("mentions", () => {
  it("exports Mentions", () => {
    expect(Mentions).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MentionsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MentionOption | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
