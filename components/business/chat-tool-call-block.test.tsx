import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatToolCallBlock } from "./chat-tool-call-block";
import type { ChatToolCallBlockProps } from "./chat-tool-call-block";

describe("chat-tool-call-block", () => {
  it("exports ChatToolCallBlock", () => {
    expect(ChatToolCallBlock).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatToolCallBlockProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the tool name and success status", () => {
    render(<ChatToolCallBlock toolName="search" status="success" />);
    expect(screen.getByText("search")).toBeDefined();
    expect(screen.getByText("Success")).toBeDefined();
  });

  it("renders the calling status label", () => {
    render(<ChatToolCallBlock toolName="calc" status="calling" />);
    expect(screen.getByText("Calling")).toBeDefined();
  });
});
