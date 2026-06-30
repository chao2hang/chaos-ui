import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatHeader } from "./chat-header";
import type { ChatHeaderProps } from "./chat-header";

describe("chat-header", () => {
  it("exports ChatHeader", () => {
    expect(ChatHeader).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatHeaderProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the title and subtitle", () => {
    render(<ChatHeader title="Project Chat" subtitle="3 members" />);
    expect(screen.getByText("Project Chat")).toBeDefined();
    expect(screen.getByText("3 members")).toBeDefined();
  });

  it("renders the status badge", () => {
    render(<ChatHeader title="Chat" status="Online" />);
    expect(screen.getByText("Online")).toBeDefined();
  });
});
