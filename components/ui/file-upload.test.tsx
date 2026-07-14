import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FileUpload, FileList } from "./file-upload";

describe("file-upload", () => {
  it("exports FileUpload", () => {
    expect(FileUpload).toBeDefined();
  });

  it("exports FileList", () => {
    expect(FileList).toBeDefined();
  });

  it("renders Chinese default hint without i18n provider (issue #19)", () => {
    render(<FileUpload maxFiles={5} />);
    expect(screen.getByText("拖拽文件到此处，或点击选择")).toBeDefined();
    expect(screen.getByText("最多 5 个文件")).toBeDefined();
  });

  it("allows labels override", () => {
    render(
      <FileUpload
        maxFiles={3}
        labels={{ hint: "Custom hint", maxFiles: "3 files max" }}
      />,
    );
    expect(screen.getByText("Custom hint")).toBeDefined();
    expect(screen.getByText("3 files max")).toBeDefined();
  });
});
