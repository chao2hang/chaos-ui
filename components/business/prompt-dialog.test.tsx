import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PromptDialog } from "./prompt-dialog";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("PromptDialog", () => {
  it("exports PromptDialog", () => {
    expect(PromptDialog).toBeDefined();
  });

  it("renders nothing in body when closed", () => {
    render(<PromptDialog open={false} />);
    expect(screen.queryByText("promptDialog.title")).toBeNull();
  });

  it("renders the title and input when open (uses default i18n title)", () => {
    render(<PromptDialog open={true} />);
    // default title resolves to the i18n key (since "请输入" === default)
    expect(screen.getByText("promptDialog.title")).toBeDefined();
  });

  it("renders a custom title", () => {
    render(<PromptDialog open={true} title="Rename" />);
    expect(screen.getByText("Rename")).toBeDefined();
  });

  it("renders description and label when provided", () => {
    render(
      <PromptDialog
        open={true}
        description="Please enter a name"
        label="Name"
      />,
    );
    expect(screen.getByText("Please enter a name")).toBeDefined();
    expect(screen.getByText("Name")).toBeDefined();
  });

  it("renders confirm and cancel buttons with default text", () => {
    render(<PromptDialog open={true} />);
    expect(screen.getByText("promptDialog.confirm")).toBeDefined();
    expect(screen.getByText("promptDialog.cancel")).toBeDefined();
  });

  it("renders custom confirm/cancel text", () => {
    render(<PromptDialog open={true} confirmText="OK" cancelText="Dismiss" />);
    expect(screen.getByText("OK")).toBeDefined();
    expect(screen.getByText("Dismiss")).toBeDefined();
  });

  it("shows required error when confirming with empty value", () => {
    render(<PromptDialog open={true} required onConfirm={vi.fn()} />);
    fireEvent.click(screen.getByText("promptDialog.confirm"));
    expect(screen.getByText("promptDialog.required")).toBeDefined();
  });

  it("clears the error when typing", () => {
    render(<PromptDialog open={true} required onConfirm={vi.fn()} />);
    fireEvent.click(screen.getByText("promptDialog.confirm"));
    expect(screen.getByText("promptDialog.required")).toBeDefined();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello" } });
    expect(screen.queryByText("promptDialog.required")).toBeNull();
  });

  it("calls onConfirm with the entered value and closes", async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    const onOpenChange = vi.fn();
    render(
      <PromptDialog
        open={true}
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
      />,
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "my value" } });
    fireEvent.click(screen.getByText("promptDialog.confirm"));
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith("my value");
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange(false) when cancel is clicked", () => {
    const onOpenChange = vi.fn();
    render(<PromptDialog open={true} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByText("promptDialog.cancel"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("disables buttons while async onConfirm is pending", async () => {
    let resolve: () => void = () => {};
    const onConfirm = vi.fn(
      () =>
        new Promise<void>((r) => {
          resolve = r;
        }),
    );
    render(<PromptDialog open={true} onConfirm={onConfirm} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "x" } });
    const confirmBtn = screen
      .getByText("promptDialog.confirm")
      .closest("button")!;
    fireEvent.click(confirmBtn);
    expect(confirmBtn.hasAttribute("disabled")).toBe(true);
    resolve();
    await waitFor(() => {
      expect(confirmBtn.hasAttribute("disabled")).toBe(false);
    });
  });

  it("supports required=false allowing empty submit", async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    const onOpenChange = vi.fn();
    render(
      <PromptDialog
        open={true}
        required={false}
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
      />,
    );
    fireEvent.click(screen.getByText("promptDialog.confirm"));
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith("");
    });
  });

  it("submits on Enter key", async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    render(<PromptDialog open={true} onConfirm={onConfirm} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith("abc");
    });
  });

  it("does not submit on Shift+Enter", () => {
    const onConfirm = vi.fn();
    render(<PromptDialog open={true} onConfirm={onConfirm} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("closes when onConfirm is not provided", () => {
    const onOpenChange = vi.fn();
    render(
      <PromptDialog open={true} onOpenChange={onOpenChange} required={false} />,
    );
    fireEvent.click(screen.getByText("promptDialog.confirm"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("uses defaultValue for the input", () => {
    render(<PromptDialog open={true} defaultValue="preset" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("preset");
  });

  it("renders the input with the given type", () => {
    render(<PromptDialog open={true} inputType="email" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.type).toBe("email");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/prompt-dialog");
    expect(mod.PromptDialog).toBeDefined();
  });
});
