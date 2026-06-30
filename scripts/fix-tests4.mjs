import fs from "node:fs";
import path from "node:path";

const dirs = ["components/ui", "components/business", "components/layout", "hooks", "lib"];
let fixed = 0;

const fixes = [
  // Generic types need type arguments
  { pattern: /: FormListProps \| undefined/g, replace: ": FormListProps<unknown> | undefined" },
  { pattern: /: VirtualListProps \| undefined/g, replace: ": VirtualListProps<unknown> | undefined" },
  { pattern: /: ColumnDef \| undefined/g, replace: ": ColumnDef<unknown> | undefined" },
  { pattern: /: VirtualTableProps \| undefined/g, replace: ": VirtualTableProps<unknown> | undefined" },
  // Import name mismatch
  { file: "components/business/status-badge.test.tsx", pattern: /PRESETS/g, replace: "STATUS_BADGE_PRESETS" },
];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!file.includes(".test.")) continue;
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, "utf-8");
    let modified = false;

    for (const fix of fixes) {
      if (fix.file && path.join(dir, file) !== fix.file) continue;
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.replace);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(fp, content);
      fixed++;
    }
  }
}

// Fix specific files with unused imports
const unusedImportFixes = [
  { file: "lib/api-client.test.ts", remove: 'import type { ApiClientConfig } from "./api-client";\n' },
  { file: "lib/logger.test.ts", remove: "" },
  { file: "lib/message.test.ts", remove: "" },
  { file: "lib/modal-store.test.tsx", remove: "" },
  { file: "lib/modal.test.ts", remove: "" },
];

for (const fix of unusedImportFixes) {
  if (!fs.existsSync(fix.file)) continue;
  let content = fs.readFileSync(fix.file, "utf-8");
  // Remove unused type imports
  content = content.replace(/import type \{[^}]+\} from "[^"]+";\n/g, (match) => {
    // Keep the import if it's actually used
    const typeName = match.match(/\{([^}]+)\}/)?.[1]?.trim();
    if (typeName && content.includes(typeName.split(",")[0].trim())) {
      return match;
    }
    return "";
  });
  // Fix unused 'it' and 'expect' imports
  if (fix.file === "lib/message.test.ts") {
    content = content.replace('import { describe, it, expect } from "vitest";', 'import { describe } from "vitest";');
  }
  // Fix unused LogLevel
  if (fix.file === "lib/logger.test.ts") {
    content = content.replace(/import type \{ LogLevel \} from ".\/logger";\n/g, "");
  }
  fs.writeFileSync(fix.file, content);
  fixed++;
}

console.log(`Fixed ${fixed} files`);
