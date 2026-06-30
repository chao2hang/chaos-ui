import { describe, it, expect } from "vitest";
import { ChatThinkingBlock } from "./chat-thinking-block";
import type { ChatThinkingBlockProps } from "./chat-thinking-block";

describe("chat-thinking-block", () => {
  it("exports ChatThinkingBlock", () => {
    expect(ChatThinkingBlock).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatThinkingBlockProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
