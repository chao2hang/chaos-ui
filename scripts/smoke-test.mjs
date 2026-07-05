#!/usr/bin/env node
/**
 * 消费方 smoke test：验证发布产物的完整性与 exports 一致性。
 *
 * 模拟消费方 `pnpm add @qxyfoods/chaos-ui` 后能否真正 import：
 * 1. 读 package.json exports，提取所有指向 dist 的产物路径
 * 2. 检查每个产物文件在文件系统存在（dist 需先 build）
 * 3. 检查 files 字段声明的关键文件存在（README/LICENSE/styles.css 等）
 * 4. 断言 dist 无 sourcemap 泄漏（.map 不该发布）
 *
 * 不用 `pnpm pack`（会触发 prepack rebuild 且 stdout 被污染），改为直接
 * 检查文件系统——消费方 install 后拿到的就是这些文件。
 *
 * 用法：node scripts/smoke-test.mjs（需先 pnpm run build:pkg）
 * 退出码：0 = 通过；1 = 失败。
 */
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises";

const root = fileURLToPath(new URL("../", import.meta.url));
const pkgPath = join(root, "package.json");
const pkg = JSON.parse(await readFile(pkgPath, "utf8"));

const errors = [];

async function exists(rel) {
  try {
    const s = await stat(join(root, rel));
    return s.isFile();
  } catch {
    return false;
  }
}

// 1. 收集 exports 指向的产物文件
const expectedFiles = new Set();
for (const [subpath, target] of Object.entries(pkg.exports ?? {})) {
  if (subpath === "./package.json") continue;
  if (typeof target === "string") {
    expectedFiles.add(target);
    continue;
  }
  for (const cond of ["types", "import", "require", "default"]) {
    if (target[cond]) expectedFiles.add(target[cond]);
  }
}

// 2. 检查每个 exports 产物存在
for (const f of expectedFiles) {
  if (!(await exists(f))) {
    errors.push(`exports 指向的产物不存在（需先 build）: ${f}`);
  }
}

// 3. 检查 files 字段声明的关键文件
const mustHave = ["package.json", "dist/index.js", "dist/index.d.ts"];
if (pkg.files?.includes("README.md")) mustHave.push("README.md");
if (pkg.files?.includes("LICENSE")) mustHave.push("LICENSE");
if (pkg.files?.includes("CHANGELOG.md")) mustHave.push("CHANGELOG.md");
if (pkg.files?.includes("styles.css")) mustHave.push("styles.css");
if (pkg.files?.includes("styles.css.d.ts")) mustHave.push("styles.css.d.ts");
for (const f of mustHave) {
  if (!(await exists(f))) errors.push(`files 声明的关键文件不存在: ${f}`);
}

// 4. 断言 dist 无 sourcemap（.map 不该发布）
let maps = [];
try {
  const distEntries = await readdir(join(root, "dist"), { recursive: true });
  maps = distEntries.filter((p) => p.endsWith(".map"));
} catch {
  errors.push("dist 目录不存在（需先 pnpm run build:pkg）");
}
if (maps.length > 0) {
  errors.push(`dist 含 sourcemap（${maps.length} 个）: ${maps.slice(0, 3).join(", ")}`);
}

if (errors.length > 0) {
  console.error("✖ smoke test 失败：");
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}

console.log(
  `✓ smoke test 通过：${expectedFiles.size} 个 exports 产物齐全，关键 files 存在，无 sourcemap 泄漏`,
);
