import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatLayout } from "./chat-layout";

describe("ChatLayout", () => {
  it("renders all three regions", () => {
    render(
      <ChatLayout
        sidebar={<div>Conversations</div>}
        messagesArea={<div>Hello world</div>}
        inputArea={<button type="button">Send</button>}
      />,
    );
    expect(screen.getByText("Conversations")).toBeDefined();
    expect(screen.getByText("Hello world")).toBeDefined();
    expect(screen.getByRole("button", { name: "Send" })).toBeDefined();
  });

  it("renders messages region role", () => {
    render(
      <ChatLayout
        messagesArea={<div>Msg</div>}
        inputArea={<span>Input</span>}
      />,
    );
    expect(screen.getByRole("region", { name: "消息输入" })).toBeDefined();
    expect(screen.getByRole("main", { name: "消息区" })).toBeDefined();
  });

  it("renders without sidebar", () => {
    render(<ChatLayout messagesArea={<p>No sidebar body</p>} />);
    expect(screen.getByText("No sidebar body")).toBeDefined();
  });

  it("fills the host (h-full) instead of the viewport (h-dvh)", () => {
    const { container } = render(
      <div style={{ height: 360 }}>
        <ChatLayout messagesArea={<p>body</p>} />
      </div>,
    );
    const root = container.querySelector('[data-slot="chat-layout"]');
    expect(root?.classList.contains("h-full")).toBe(true);
    expect(root?.classList.contains("h-dvh")).toBe(false);
  });
});
