import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatModelSwitcher } from "./chat-model-switcher";
import type { ChatModelSwitcherProps } from "./chat-model-switcher";

describe("chat-model-switcher", () => {
  it("exports ChatModelSwitcher", () => {
    expect(ChatModelSwitcher).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ChatModelSwitcherProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the active model name", () => {
    render(
      <ChatModelSwitcher
        models={[{ id: "gpt-4", name: "GPT-4" }]}
        activeId="gpt-4"
      />,
    );
    expect(screen.getByText("GPT-4")).toBeDefined();
  });

  it("renders a fallback when no active model", () => {
    render(<ChatModelSwitcher models={[]} />);
    expect(screen.getByText("Select model")).toBeDefined();
  });
});
