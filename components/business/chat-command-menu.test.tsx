import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatCommandMenu } from "./chat-command-menu";
import type { ChatCommandMenuProps } from "./chat-command-menu";

describe("chat-command-menu", () => {
  it("exports ChatCommandMenu", () => {
    expect(ChatCommandMenu).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatCommandMenuProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders command labels", () => {
    render(<ChatCommandMenu commands={[{ id: "summarize", label: "Summarize" }]} />);
    expect(screen.getByText("Summarize")).toBeDefined();
    expect(screen.getByText("/summarize")).toBeDefined();
  });

  it("renders empty state when no commands", () => {
    render(<ChatCommandMenu commands={[]} />);
    expect(screen.getByText("No commands")).toBeDefined();
  });
});
