import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatVoiceMessage } from "./chat-voice-message";
import type { ChatVoiceMessageProps } from "./chat-voice-message";

describe("chat-voice-message", () => {
  it("exports ChatVoiceMessage", () => {
    expect(ChatVoiceMessage).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatVoiceMessageProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the formatted duration and play button", () => {
    render(<ChatVoiceMessage duration={75} />);
    expect(screen.getByText("1:15")).toBeDefined();
    expect(screen.getByLabelText("Play voice message")).toBeDefined();
  });
});
