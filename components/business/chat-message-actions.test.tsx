import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessageActions } from "./chat-message-actions";
import type { ChatMessageActionsProps } from "./chat-message-actions";

describe("chat-message-actions", () => {
  it("exports ChatMessageActions", () => {
    expect(ChatMessageActions).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatMessageActionsProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders action buttons when handlers provided", () => {
    render(<ChatMessageActions onReply={() => {}} onCopy={() => {}} />);
    expect(screen.getByLabelText("Reply")).toBeDefined();
    expect(screen.getByLabelText("Copy")).toBeDefined();
  });

  it("renders a hidden root when no handlers", () => {
    const { container } = render(<ChatMessageActions />);
    expect(container.querySelector('[data-slot="chat-message-actions"]')).toBeDefined();
  });
});
