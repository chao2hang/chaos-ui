/**
 * @lib download
 * @category lib/file
 * @since 0.2.0
 * @description 文件下载工具 / File download utilities (Blob/URL/Stream)
 * @example
 * download.text('hello.txt', 'Hello World');
 * download.blob('data.bin', blob);
 * download.url('https://example.com/file.pdf');
 */

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export const download = {
  /**
   * Download text content as a file / 下载文本文件
   */
  text(filename: string, content: string, mime = "text/plain"): void {
    if (!isBrowser()) return;
    const blob = new Blob([content], { type: mime });
    this.blob(filename, blob);
  },

  /**
   * Download JSON as a file / 下载 JSON 文件
   */
  json(filename: string, data: unknown, pretty = true): void {
    const content = JSON.stringify(data, null, pretty ? 2 : 0);
    this.text(filename, content, "application/json");
  },

  /**
   * Download a Blob / 下载 Blob
   */
  blob(filename: string, blob: Blob): void {
    if (!isBrowser()) return;
    const url = URL.createObjectURL(blob);
    this.url(filename, url);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  /**
   * Download from a URL / 从 URL 下载
   */
  url(filename: string, url: string): void {
    if (!isBrowser()) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  /**
   * Download CSV from array of objects / 从对象数组下载 CSV
   */
  csv(filename: string, rows: Record<string, unknown>[], headers?: string[]): void {
    if (rows.length === 0) {
      this.text(filename, "", "text/csv");
      return;
    }

    const cols = headers ?? Object.keys(rows[0]!);
    const csvContent = [
      cols.join(","),
      ...rows.map((row) =>
        cols
          .map((col) => {
            const val = row[col];
            const str = val === null || val === undefined ? "" : String(val);
            // Escape quotes and wrap in quotes if needed
            if (str.includes(",") || str.includes('"') || str.includes("\n")) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          })
          .join(","),
      ),
    ].join("\n");

    // Add BOM for Excel compatibility
    this.text(filename, "\uFEFF" + csvContent, "text/csv;charset=utf-8");
  },

  /**
   * Download from fetch response / 从 fetch 响应下载
   */
  async response(filename: string, response: Response): Promise<void> {
    const blob = await response.blob();
    this.blob(filename, blob);
  },

  /**
   * Download via fetch with progress / 通过 fetch 下载(带进度)
   */
  async fetch(
    url: string,
    filename: string,
    options?: RequestInit,
  ): Promise<void> {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);
    await this.response(filename, response);
  },
};
