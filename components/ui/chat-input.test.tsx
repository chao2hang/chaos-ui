import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInput } from "./chat-input";

describe("ChatInput", () => {
  it("renders a textarea and send button", () => {
    render(<ChatInput placeholder="说点什么" />);
    expect(screen.getByPlaceholderText("说点什么")).toBeDefined();
    expect(screen.getByRole("button", { name: "发送" })).toBeDefined();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ChatInput onChange={handleChange} placeholder="输入" />);
    await user.type(screen.getByPlaceholderText("输入"), "hi");
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith("hi");
  });

  it("calls onSend on Enter (without shift)", async () => {
    const user = userEvent.setup();
    const handleSend = vi.fn();
    render(<ChatInput onSend={handleSend} placeholder="输入" />);
    const field = screen.getByPlaceholderText("输入");
    await user.type(field, "hello");
    await user.keyboard("{Enter}");
    expect(handleSend).toHaveBeenCalled();
  });

  it("does not call onSend on Shift+Enter", async () => {
    const user = userEvent.setup();
    const handleSend = vi.fn();
    render(<ChatInput onSend={handleSend} placeholder="输入" />);
    const field = screen.getByPlaceholderText("输入");
    await user.type(field, "hi");
    await user.keyboard("{Shift>}{Enter}{/Shift}");
    expect(handleSend).not.toHaveBeenCalled();
  });

  it("calls onSend when send button clicked", async () => {
    const user = userEvent.setup();
    const handleSend = vi.fn();
    render(<ChatInput onSend={handleSend} placeholder="输入" />);
    await user.click(screen.getByRole("button", { name: "发送" }));
    expect(handleSend).toHaveBeenCalled();
  });

  it("disables interaction when disabled", () => {
    render(<ChatInput disabled placeholder="x" />);
    expect(
      (screen.getByPlaceholderText("x") as HTMLTextAreaElement).disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: "发送" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });
});
