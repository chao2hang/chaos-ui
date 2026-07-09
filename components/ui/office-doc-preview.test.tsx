import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OfficeDocPreview, detectDocType } from "@/components/ui/office-doc-preview";

describe("detectDocType", () => {
  it("detects word documents", () => {
    expect(detectDocType("report.docx")).toBe("word");
    expect(detectDocType("memo.doc")).toBe("word");
    expect(detectDocType("notes.rtf")).toBe("word");
  });

  it("detects excel spreadsheets", () => {
    expect(detectDocType("data.xlsx")).toBe("excel");
    expect(detectDocType("export.xls")).toBe("excel");
    expect(detectDocType("list.csv")).toBe("excel");
  });

  it("detects powerpoint presentations", () => {
    expect(detectDocType("slides.pptx")).toBe("ppt");
    expect(detectDocType("deck.ppt")).toBe("ppt");
  });

  it("returns unknown for unsupported types", () => {
    expect(detectDocType("image.png")).toBe("unknown");
    expect(detectDocType("file.pdf")).toBe("unknown");
  });

  it("returns unknown for empty filename", () => {
    expect(detectDocType()).toBe("unknown");
  });
});

describe("OfficeDocPreview", () => {
  it("renders with toolbar", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/doc.docx"
        fileName="report.docx"
      />,
    );
    expect(container.textContent).toContain("Word 文档");
  });

  it("renders with excel label", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/data.xlsx"
        fileName="data.xlsx"
      />,
    );
    expect(container.textContent).toContain("Excel 表格");
  });

  it("renders with ppt label", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/slides.pptx"
        fileName="slides.pptx"
      />,
    );
    expect(container.textContent).toContain("PowerPoint 演示");
  });

  it("renders iframe", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/doc.docx"
        fileName="report.docx"
      />,
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe!.src).toContain("view.officeapps.live.com");
  });

  it("uses google engine when specified", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/doc.docx"
        fileName="report.docx"
        engine="google"
      />,
    );
    const iframe = container.querySelector("iframe");
    expect(iframe!.src).toContain("docs.google.com");
  });

  it("hides toolbar when showToolbar=false", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/doc.docx"
        showToolbar={false}
      />,
    );
    expect(container.textContent).not.toContain("Word 文档");
  });

  it("renders download button when allowDownload=true", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/doc.docx"
        fileName="report.docx"
        allowDownload
      />,
    );
    // Download link should have download attribute
    const downloadLink = container.querySelector("a[download]");
    expect(downloadLink).not.toBeNull();
  });

  it("applies custom height", () => {
    const { container } = render(
      <OfficeDocPreview
        src="https://example.com/doc.docx"
        height={400}
      />,
    );
    const wrapper = container.querySelector("[data-slot=office-doc-preview]");
    expect(wrapper).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/office-doc-preview");
    expect(mod.OfficeDocPreview).toBeDefined();
    expect(mod.detectDocType).toBeDefined();
  });
});
