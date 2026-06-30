import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMentionPicker } from "./chat-mention-picker";
import type { ChatMentionPickerProps } from "./chat-mention-picker";

describe("chat-mention-picker", () => {
  it("exports ChatMentionPicker", () => {
    expect(ChatMentionPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatMentionPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders user names", () => {
    render(<ChatMentionPicker users={[{ id: "1", name: "Alice" }]} />);
    expect(screen.getByText("Alice")).toBeDefined();
  });

  it("renders empty state when no users", () => {
    render(<ChatMentionPicker users={[]} />);
    expect(screen.getByText("No users")).toBeDefined();
  });
});
