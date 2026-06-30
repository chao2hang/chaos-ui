import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatStreamingText } from "./chat-streaming-text";
import type { ChatStreamingTextProps } from "./chat-streaming-text";

describe("chat-streaming-text", () => {
  it("exports ChatStreamingText", () => {
    expect(ChatStreamingText).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatStreamingTextProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the full text when not streaming", () => {
    render(<ChatStreamingText chunks={["Hello", " world"]} />);
    expect(screen.getByText("Hello world")).toBeDefined();
  });
});
