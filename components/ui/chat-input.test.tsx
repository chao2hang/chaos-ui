import { describe, it, expect } from "vitest";
import { ChatInput } from "./chat-input";
import type { ChatInputProps } from "./chat-input";

describe("chat-input", () => {
  it("exports ChatInput", () => {
    expect(ChatInput).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ChatInputProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
