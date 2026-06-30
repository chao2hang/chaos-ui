import { describe, it, expect } from "vitest";
import { MessageList } from "./message-list";
import type { MessageListProps } from "./message-list";

describe("message-list", () => {
  it("exports MessageList", () => {
    expect(MessageList).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MessageListProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
