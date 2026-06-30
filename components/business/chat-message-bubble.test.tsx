import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessageBubble } from "./chat-message-bubble";
import type { ChatMessageBubbleProps } from "./chat-message-bubble";

describe("chat-message-bubble", () => {
  it("exports ChatMessageBubble", () => {
    expect(ChatMessageBubble).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatMessageBubbleProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders user message content", () => {
    render(<ChatMessageBubble role="user" content="Hello!" />);
    expect(screen.getByText("Hello!")).toBeDefined();
    expect(screen.getByText("You")).toBeDefined();
  });

  it("renders system message centered", () => {
    render(<ChatMessageBubble role="system" content="Chat cleared" />);
    expect(screen.getByText("Chat cleared")).toBeDefined();
  });

  it("renders the provided name and time", () => {
    render(
      <ChatMessageBubble role="assistant" content="Hi" name="Bot" time="12:00" />,
    );
    expect(screen.getByText("Bot")).toBeDefined();
    expect(screen.getByText("12:00")).toBeDefined();
  });
});
