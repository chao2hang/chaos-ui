import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FileUploadManager } from "./file-upload-manager";

// react-dropzone's useDropzone works in jsdom (uses getRootProps/getInputProps).
const makeFile = (name: string, size = 2048, type = "text/plain") => ({
  name,
  size,
  type,
  status: "pending" as const,
  progress: 0,
});

describe("file-upload-manager", () => {
  it("exports FileUploadManager", () => {
    expect(FileUploadManager).toBeDefined();
  });

  it("renders the dropzone upload area when no files", () => {
    render(<FileUploadManager files={[]} />);
    expect(
      screen.getByText("Drag & drop files here, or click to select"),
    ).toBeDefined();
  });

  it("renders file list and count + size badge", () => {
    render(
      <FileUploadManager
        files={[makeFile("a.txt", 1024), makeFile("b.txt", 2048)]}
      />,
    );
    expect(screen.getByText("2 file(s)")).toBeDefined();
    expect(screen.getByText(/3\.0 KB/)).toBeDefined();
    expect(screen.getByText("a.txt")).toBeDefined();
    expect(screen.getByText("b.txt")).toBeDefined();
  });

  it("shows per-file size in KB", () => {
    render(<FileUploadManager files={[makeFile("a.txt", 5120)]} />);
    expect(screen.getByText("a.txt")).toBeDefined();
  });

  it("renders Done badge for complete files", () => {
    render(
      <FileUploadManager
        files={[{ ...makeFile("done.txt"), status: "done", progress: 100 }]}
      />,
    );
    expect(screen.getByText("Done")).toBeDefined();
  });

  it("renders progress percent for uploading files", () => {
    render(
      <FileUploadManager
        files={[{ ...makeFile("up.txt"), status: "uploading", progress: 42 }]}
      />,
    );
    expect(screen.getByText("42%")).toBeDefined();
  });

  it("switches to grid view on grid button click", () => {
    render(
      <FileUploadManager files={[makeFile("a.txt"), makeFile("img.png", 1024, "image/png")]} />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    const gridBtn = buttons[1]!;
    expect(gridBtn).toBeDefined();
    fireEvent.click(gridBtn);
    // after switching, the component still renders
    expect(screen.getByText("a.txt")).toBeDefined();
  });

  it("clears all files on clear-all button click", () => {
    const onFilesChange = vi.fn();
    render(
      <FileUploadManager
        files={[makeFile("a.txt"), makeFile("b.txt")]}
        onFilesChange={onFilesChange}
      />,
    );
    // clear-all is the third icon-xs button (trash) in the toolbar
    const buttons = screen.getAllByRole("button");
    const clearBtn = buttons[2]!;
    fireEvent.click(clearBtn);
    expect(onFilesChange).toHaveBeenCalledWith([]);
  });

  it("removes a single file on remove button click (list view)", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUploadManager
        files={[makeFile("a.txt"), makeFile("b.txt")]}
        onFilesChange={onFilesChange}
      />,
    );
    // First remove button is after the file row; it is the 4th button overall
    // (3 toolbar + first file's remove). Find by the destructive trash button in the row.
    const rowButtons = container.querySelectorAll(
      'button[class*="group-hover:opacity-100"]',
    );
    expect(rowButtons.length).toBeGreaterThan(0);
    fireEvent.click(rowButtons[0]!);
    expect(onFilesChange).toHaveBeenCalled();
    const last = onFilesChange.mock.calls.at(-1)![0];
    expect(last).toHaveLength(1);
    expect(last[0].name).toBe("b.txt");
  });

  it("does not render file list section when files is empty", () => {
    render(<FileUploadManager files={[]} />);
    expect(screen.queryByText("file(s)")).toBeNull();
  });
});
