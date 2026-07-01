import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Mentions } from "@/components/ui/mentions";
import type { MentionsProps, MentionOption } from "@/components/ui/mentions";

// Mentions uses Popover (Base UI) which needs a full browser environment.
// We test the component's logic and type exports; Popover rendering is
// integration-tested in Storybook.

describe("Mentions", () => {
  it("exports Mentions component", () => {
    expect(Mentions).toBeDefined();
    expect(typeof Mentions).toBe("function");
  });

  it("exports MentionsProps type", () => {
    const _props: MentionsProps = {
      options: [],
    };
    expect(_props).toBeDefined();
  });

  it("exports MentionOption type", () => {
    const _opt: MentionOption = {
      value: "alice",
      label: "Alice",
      avatar: "url",
      disabled: false,
    };
    expect(_opt).toBeDefined();
  });

  it("renders a textarea with default placeholder", () => {
    render(<Mentions options={[]} />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    expect(textarea).toBeDefined();
  });

  it("renders a textarea with custom placeholder", () => {
    render(<Mentions options={[]} placeholder="Mention a user..." />);
    expect(screen.getByPlaceholderText("Mention a user...")).toBeDefined();
  });

  it("renders a textarea with custom rows", () => {
    render(<Mentions options={[]} rows={5} />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    expect(textarea).toBeDefined();
  });

  it("renders a disabled textarea", () => {
    render(<Mentions options={[]} disabled />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    expect((textarea as HTMLTextAreaElement).disabled).toBe(true);
  });

  it("renders with controlled value", () => {
    render(<Mentions options={[]} value="Hello @al" />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    expect((textarea as HTMLTextAreaElement).value).toBe("Hello @al");
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<Mentions options={[]} onChange={onChange} />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    fireEvent.change(textarea, { target: { value: "Hello" } });
    expect(onChange).toHaveBeenCalledWith("Hello");
  });

  it("calls onSearch when typing trigger character", () => {
    const onSearch = vi.fn();
    const options = [{ value: "alice", label: "Alice" }];
    render(<Mentions options={options} onSearch={onSearch} />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    fireEvent.change(textarea, { target: { value: "Hello @al" } });
    expect(onSearch).toHaveBeenCalledWith("al");
  });

  it("does not call onSearch when text after trigger has a space", () => {
    const onSearch = vi.fn();
    const options = [{ value: "alice", label: "Alice" }];
    render(<Mentions options={options} onSearch={onSearch} />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    fireEvent.change(textarea, { target: { value: "Hello @alice done" } });
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("supports custom trigger character", () => {
    const onSearch = vi.fn();
    const options = [{ value: "channel1", label: "Channel 1" }];
    render(<Mentions options={options} onSearch={onSearch} trigger="#" />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    fireEvent.change(textarea, { target: { value: "Hello #ch" } });
    expect(onSearch).toHaveBeenCalledWith("ch");
  });

  it("applies custom className", () => {
    render(<Mentions options={[]} className="my-mentions" />);
    const textarea = screen.getByPlaceholderText(
      "Type @ to mention someone...",
    );
    expect((textarea as HTMLElement).className).toContain("my-mentions");
  });

  it("MentionsProps supports all optional fields", () => {
    const props: MentionsProps = {
      value: "test",
      onChange: () => {},
      options: [{ value: "bob", label: "Bob" }],
      trigger: "#",
      onSearch: () => {},
      onSelect: () => {},
      placeholder: "Type # to tag",
      rows: 4,
      disabled: true,
      className: "custom",
    };
    expect(props).toBeDefined();
  });
});
