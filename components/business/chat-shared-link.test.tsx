import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatSharedLink } from "./chat-shared-link";
import type { ChatSharedLinkProps } from "./chat-shared-link";

describe("chat-shared-link", () => {
  it("exports ChatSharedLink", () => {
    expect(ChatSharedLink).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatSharedLinkProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the title and host", () => {
    render(<ChatSharedLink url="https://example.com/page" title="Example" />);
    expect(screen.getByText("Example")).toBeDefined();
    expect(screen.getByText("example.com")).toBeDefined();
  });

  it("renders the description when provided", () => {
    render(
      <ChatSharedLink url="https://x.com" title="X" description="A site" />,
    );
    expect(screen.getByText("A site")).toBeDefined();
  });
});
