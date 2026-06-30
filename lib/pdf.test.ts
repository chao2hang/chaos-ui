import { describe, it, expect } from "vitest";
import { pdf, buildPdf, openPdf, downloadPdf } from "./pdf";

describe("pdf", () => {
  it("exports the helper bag", () => {
    expect(pdf().buildPdf).toBe(buildPdf);
  });

  it("buildPdf produces a valid PDF byte array", () => {
    const bytes = buildPdf("Report", ["Line one", "Line two"]);
    expect(bytes.length).toBeGreaterThan(0);
    expect(bytes[0]).toBe(37); // '%' char code — PDF magic
    const text = new TextDecoder().decode(bytes);
    expect(text.startsWith("%PDF-1.4")).toBe(true);
    expect(text.endsWith("%%EOF")).toBe(true);
    expect(text).toContain("Report");
    expect(text).toContain("Line one");
  });

  it("buildPdf escapes parentheses in content", () => {
    const bytes = buildPdf("T", ["a (b) c"]);
    const text = new TextDecoder().decode(bytes);
    expect(text).toContain("a \\(b\\) c");
  });

  it("buildPdf with no lines still valid", () => {
    const bytes = buildPdf("Empty");
    const text = new TextDecoder().decode(bytes);
    expect(text.startsWith("%PDF-1.4")).toBe(true);
  });

  it("openPdf is a no-op without window", () => {
    expect(() => openPdf(new Uint8Array())).not.toThrow();
  });

  it("downloadPdf is a no-op without window", () => {
    expect(() => downloadPdf(new Uint8Array(), "f.pdf")).not.toThrow();
  });
});
