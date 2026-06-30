import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { PasteUpload } from "./paste-upload";
import type { PasteUploadProps } from "./paste-upload";

/** Build a ClipboardEvent-like object and dispatch it as a native paste event. */
function dispatchPaste(
  target: HTMLElement,
  data: { files?: File[]; items?: Array<{ kind: string; getAsFile: () => File | null }> },
) {
  const transfer = {
    files: (data.files ?? []) as unknown as FileList,
    items: (data.items ?? []) as unknown as DataTransferItemList,
  };
  const event = new Event("paste", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "clipboardData", {
    value: transfer,
    configurable: true,
  });
  target.dispatchEvent(event);
}

describe("PasteUpload", () => {
  it("renders the default paste prompt when no children provided", () => {
    render(<PasteUpload />);
    expect(screen.getByText("粘贴文件以上传")).toBeDefined();
    expect(screen.getByText("按 Ctrl/Cmd + V 粘贴图片或文件")).toBeDefined();
  });

  it("renders custom children when provided", () => {
    render(<PasteUpload>自定义区域</PasteUpload>);
    expect(screen.getByText("自定义区域")).toBeDefined();
  });

  it("is focusable and labelled as a paste region", () => {
    render(<PasteUpload />);
    const region = screen.getByRole("region", { name: "粘贴上传区域" });
    expect(region.getAttribute("tabindex")).toBe("0");
  });

  it("calls onPaste with extracted files and shows the count", () => {
    const onPaste = vi.fn();
    render(<PasteUpload onPaste={onPaste} />);
    const region = screen.getByRole("region", { name: "粘贴上传区域" });

    const file = new File(["hello"], "clip.png", { type: "image/png" });
    act(() => {
      dispatchPaste(region, { files: [file] });
    });

    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(onPaste.mock.calls[0]?.[0]).toHaveLength(1);
    expect(onPaste.mock.calls[0]?.[0]?.[0]?.name).toBe("clip.png");
    expect(screen.getByText("已捕获 1 个文件")).toBeDefined();
  });

  it("ignores paste events without files", () => {
    const onPaste = vi.fn();
    render(<PasteUpload onPaste={onPaste} />);
    const region = screen.getByRole("region", { name: "粘贴上传区域" });

    act(() => {
      dispatchPaste(region, { files: [] });
    });

    expect(onPaste).not.toHaveBeenCalled();
  });

  it("exports types", () => {
    const _tc: PasteUploadProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
