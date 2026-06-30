import { describe, it, expect } from "vitest";
import { ChatMessageGroup } from "./chat-message-group";
import type { ChatMessageGroupProps } from "./chat-message-group";

describe("chat-message-group", () => {
  it("exports ChatMessageGroup", () => {
    expect(ChatMessageGroup).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatMessageGroupProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
