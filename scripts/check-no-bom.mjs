#!/usr/bin/env node
/**
 * 检查源码文件是否以 UTF-8 BOM (EF BB BF) 开头。
 *
 * BOM 会使文件首行的 "use client" / "use server" 指令失效，
 * 导致 React Server Components 把该模块误判为 Server Component 而在运行时崩溃。
 * ESLint 规则层无法可靠检测 BOM（解析器在解析时已消费 BOM），故用独立脚本扫描。
 *
 * 用法：node scripts/check-no-bom.mjs
 * 退出码：0 = 无 BOM；1 = 发现 BOM 文件。
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\//, "");
const TARGETS = ["components", "hooks", "lib", "package", "app", "src"];
const EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".css", ".json", ".md", ".mdx"]);
const EXCLUDE = new Set(["node_modules", ".next", "dist", "storybook-static", "coverage", ".workbuddy"]);

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (EXCLUDE.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      const dot = entry.name.slice(entry.name.lastIndexOf("."));
      if (EXTS.has(dot)) yield full;
    }
  }
}

const bomFiles = [];
for (const target of TARGETS) {
  for await (const file of walk(join(ROOT, target))) {
    const fh = await readFile(file);
    if (fh.length >= 3 && fh[0] === 0xef && fh[1] === 0xbb && fh[2] === 0xbf) {
      bomFiles.push(relative(ROOT, file));
    }
  }
}

if (bomFiles.length > 0) {
  console.error("✖ 发现 UTF-8 BOM 文件（会使 \"use client\" 指令失效）：");
  for (const f of bomFiles) console.error("  " + f);
  console.error("\n修复：以 UTF-8 (无 BOM) 重新保存，或运行 sed -i '1s/^\\xEF\\xBB\\xBF//' <file>");
  process.exit(1);
}

console.log("✓ 未发现 UTF-8 BOM 文件");
