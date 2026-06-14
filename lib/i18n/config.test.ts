import { describe, expect, it } from "vitest";

import i18n from "./config";

describe("i18n namespace resources", () => {
  it("resolves labels from all component namespaces", () => {
    const cases = [
      ["en-US", "data", "emptyState.default.title", "No data"],
      ["en-US", "transfer", "transfer.sourceTitle", "Source"],
      ["en-US", "upload", "exportButton.label", "Export"],
      [
        "en-US",
        "navigation",
        "commandPalette.placeholder",
        "Type a command or search...",
      ],
      ["en-US", "ui", "dialog.close", "Close"],
      ["zh-CN", "data", "pivotTable.noData", "无数据"],
      ["zh-CN", "transfer", "transfer.sourceTitle", "源列表"],
      ["zh-CN", "upload", "exportButton.label", "导出"],
      [
        "zh-CN",
        "navigation",
        "commandPalette.placeholder",
        "输入命令或搜索...",
      ],
      ["zh-CN", "ui", "combobox.clear", "清除"],
    ] as const;

    for (const [lng, ns, key, expected] of cases) {
      expect(i18n.t(key, { lng, ns })).toBe(expected);
    }
  });
});
