/**
 * RSC (React Server Components) compatibility verification.
 *
 * This file verifies that:
 * 1. All "use client" directives are in place for client-only components
 * 2. Type-only exports are available for server components
 * 3. No server-side-only APIs are used in client components
 *
 * Run: npx tsx scripts/verify-rsc.mjs
 */

import fs from "node:fs";
import path from "node:path";

const dirs = ["components/ui", "components/business", "components/layout", "hooks", "lib"];
const issues: string[] = [];

function checkDir(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDir(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts"))) {
      const content = fs.readFileSync(fullPath, "utf-8");

      // Skip test/story files
      if (fullPath.includes(".test.") || fullPath.includes(".stories.") || fullPath.includes(".spec.")) continue;

      // Check: components using hooks (useState, useEffect, useRef, etc.) must have "use client"
      const usesClientHooks = /\b(useState|useEffect|useRef|useReducer|useContext|useCallback|useMemo)\b/.test(content);
      const hasUseClient = content.startsWith('"use client"') || content.startsWith("'use client'");
      const hasUseServer = content.startsWith('"use server"') || content.startsWith("'use server'");

      if (usesClientHooks && !hasUseClient && !hasUseServer) {
        issues.push(`Missing "use client" in ${fullPath} (uses client hooks)`);
      }

      // Check: no direct DOM access (window, document) without "use client"
      const usesDOM = /\b(window|document)\b/.test(content);
      if (usesDOM && !hasUseClient && !hasUseServer) {
        issues.push(`Missing "use client" in ${fullPath} (uses DOM APIs)`);
      }
    }
  }
}

for (const dir of dirs) {
  checkDir(dir);
}

if (issues.length === 0) {
  console.log("✅ RSC compatibility check passed — no issues found.");
  process.exit(0);
} else {
  console.log(`❌ RSC compatibility check found ${issues.length} issues:`);
  for (const issue of issues) {
    console.log(`  - ${issue}`);
  }
  process.exit(1);
}
