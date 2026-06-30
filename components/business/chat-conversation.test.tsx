import { describe, it, expect } from "vitest";
import { ChatConversation } from "./chat-conversation";
import type { ChatConversationProps } from "./chat-conversation";

describe("chat-conversation", () => {
  it("exports ChatConversation", () => {
    expect(ChatConversation).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatConversationProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
