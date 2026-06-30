import { describe, it, expect } from "vitest";
import { ChatMessageActions } from "./chat-message-actions";
import type { ChatMessageActionsProps } from "./chat-message-actions";

describe("chat-message-actions", () => {
  it("exports ChatMessageActions", () => {
    expect(ChatMessageActions).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatMessageActionsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
