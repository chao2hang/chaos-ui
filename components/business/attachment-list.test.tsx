import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AttachmentList } from "./attachment-list";
import type { AttachmentListProps } from "./attachment-list";

describe("AttachmentList", () => {
  it("renders each attachment name", () => {
    render(
      <AttachmentList
        attachments={[
          { id: "1", name: "report.pdf", size: 1024, type: "application/pdf" },
          { id: "2", name: "photo.png", size: 2048, type: "image/png" },
        ]}
      />,
    );
    expect(screen.getByText("report.pdf")).toBeDefined();
    expect(screen.getByText("photo.png")).toBeDefined();
  });

  it("renders the empty state when there are no attachments", () => {
    render(<AttachmentList attachments={[]} />);
    expect(screen.getByText("暂无附件")).toBeDefined();
  });

  it("renders a download link when an attachment has a url", () => {
    render(
      <AttachmentList
        attachments={[
          {
            id: "1",
            name: "report.pdf",
            size: 1024,
            type: "application/pdf",
            url: "https://example.com/report.pdf",
          },
        ]}
      />,
    );
    expect(
      screen.getByRole("link", { name: "下载 report.pdf" }),
    ).toBeDefined();
  });

  it("renders a remove button and calls onRemove when clicked", () => {
    const onRemove = vi.fn();
    render(
      <AttachmentList
        attachments={[
          { id: "abc", name: "report.pdf", size: 1024, type: "application/pdf" },
        ]}
        onRemove={onRemove}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "移除 report.pdf" }));
    expect(onRemove).toHaveBeenCalledWith("abc");
  });

  it("exports types", () => {
    const _tc: AttachmentListProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
