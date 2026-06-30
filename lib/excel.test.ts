import { describe, it, expect } from "vitest";
import { excel, toCSV, parseCSV, toSpreadsheetXml } from "./excel";

describe("excel", () => {
  it("exports the helper bag", () => {
    expect(excel().toCSV).toBe(toCSV);
  });

  it("toCSV serializes rows", () => {
    const csv = toCSV([{ a: 1, b: "hi" }]);
    expect(csv).toContain("a,b");
    expect(csv).toContain("1,hi");
  });

  it("toCSV escapes quotes and commas", () => {
    const csv = toCSV([{ name: 'he said "hi", ok' }]);
    expect(csv).toContain('"he said ""hi"", ok"');
  });

  it("toCSV returns empty for no rows", () => {
    expect(toCSV([])).toBe("");
  });

  it("parseCSV round-trips", () => {
    const rows = [{ a: "1", b: "hi" }];
    const csv = toCSV(rows);
    const parsed = parseCSV(csv);
    expect(parsed).toEqual(rows);
  });

  it("parseCSV handles quoted fields with commas", () => {
    const parsed = parseCSV('name,note\r\n"x","a, b"\r\n');
    expect(parsed[0]?.note).toBe("a, b");
  });

  it("toSpreadsheetXml produces valid xml", () => {
    const xml = toSpreadsheetXml([["a", "b"], ["1", "2"]]);
    expect(xml).toContain("<?xml");
    expect(xml).toContain("<Workbook");
    expect(xml).toContain("Sheet1");
    expect(xml).toContain("<Cell><Data ss:Type=\"String\">a</Data></Cell>");
  });

  it("toSpreadsheetXml escapes special chars", () => {
    const xml = toSpreadsheetXml([["<x>"]]);
    expect(xml).toContain("&lt;x&gt;");
  });
});
