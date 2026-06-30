import { describe, it, expect } from "vitest";
import { ChatMarkdownRenderer } from "./chat-markdown-renderer";
import type { ChatMarkdownRendererProps } from "./chat-markdown-renderer";

describe("chat-markdown-renderer", () => {
  it("exports ChatMarkdownRenderer", () => {
    expect(ChatMarkdownRenderer).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatMarkdownRendererProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
