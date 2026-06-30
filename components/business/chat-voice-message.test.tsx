import { describe, it, expect } from "vitest";
import { ChatVoiceMessage } from "./chat-voice-message";
import type { ChatVoiceMessageProps } from "./chat-voice-message";

describe("chat-voice-message", () => {
  it("exports ChatVoiceMessage", () => {
    expect(ChatVoiceMessage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatVoiceMessageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
