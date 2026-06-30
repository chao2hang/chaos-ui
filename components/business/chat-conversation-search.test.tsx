import { describe, it, expect } from "vitest";
import { ChatConversationSearch } from "./chat-conversation-search";
import type { ChatConversationSearchProps } from "./chat-conversation-search";

describe("chat-conversation-search", () => {
  it("exports ChatConversationSearch", () => {
    expect(ChatConversationSearch).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatConversationSearchProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
