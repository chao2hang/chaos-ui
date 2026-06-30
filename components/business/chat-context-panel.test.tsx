import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatContextPanel } from "./chat-context-panel";
import type { ChatContextPanelProps } from "./chat-context-panel";

describe("chat-context-panel", () => {
  it("exports ChatContextPanel", () => {
    expect(ChatContextPanel).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatContextPanelProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders context label and value", () => {
    render(<ChatContextPanel context={[{ label: "User", value: "Alice" }]} />);
    expect(screen.getByText("User")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
  });

  it("renders empty state when no context", () => {
    render(<ChatContextPanel context={[]} />);
    expect(screen.getByText("No context attached")).toBeDefined();
  });
});
