import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessageGroup } from "./chat-message-group";
import type { ChatMessageGroupProps } from "./chat-message-group";

describe("chat-message-group", () => {
  it("exports ChatMessageGroup", () => {
    expect(ChatMessageGroup).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatMessageGroupProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the sender and grouped messages", () => {
    render(
      <ChatMessageGroup
        sender="Alice"
        messages={[
          { id: "1", content: "Hi" },
          { id: "2", content: "Again" },
        ]}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Hi")).toBeDefined();
    expect(screen.getByText("Again")).toBeDefined();
  });
});
