/**
 * @module excel
 * @category Utility
 * @since 1.0.0-beta.0
 * @description Spreadsheet helpers — CSV serialize/parse (RFC 4180 compliant) and a minimal XLSX (SpreadsheetML 2003 XML) generator for simple row data. No external dependency; for full XLSX read/write, integrate a peer dep like `exceljs`/`xlsx`.
 * @example
 * toCSV([{a:1,b:"hi"}]);          // "a,b\r\n1,hi\r\n"
 * parseCSV("a,b\r\n1,hi\r\n");    // [{a:"1",b:"hi"}]
 */

export interface CsvOptions {
  delimiter?: string;
  quote?: string;
  newline?: string;
  headers?: string[];
}

function escapeCell(value: unknown, quote = '"'): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(quote) || str.includes(",") || str.includes("\n") || str.includes("\r")) {
    return quote + str.replace(new RegExp(quote, "g"), quote + quote) + quote;
  }
  return str;
}

/** Serialize an array of row objects into a CSV string (BOM-free). */
export function toCSV(rows: Record<string, unknown>[], options: CsvOptions = {}): string {
  const { delimiter = ",", quote = '"', newline = "\r\n", headers } = options;
  if (rows.length === 0) return "";
  const cols = headers ?? Object.keys(rows[0]!);
  const head = cols.map((c) => escapeCell(c, quote)).join(delimiter);
  const body = rows
    .map((row) => cols.map((c) => escapeCell(row[c], quote)).join(delimiter))
    .join(newline);
  return head + newline + body + newline;
}

/** Parse a CSV string into an array of row objects (first row = headers). */
export function parseCSV(text: string, options: CsvOptions = {}): Record<string, string>[] {
  const { delimiter = ",", quote = '"' } = options;
  void options.newline;
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let i = 0;
  let inQuotes = false;
  const isDelim = (ch: string) => ch === delimiter;
  const isNewline = (ch: string, idx: number) => {
    if (ch === "\r" && text[idx + 1] === "\n") return 2;
    if (ch === "\r" || ch === "\n") return 1;
    return 0;
  };
  while (i < text.length) {
    const ch = text[i]!;
    if (inQuotes) {
      if (ch === quote) {
        if (text[i + 1] === quote) { cell += quote; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      cell += ch; i++; continue;
    }
    if (ch === quote) { inQuotes = true; i++; continue; }
    if (isDelim(ch)) { row.push(cell); cell = ""; i++; continue; }
    const nl = isNewline(ch, i);
    if (nl > 0) {
      i += nl;
      row.push(cell); cell = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = []; continue;
    }
    cell += ch; i++;
  }
  if (cell !== "" || row.length > 0) { row.push(cell); rows.push(row); }
  const headers = rows[0] ?? [];
  return rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => { obj[h] = r[idx] ?? ""; });
    return obj;
  });
}

/** A minimal XLSX (SpreadsheetML 2003 XML) string for a single sheet of row data. */
export function toSpreadsheetXml(
  rows: unknown[][],
  options: { sheetName?: string } = {},
): string {
  const { sheetName = "Sheet1" } = options;
  const escape = (v: unknown) =>
    String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const body = rows
    .map((row) => `<Row>${row.map((c) => `<Cell><Data ss:Type="String">${escape(c)}</Data></Cell>`).join("")}</Row>`)
    .join("");
  return `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="${escape(
    sheetName,
  )}"><Table>${body}</Table></Worksheet></Workbook>`;
}

/** Backward-compat default export name — returns the helper bag. */
export function excel() {
  return { toCSV, parseCSV, toSpreadsheetXml };
}
