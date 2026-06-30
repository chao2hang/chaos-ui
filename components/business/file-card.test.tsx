import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FileCard } from "./file-card";
import type { FileCardProps } from "./file-card";

describe("FileCard", () => {
  it("renders the file name and formatted size", () => {
    render(<FileCard name="report.pdf" size={1024} type="application/pdf" />);
    expect(screen.getByText("report.pdf")).toBeDefined();
    expect(screen.getByText("1.0 KB")).toBeDefined();
  });

  it("renders a download link when url is provided", () => {
    render(
      <FileCard
        name="report.pdf"
        size={1024}
        type="application/pdf"
        url="https://example.com/report.pdf"
      />,
    );
    const link = screen.getByRole("link", { name: "下载 report.pdf" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("https://example.com/report.pdf");
  });

  it("does not render a download link without url", () => {
    render(<FileCard name="report.pdf" size={1024} type="application/pdf" />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("calls onRemove when the remove button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <FileCard
        name="report.pdf"
        size={1024}
        type="application/pdf"
        onRemove={onRemove}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "移除 report.pdf" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("exports types", () => {
    const _tc: FileCardProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
