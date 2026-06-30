import { describe, it, expect } from "vitest";
import { ChatMessage } from "./chat-message";
import type { ChatMessageProps } from "./chat-message";

describe("chat-message", () => {
  it("exports ChatMessage", () => {
    expect(ChatMessage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatMessageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
