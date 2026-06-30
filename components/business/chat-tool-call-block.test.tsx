import { describe, it, expect } from "vitest";
import { ChatToolCallBlock } from "./chat-tool-call-block";
import type { ChatToolCallBlockProps } from "./chat-tool-call-block";

describe("chat-tool-call-block", () => {
  it("exports ChatToolCallBlock", () => {
    expect(ChatToolCallBlock).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatToolCallBlockProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
