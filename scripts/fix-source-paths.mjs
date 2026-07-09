/**
 * Fix sourcePath metadata in components.meta.ts
 *
 * Checks each component's sourcePath and corrects it if the file
 * doesn't exist at the specified location but exists elsewhere.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const META_FILE = join(ROOT, "apps/docs/@/content/components.meta.ts");

function readText(p) {
  try {
    return readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

function fileExists(p) {
  return existsSync(join(ROOT, p));
}

function findComponentFile(sourcePath, name) {
  // Try the original path first
  if (fileExists(sourcePath)) return sourcePath;

  // Extract the relative path after components/
  const match = sourcePath.match(/components\/(.+\.tsx)$/);
  if (match) {
    const relativePath = match[1];
    // Try in components/ directly
    const altPath = `components/${relativePath}`;
    if (fileExists(altPath)) return altPath;

    // Try in packages/chaos-design-ui/components/ (already checked via sourcePath)
    // Try without the ui/ or business/ prefix
    const altPath2 = `packages/chaos-design-ui/components/${relativePath}`;
    if (fileExists(altPath2)) return altPath2;
  }

  // Try to find by component name
  const nameLower = name.toLowerCase();
  const nameKebab = nameLower.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");

  // Check common locations
  const possiblePaths = [
    `components/ui/${nameKebab}.tsx`,
    `components/business/${nameKebab}.tsx`,
    `components/layout/${nameKebab}.tsx`,
    `components/mobile/${nameKebab}.tsx`,
    `components/ui/${nameLower}.tsx`,
    `components/business/${nameLower}.tsx`,
  ];

  for (const p of possiblePaths) {
    if (fileExists(p)) return p;
  }

  return null;
}

function main() {
  console.log("🔧 Fixing sourcePath metadata...\n");

  const text = readText(META_FILE);
  if (!text) throw new Error(`Cannot read ${META_FILE}`);

  let fixCount = 0;
  let alreadyOk = 0;
  let notFound = 0;

  // Find all sourcePath entries
  const sourcePathRegex = /sourcePath:\s*"([^"]+)"/g;
  const lines = text.split("\n");
  let newText = text;

  // Process each sourcePath
  const matches = [...text.matchAll(sourcePathRegex)];
  console.log(`Found ${matches.length} sourcePath entries.`);

  for (const match of matches) {
    const originalPath = match[1];
    if (fileExists(originalPath)) {
      alreadyOk++;
      continue;
    }

    // Extract component name from surrounding context
    const startPos = match.index;
    const contextBefore = text.slice(Math.max(0, startPos - 500), startPos);
    const nameMatch = contextBefore.match(/name:\s*"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : "";

    const correctedPath = findComponentFile(originalPath, name);

    if (correctedPath && correctedPath !== originalPath) {
      newText = newText.replace(
        `sourcePath: "${originalPath}"`,
        `sourcePath: "${correctedPath}"`
      );
      fixCount++;
      console.log(`  ✅ ${name}: ${originalPath} → ${correctedPath}`);
    } else {
      notFound++;
      console.log(`  ❌ ${name}: ${originalPath} (file not found anywhere)`);
    }
  }

  // Write corrected file
  if (fixCount > 0) {
    writeFileSync(META_FILE, newText);
    console.log(`\n✅ Fixed ${fixCount} sourcePath entries.`);
  } else {
    console.log(`\nNo fixes needed.`);
  }

  console.log(`📊 Summary: ${alreadyOk} OK, ${fixCount} fixed, ${notFound} not found.`);
}

main();
