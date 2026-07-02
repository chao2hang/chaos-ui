import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

// Mock react-pdf to avoid loading pdf.js in jsdom
vi.mock("react-pdf", () => ({
  Document: ({ children, loading }: any) => (
    <div data-testid="pdf-document" data-loading={loading ? "true" : "false"}>
      {children}
    </div>
  ),
  Page: ({ pageNumber, scale }: any) => (
    <div data-testid="pdf-page" data-page={pageNumber} data-scale={scale} />
  ),
  pdfjs: {
    version: "4.0.0",
    GlobalWorkerOptions: { workerSrc: "" },
  },
}));

vi.mock("react-pdf/dist/Page/AnnotationLayer.css", () => ({}));
vi.mock("react-pdf/dist/Page/TextLayer.css", () => ({}));

const { PDFViewer } = await import("@/components/business/pdf-viewer");

describe("PDFViewer", () => {
  it("renders with src", () => {
    const { container } = render(
      <PDFViewer src="https://example.com/test.pdf" />,
    );
    expect(container.querySelector('[data-slot="pdf-viewer"]')).toBeTruthy();
  });

  it("renders title", () => {
    const { container } = render(
      <PDFViewer src="https://example.com/test.pdf" title="测试文档" />,
    );
    expect(container.textContent).toContain("测试文档");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <PDFViewer
        src="https://example.com/test.pdf"
        className="custom-pdf"
      />,
    );
    const el = container.querySelector(
      '[data-slot="pdf-viewer"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-pdf");
  });

  it("renders document area with role=document", () => {
    const { container } = render(
      <PDFViewer src="https://example.com/test.pdf" />,
    );
    const docArea = container.querySelector('[role="document"]');
    expect(docArea).toBeTruthy();
  });

  it("renders pagination controls", () => {
    const { container } = render(
      <PDFViewer src="https://example.com/test.pdf" />,
    );
    const buttons = container.querySelectorAll("button[aria-label]");
    const labels = Array.from(buttons).map((b) => b.getAttribute("aria-label"));
    expect(labels).toContain("上一页");
    expect(labels).toContain("下一页");
    expect(labels).toContain("放大");
    expect(labels).toContain("缩小");
    expect(labels).toContain("全屏");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/pdf-viewer");
    expect(mod.PDFViewer).toBeDefined();
  });
});
