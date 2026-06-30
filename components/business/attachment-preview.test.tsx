import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AttachmentPreview } from "./attachment-preview";
import type { AttachmentPreviewProps } from "./attachment-preview";

describe("AttachmentPreview", () => {
  it("renders an img for image types", () => {
    render(
      <AttachmentPreview
        url="https://example.com/cat.png"
        type="image/png"
        name="cat.png"
      />,
    );
    const img = screen.getByRole("img");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe("https://example.com/cat.png");
    expect(img.getAttribute("alt")).toBe("cat.png");
  });

  it("renders a fallback link for non-image types", () => {
    render(
      <AttachmentPreview
        url="https://example.com/report.pdf"
        type="application/pdf"
        name="report.pdf"
      />,
    );
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://example.com/report.pdf");
    expect(screen.getByText("report.pdf")).toBeDefined();
  });

  it("uses the default alt text when no name is given", () => {
    render(<AttachmentPreview url="https://example.com/cat.png" type="image/png" />);
    expect(screen.getByRole("img").getAttribute("alt")).toBe("附件");
  });

  it("uses the default link label when no name is given", () => {
    render(
      <AttachmentPreview url="https://example.com/x.pdf" type="application/pdf" />,
    );
    expect(screen.getByText("打开附件")).toBeDefined();
  });

  it("exports types", () => {
    const _tc: AttachmentPreviewProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
