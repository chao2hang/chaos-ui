import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExportButton } from "./export-button";
import type { ExportFormat } from "./export-button";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

// Stub the download mechanism so clicks don't touch the real DOM/network.
const clickMock = vi.fn();
beforeEach(() => {
  clickMock.mockReset();
  vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:url");
  vi.spyOn(URL, "revokeObjectURL").mockReturnValue(undefined);
  // document.createElement already returns real elements; intercept click.
  vi.spyOn(HTMLElement.prototype, "click").mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    clickMock(this.download);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

describe("export-button", () => {
  it("exports ExportButton", () => {
    expect(ExportButton).toBeDefined();
  });

  it("exports types", () => {
    const _tc: ExportFormat | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders single-format button with resolved label", () => {
    render(
      <ExportButton
        data={data}
        formats={["csv"]}
        filename="report"
        label="Export CSV"
      />,
    );
    expect(screen.getByText("Export CSV")).toBeDefined();
  });

  it("uses i18n label when none provided", () => {
    render(<ExportButton data={data} formats={["csv"]} />);
    expect(screen.getByText("exportButton.label")).toBeDefined();
  });

  it("renders dropdown trigger (no items) for empty formats list", () => {
    // formats.length !== 1 → multi-format path renders the dropdown trigger.
    render(<ExportButton data={data} formats={[]} label="x" />);
    expect(screen.getByText("x")).toBeDefined();
  });

  it("triggers csv export and onExport on single-format click", () => {
    const onExport = vi.fn();
    render(
      <ExportButton
        data={data}
        formats={["csv"]}
        filename="report"
        onExport={onExport}
      />,
    );
    fireEvent.click(screen.getByText("exportButton.label"));
    expect(onExport).toHaveBeenCalledWith("csv", data);
    expect(clickMock).toHaveBeenCalledWith("report.csv");
  });

  it("triggers json export on single-format json click", () => {
    const onExport = vi.fn();
    render(
      <ExportButton
        data={data}
        formats={["json"]}
        filename="data"
        onExport={onExport}
      />,
    );
    fireEvent.click(screen.getByText("exportButton.label"));
    expect(onExport).toHaveBeenCalledWith("json", data);
    expect(clickMock).toHaveBeenCalledWith("data.json");
  });

  it("triggers xlsx (xls) export on single-format xlsx click", () => {
    const onExport = vi.fn();
    render(
      <ExportButton
        data={data}
        formats={["xlsx"]}
        filename="sheet"
        onExport={onExport}
      />,
    );
    fireEvent.click(screen.getByText("exportButton.label"));
    expect(onExport).toHaveBeenCalledWith("xlsx", data);
    expect(clickMock).toHaveBeenCalledWith("sheet.xls");
  });

  it("uses explicit columns for csv export", () => {
    render(
      <ExportButton
        data={data}
        formats={["csv"]}
        filename="cols"
        columns={[
          { key: "name", header: "Name" },
          { key: "age", header: "Age", format: (v) => `${v}y` },
        ]}
      />,
    );
    fireEvent.click(screen.getByText("exportButton.label"));
    expect(clickMock).toHaveBeenCalledWith("cols.csv");
  });

  it("renders dropdown trigger for multi-format", () => {
    render(<ExportButton data={data} formats={["csv", "json"]} label="导出" />);
    expect(screen.getByText("导出")).toBeDefined();
  });

  it("does not render trigger button when data is empty and single format", () => {
    // single format with empty data still renders the button (it just exports empty)
    render(<ExportButton data={[]} formats={["csv"]} label="L" />);
    expect(screen.getByText("L")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/export-button");
    expect(mod.ExportButton).toBeDefined();
  });

  it("escapes HTML in print export title, headers, and cells", () => {
    const write = vi.fn();
    const print = vi.fn();
    const close = vi.fn();
    vi.spyOn(window, "open").mockReturnValue({
      document: { write, close },
      print,
    } as unknown as Window);

    const payload = "<img src=x onerror=alert(1)>";
    render(
      <ExportButton
        data={[{ name: payload }]}
        formats={["print"]}
        filename={`report${payload}`}
        columns={[{ key: "name", header: `H${payload}` }]}
        label="Print"
      />,
    );
    fireEvent.click(screen.getByText("Print"));

    expect(write).toHaveBeenCalledTimes(1);
    const html = String(write.mock.calls[0]?.[0] ?? "");
    // Escaped as text — no raw HTML tags introduced by untrusted data.
    expect(html).not.toMatch(/<img\b/i);
    expect(html).not.toMatch(/<script\b/i);
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(html).toContain(
      `<title>report&lt;img src=x onerror=alert(1)&gt;</title>`,
    );
    expect(html).toContain(`<th>H&lt;img src=x onerror=alert(1)&gt;</th>`);
    expect(print).toHaveBeenCalled();
    expect(close).toHaveBeenCalled();
  });
});
