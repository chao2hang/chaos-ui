import { describe, it, expect } from "vitest";
import { ChatStreamingText } from "./chat-streaming-text";
import type { ChatStreamingTextProps } from "./chat-streaming-text";

describe("chat-streaming-text", () => {
  it("exports ChatStreamingText", () => {
    expect(ChatStreamingText).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatStreamingTextProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
