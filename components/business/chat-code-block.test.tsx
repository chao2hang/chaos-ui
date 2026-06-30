import { describe, it, expect } from "vitest";
import { ChatCodeBlock } from "./chat-code-block";
import type { ChatCodeBlockProps } from "./chat-code-block";

describe("chat-code-block", () => {
  it("exports ChatCodeBlock", () => {
    expect(ChatCodeBlock).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatCodeBlockProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
