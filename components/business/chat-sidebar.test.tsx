import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatSidebar } from "./chat-sidebar";
import type { ChatSidebarProps } from "./chat-sidebar";

describe("chat-sidebar", () => {
  it("exports ChatSidebar", () => {
    expect(ChatSidebar).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatSidebarProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders conversation titles", () => {
    render(
      <ChatSidebar conversations={[{ id: "1", title: "Project" }]} />,
    );
    expect(screen.getByText("Project")).toBeDefined();
    expect(screen.getByText("1 conversations")).toBeDefined();
  });

  it("renders empty state", () => {
    render(<ChatSidebar conversations={[]} />);
    expect(screen.getByText("No conversations yet")).toBeDefined();
  });
});
