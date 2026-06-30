import { describe, it, expect } from "vitest";
import { ChatMessageInput } from "./chat-message-input";
import type { ChatMessageInputProps } from "./chat-message-input";

describe("chat-message-input", () => {
  it("exports ChatMessageInput", () => {
    expect(ChatMessageInput).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatMessageInputProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
