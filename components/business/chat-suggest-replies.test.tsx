import { describe, it, expect } from "vitest";
import { ChatSuggestReplies } from "./chat-suggest-replies";
import type { ChatSuggestRepliesProps } from "./chat-suggest-replies";

describe("chat-suggest-replies", () => {
  it("exports ChatSuggestReplies", () => {
    expect(ChatSuggestReplies).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatSuggestRepliesProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
