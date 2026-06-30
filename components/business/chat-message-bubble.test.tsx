import { describe, it, expect } from "vitest";
import { ChatMessageBubble } from "./chat-message-bubble";
import type { ChatMessageBubbleProps } from "./chat-message-bubble";

describe("chat-message-bubble", () => {
  it("exports ChatMessageBubble", () => {
    expect(ChatMessageBubble).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatMessageBubbleProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
