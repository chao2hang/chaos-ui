/**
 * @module pdf
 * @category Utility
 * @since 1.0.0-beta.0
 * @description Minimal PDF helpers — builds a tiny valid single-page PDF document from plain text lines and renders an HTML print view. Not a full PDF engine; for rich layout integrate a peer dep like `pdfmake`/`@react-pdf/renderer`. The generated PDF uses the standard 14 font Helvetica.
 * @example
 * buildPdf("Report", ["Line one", "Line two"]);  // ArrayBuffer
 * openPdf(buildPdf(...));                          // opens in a new tab
 */

/** Escape a string for PDF text-showing operators. */
function escapePdf(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

/** Build a minimal one-page PDF document from a title and body lines. Returns a Uint8Array. */
export function buildPdf(title: string, lines: string[] = []): Uint8Array {
  const pageWidth = 595.28; // A4 in points
  const pageHeight = 841.89;
  const left = 56;
  const top = 800;
  const lineGap = 16;

  const content: string[] = [];
  content.push("BT");
  content.push(`/F1 18 Tf`);
  content.push(`${left} ${top} Td`);
  content.push(`(${escapePdf(title)}) Tj`);
  content.push(`/F1 11 Tf`);
  content.push(`0 -${lineGap} Td`);
  lines.forEach((line) => {
    content.push(`(${escapePdf(line)}) Tj`);
    content.push(`0 -${lineGap} Td`);
  });
  content.push("ET");

  const stream = content.join("\n");
  const objects: string[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " +
      pageWidth +
      " " +
      pageHeight +
      "] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
  );
  objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, idx) => {
    offsets.push(pdf.length);
    pdf += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += String(off).padStart(10, "0") + " 00000 n \n";
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

/** Build a PDF and open it in a new browser tab. No-op on the server. */
export function openPdf(bytes: Uint8Array): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/** Build a PDF and trigger a download with the given filename. */
export function downloadPdf(bytes: Uint8Array, filename: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Backward-compat default export name — returns the helper bag. */
export function pdf() {
  return { buildPdf, openPdf, downloadPdf };
}
