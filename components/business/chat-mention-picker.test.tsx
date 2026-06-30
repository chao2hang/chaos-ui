import { describe, it, expect } from "vitest";
import { ChatMentionPicker } from "./chat-mention-picker";
import type { ChatMentionPickerProps } from "./chat-mention-picker";

describe("chat-mention-picker", () => {
  it("exports ChatMentionPicker", () => {
    expect(ChatMentionPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatMentionPickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
