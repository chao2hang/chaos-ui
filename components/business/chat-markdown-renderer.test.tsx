import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMarkdownRenderer } from "./chat-markdown-renderer";
import type { ChatMarkdownRendererProps } from "./chat-markdown-renderer";

describe("chat-markdown-renderer", () => {
  it("exports ChatMarkdownRenderer", () => {
    expect(ChatMarkdownRenderer).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatMarkdownRendererProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders a heading", () => {
    render(<ChatMarkdownRenderer content="# Title" />);
    expect(screen.getByText("Title")).toBeDefined();
  });

  it("renders bold inline text", () => {
    const { container } = render(<ChatMarkdownRenderer content="Hello **world**" />);
    expect(container.querySelector("strong")?.textContent).toBe("world");
  });

  it("renders a list item", () => {
    render(<ChatMarkdownRenderer content="- only item" />);
    expect(screen.getByText("only item")).toBeDefined();
  });
});
