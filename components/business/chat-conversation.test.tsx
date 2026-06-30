import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatConversation } from "./chat-conversation";
import type { ChatConversationProps } from "./chat-conversation";

describe("chat-conversation", () => {
  it("exports ChatConversation", () => {
    expect(ChatConversation).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatConversationProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders message content", () => {
    render(
      <ChatConversation
        messages={[
          { id: "1", role: "user", content: "Hello there" },
          { id: "2", role: "assistant", content: "Hi!" },
        ]}
      />,
    );
    expect(screen.getByText("Hello there")).toBeDefined();
    expect(screen.getByText("Hi!")).toBeDefined();
  });

  it("renders empty state when no messages", () => {
    render(<ChatConversation messages={[]} />);
    expect(screen.getByText("No messages yet")).toBeDefined();
  });
});
