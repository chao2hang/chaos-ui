import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TemplateDownload } from "./template-download";
import type {
  TemplateDownloadProps,
  TemplateDownloadItem,
} from "./template-download";

describe("TemplateDownload", () => {
  it("exports the component and types", () => {
    expect(TemplateDownload).toBeDefined();
    const _tc: TemplateDownloadProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the empty state when no templates are provided", () => {
    render(<TemplateDownload templates={[]} />);
    expect(screen.getByText("暂无可用模板")).toBeDefined();
  });

  it("renders a custom empty label", () => {
    render(<TemplateDownload templates={[]} emptyLabel="没有模板" />);
    expect(screen.getByText("没有模板")).toBeDefined();
  });

  it("renders each template name, type label, and download link", () => {
    const templates: TemplateDownloadItem[] = [
      { id: "1", name: "发票模板", url: "/templates/invoice.docx", type: "docx" },
      { id: "2", name: "收据模板", url: "/templates/receipt.xlsx", type: "xlsx" },
    ];
    render(<TemplateDownload templates={templates} />);

    expect(screen.getByText("发票模板")).toBeDefined();
    expect(screen.getByText("Word")).toBeDefined();
    expect(screen.getByText("收据模板")).toBeDefined();
    expect(screen.getByText("Excel")).toBeDefined();

    const links = screen.getAllByText("下载");
    expect(links).toHaveLength(2);
    expect(links[0]?.getAttribute("href")).toBe("/templates/invoice.docx");
    expect(links[0]?.getAttribute("download")).toBe("发票模板");
  });

  it("invokes onDownload with the template when a link is clicked", () => {
    const onDownload = vi.fn();
    const templates: TemplateDownloadItem[] = [
      { id: "1", name: "发票模板", url: "/templates/invoice.docx", type: "docx" },
    ];
    render(<TemplateDownload templates={templates} onDownload={onDownload} />);

    fireEvent.click(screen.getByText("下载"));
    expect(onDownload).toHaveBeenCalledTimes(1);
    expect(onDownload).toHaveBeenCalledWith(templates[0]);
  });
});
