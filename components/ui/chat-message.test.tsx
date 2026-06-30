import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessage } from "./chat-message";

describe("ChatMessage", () => {
  it("renders content", () => {
    render(<ChatMessage content="hello" />);
    expect(screen.getByText("hello")).toBeDefined();
  });

  it("aligns user messages to the right", () => {
    const { container } = render(
      <ChatMessage role="user" content="hi" name="me" time="10:00" />,
    );
    const root = container.querySelector('[data-slot="chat-message"]');
    expect(root?.getAttribute("data-role")).toBe("user");
    expect(root?.className).toContain("flex-row-reverse");
  });

  it("aligns assistant messages to the left", () => {
    const { container } = render(
      <ChatMessage role="assistant" content="how can I help" />,
    );
    const root = container.querySelector('[data-slot="chat-message"]');
    expect(root?.getAttribute("data-role")).toBe("assistant");
    expect(root?.className).toContain("flex-row");
  });

  it("renders avatar, name and time when provided", () => {
    render(
      <ChatMessage
        role="user"
        content="x"
        name="Alice"
        time="12:34"
        avatar={<span data-testid="avatar">A</span>}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("12:34")).toBeDefined();
    expect(screen.getByTestId("avatar")).toBeDefined();
  });

  it("renders system messages centered without avatar/meta", () => {
    const { container } = render(
      <ChatMessage role="system" content="系统通知" name="sys" time="00:00" />,
    );
    const root = container.querySelector('[data-slot="chat-message"]');
    expect(root?.getAttribute("data-role")).toBe("system");
    expect(root?.className).toContain("justify-center");
    expect(
      container.querySelector('[data-slot="chat-message-avatar"]'),
    ).toBeNull();
  });
});
