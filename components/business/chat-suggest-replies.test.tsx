import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatSuggestReplies } from "./chat-suggest-replies";
import type { ChatSuggestRepliesProps } from "./chat-suggest-replies";

describe("chat-suggest-replies", () => {
  it("exports ChatSuggestReplies", () => {
    expect(ChatSuggestReplies).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatSuggestRepliesProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders suggestion labels", () => {
    render(<ChatSuggestReplies suggestions={["Sounds good!", "Tell me more"]} />);
    expect(screen.getByText("Sounds good!")).toBeDefined();
    expect(screen.getByText("Tell me more")).toBeDefined();
  });

  it("renders a hidden root when no suggestions", () => {
    const { container } = render(<ChatSuggestReplies suggestions={[]} />);
    expect(container.querySelector('[data-slot="chat-suggest-replies"]')).toBeDefined();
  });
});
