import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ImportDialog } from "./import-dialog";
import type { ImportDialogProps } from "./import-dialog";

// FileUpload uses react-dropzone; mock it so we control onDrop and avoid
// dropzone internals in jsdom.
vi.mock("@/components/ui/file-upload", () => ({
  FileUpload: ({
    onDrop,
  }: {
    onDrop?: (files: File[]) => void;
  }) => (
    <div data-testid="file-upload">
      <button
        type="button"
        onClick={() =>
          onDrop?.([new File(["x"], "data.xlsx")])
        }
      >
        pick-file
      </button>
    </div>
  ),
}));

describe("ImportDialog", () => {
  it("exports ImportDialog", () => {
    expect(ImportDialog).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ImportDialogProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and template link when open", () => {
    render(
      <ImportDialog open onOpenChange={() => {}} templateUrl="/tpl.xlsx" />,
    );
    expect(screen.getByText("Import Data")).toBeDefined();
    expect(screen.getByText("Download Template")).toBeDefined();
    expect(screen.getByTestId("file-upload")).toBeDefined();
  });

  it("uses custom title, importText and templateText", () => {
    render(
      <ImportDialog
        open
        title="导入数据"
        importText="开始导入"
        templateText="下载模板"
        templateUrl="/t.xlsx"
      />,
    );
    expect(screen.getByText("导入数据")).toBeDefined();
    expect(screen.getByText("下载模板")).toBeDefined();
    // The import button shows importText before a file is selected (disabled).
    expect(screen.getByText("开始导入")).toBeDefined();
  });

  it("omits the template link when templateUrl not provided", () => {
    render(<ImportDialog open onOpenChange={() => {}} />);
    expect(screen.queryByText("Download Template")).toBeNull();
  });

  it("selects a file via the upload mock and shows the file name", () => {
    render(<ImportDialog open onOpenChange={() => {}} />);
    fireEvent.click(screen.getByText("pick-file"));
    expect(screen.getByText(/Selected: data.xlsx/)).toBeDefined();
  });

  it("disables the import button until a file is selected", () => {
    render(<ImportDialog open onImport={() => {}} />);
    const importBtn = screen.getByText("Import").closest("button")!;
    expect(importBtn.disabled).toBe(true);
  });

  it("calls onImport with the file and closes on import", async () => {
    const onImport = vi.fn().mockResolvedValue(undefined);
    const onOpenChange = vi.fn();
    render(<ImportDialog open onImport={onImport} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByText("pick-file"));
    fireEvent.click(screen.getByText("Import"));
    await waitFor(() => expect(onImport).toHaveBeenCalledTimes(1));
    expect(onImport.mock.calls[0]![0]).toBeInstanceOf(File);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("shows Importing... label while loading", async () => {
    let resolveImport: () => void = () => {};
    const onImport = vi.fn(
      () => new Promise<void>((resolve) => void (resolveImport = resolve)),
    );
    render(<ImportDialog open onImport={onImport} onOpenChange={() => {}} />);
    fireEvent.click(screen.getByText("pick-file"));
    fireEvent.click(screen.getByText("Import"));
    await waitFor(() => expect(screen.getByText("Importing...")).toBeDefined());
    resolveImport();
  });

  it("calls onOpenChange(false) when Cancel clicked", () => {
    const onOpenChange = vi.fn();
    render(<ImportDialog open onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/import-dialog");
    expect(mod.ImportDialog).toBeDefined();
  });
});
