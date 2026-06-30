import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatShell } from "./chat-shell";
import type { ChatShellProps } from "./chat-shell";

describe("chat-shell", () => {
  it("exports ChatShell", () => {
    expect(ChatShell).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatShellProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders children in the main area", () => {
    render(<ChatShell>messages here</ChatShell>);
    expect(screen.getByText("messages here")).toBeDefined();
  });

  it("renders header content", () => {
    render(<ChatShell header={<span>Header Title</span>} />);
    expect(screen.getByText("Header Title")).toBeDefined();
  });
});
