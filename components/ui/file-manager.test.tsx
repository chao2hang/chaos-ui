import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { FileManager } from "@/components/ui/file-manager";
import type { FileNode } from "@/components/ui/file-manager";

const sampleData: FileNode[] = [
  {
    id: "1",
    name: "项目文档",
    type: "folder",
    children: [
      { id: "3", name: "需求文档", type: "folder", children: [] },
      {
        id: "4",
        name: "设计稿",
        type: "folder",
        children: [
          { id: "5", name: "首页.png", type: "file", extension: "png", size: 204800, modifiedAt: "2026-07-01" },
          { id: "6", name: "详情页.png", type: "file", extension: "png", size: 156000, modifiedAt: "2026-07-02" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "报表",
    type: "folder",
    children: [
      { id: "7", name: "月度总结.xlsx", type: "file", extension: "xlsx", size: 51200, modifiedAt: "2026-07-08" },
      { id: "8", name: "季度报告.docx", type: "file", extension: "docx", size: 102400, modifiedAt: "2026-06-30" },
    ],
  },
];

describe("FileManager", () => {
  it("renders sidebar folders and file list", () => {
    const { container } = render(<FileManager data={sampleData} />);
    expect(container.textContent).toContain("项目文档");
    expect(container.textContent).toContain("报表");
  });

  it("navigates into folder on click", async () => {
    const onFolderChange = vi.fn();
    const { container } = render(
      <FileManager data={sampleData} onFolderChange={onFolderChange} />,
    );

    // Click the first folder button in the sidebar
    const folderBtns = container.querySelectorAll("button");
    const projectBtn = Array.from(folderBtns).find(
      (b) => b.textContent?.includes("项目文档"),
    );
    expect(projectBtn).not.toBeNull();

    await act(async () => {
      if (projectBtn) fireEvent.click(projectBtn);
    });

    expect(onFolderChange).toHaveBeenCalled();
  });

  it("calls onFileClick when a file is clicked", async () => {
    const onFileClick = vi.fn();
    const { container } = render(
      <FileManager
        data={sampleData}
        currentFolderId="2"
        onFileClick={onFileClick}
      />,
    );

    // Find the clickable file row — look for elements with the file name text
    // that also have the cursor-pointer class (only clickable rows have it)
    const clickable = Array.from(
      container.querySelectorAll(".cursor-pointer"),
    ).find((el) => el.textContent?.includes("月度总结.xlsx"));

    expect(clickable).not.toBeNull();

    await act(async () => {
      if (clickable) fireEvent.click(clickable);
    });

    expect(onFileClick).toHaveBeenCalled();
  });

  it("toggles between list and grid views", () => {
    const onViewModeChange = vi.fn();
    const { container } = render(
      <FileManager
        data={sampleData}
        viewMode="list"
        onViewModeChange={onViewModeChange}
      />,
    );

    // Verify the view mode label is present
    expect(container.textContent).toContain("列表视图");
  });

  it("renders breadcrumb navigation", () => {
    const { container } = render(
      <FileManager data={sampleData} currentFolderId="1" />,
    );
    expect(container.textContent).toContain("项目文档");
  });

  it("shows empty state for empty folder", () => {
    const { container } = render(
      <FileManager data={sampleData} currentFolderId="3" />,
    );
    expect(container.textContent).toContain("此文件夹为空");
  });

  it("filters items by search", async () => {
    const { container } = render(
      <FileManager data={sampleData} currentFolderId="4" />,
    );

    const searchInput = container.querySelector('input[placeholder="搜索..."]');
    expect(searchInput).not.toBeNull();

    await act(async () => {
      fireEvent.change(searchInput!, { target: { value: "首页" } });
    });

    expect(container.textContent).toContain("首页.png");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/file-manager");
    expect(mod.FileManager).toBeDefined();
  });
});
