import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatThinkingBlock } from "./chat-thinking-block";
import type { ChatThinkingBlockProps } from "./chat-thinking-block";

describe("chat-thinking-block", () => {
  it("exports ChatThinkingBlock", () => {
    expect(ChatThinkingBlock).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatThinkingBlockProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the heading and content when expanded", () => {
    render(<ChatThinkingBlock content="Considering options" />);
    expect(screen.getByText("Thought process")).toBeDefined();
    expect(screen.getByText("Considering options")).toBeDefined();
  });

  it("renders the duration when provided", () => {
    render(<ChatThinkingBlock content="x" duration={1500} />);
    expect(screen.getByText("1.5s")).toBeDefined();
  });
});
