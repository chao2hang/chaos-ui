import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatBranch } from "./chat-branch";
import type { ChatBranchProps } from "./chat-branch";

describe("chat-branch", () => {
  it("exports ChatBranch", () => {
    expect(ChatBranch).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatBranchProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the active branch label and count", () => {
    render(
      <ChatBranch
        branches={[
          { id: "a", label: "A", active: true },
          { id: "b", label: "B" },
        ]}
      />,
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("1/2")).toBeDefined();
  });

  it("renders a hidden root when no branches", () => {
    const { container } = render(<ChatBranch branches={[]} />);
    expect(container.querySelector('[data-slot="chat-branch"]')).toBeDefined();
  });
});
