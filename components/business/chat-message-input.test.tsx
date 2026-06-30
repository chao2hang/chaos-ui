import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessageInput } from "./chat-message-input";
import type { ChatMessageInputProps } from "./chat-message-input";

describe("chat-message-input", () => {
  it("exports ChatMessageInput", () => {
    expect(ChatMessageInput).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatMessageInputProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the placeholder", () => {
    render(<ChatMessageInput placeholder="Say hello" />);
    expect(screen.getByPlaceholderText("Say hello")).toBeDefined();
  });

  it("renders a controlled value", () => {
    render(<ChatMessageInput value="draft" onChange={() => {}} />);
    expect(screen.getByDisplayValue("draft")).toBeDefined();
  });

  it("renders the send button", () => {
    render(<ChatMessageInput value="hi" onChange={() => {}} />);
    expect(screen.getByLabelText("Send message")).toBeDefined();
  });
});
