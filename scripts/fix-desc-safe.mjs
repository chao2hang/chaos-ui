/**
 * Safely fix template descriptions in components.meta.ts
 * 
 * Strategy: Process line-by-line to avoid corrupting other fields.
 * Only replace descZh/desc values that match template patterns.
 */

import { readFileSync, writeFileSync } from "node:fs";
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

const TEMPLATE_ZH_PATTERNS = [
  /面向 ERP\/企业场景的业务组件/,
];

const TEMPLATE_EN_PATTERNS = [
  /a general-purpose primitives? used across the app/i,
];

function isTemplateZh(desc) {
  return TEMPLATE_ZH_PATTERNS.some((p) => p.test(desc));
}

function isTemplateEn(desc) {
  return TEMPLATE_EN_PATTERNS.some((p) => p.test(desc));
}

function extractPropsFromSource(src) {
  const props = [];
  const interfaceRegex = /(?:export\s+)?interface\s+(\w*Props)\s*(?:extends\s+[\s\S]*?)?\s*\{([\s\S]*?)\}/g;
  let match;
  while ((match = interfaceRegex.exec(src)) !== null) {
    const body = match[2];
    const propRegex = /^\s*(?:\/\*\*[\s\S]*?\*\/\s*)?(\w+)(\?)?:\s*([^;\n]+)/gm;
    let propMatch;
    while ((propMatch = propRegex.exec(body)) !== null) {
      const [, propName, optional, propType] = propMatch;
      if (propName && !propName.startsWith("//")) {
        props.push({ name: propName, type: propType.trim(), optional: !!optional });
      }
    }
  }
  const typeRegex = /(?:export\s+)?type\s+(\w*Props)\s*=\s*([^;]+)/g;
  while ((match = typeRegex.exec(src)) !== null) {
    const typeBody = match[2];
    if (typeBody.includes("ComponentProps") || typeBody.includes("HTMLAttributes")) {
      props.push({ name: "...spread", type: typeBody.trim(), optional: true });
    }
  }
  return props;
}

function generateDescription(name, nameZh, sourcePath, category) {
  const src = readText(join(ROOT, sourcePath));
  if (!src) return null;

  // Try JSDoc comment
  const commentMatch = src.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n\s*\*\//);
  if (commentMatch && commentMatch[1].length > 10 && !commentMatch[1].includes("use client")) {
    const desc = commentMatch[1].trim();
    return { zh: desc, en: desc };
  }

  // Generate from component name and Props
  const props = extractPropsFromSource(src);
  const keyProps = props.filter(p => !["className", "style", "children", "asChild", "...spread"].includes(p.name)).slice(0, 5);
  const propsList = keyProps.length > 0 ? keyProps.map(p => p.name).join(", ") : "";

  const zh = nameZh
    ? `${nameZh} — ${category === "Business" ? "业务" : ""}组件${propsList ? `，核心属性：${propsList}` : ""}。`
    : `${name} — component${propsList ? ` with props: ${propsList}` : ""}.`;

  const en = `${name} — ${category === "Business" ? "business" : ""} component${propsList ? ` with key props: ${propsList}` : ""}.`;

  return { zh, en };
}

// Parse components from meta to get name, nameZh, category, sourcePath for each slug
function parseComponents(text) {
  const components = [];
  // Match blocks: { slug: "...", name: "...", nameZh: "...", category: "...", ... }
  const blockRegex = /\{\s*slug:\s*"([^"]+)",[\s\S]*?\}/g;
  let match;
  while ((match = blockRegex.exec(text)) !== null) {
    const block = match[0];
    const slug = match[1];
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    const nameZhMatch = block.match(/nameZh:\s*"([^"]*)"/);
    const categoryMatch = block.match(/category:\s*"([^"]+)"/);
    const sourcePathMatch = block.match(/sourcePath:\s*"([^"]+)"/);
    
    if (nameMatch && categoryMatch) {
      components.push({
        slug,
        name: nameMatch[1],
        nameZh: nameZhMatch ? nameZhMatch[1] : "",
        category: categoryMatch[1],
        sourcePath: sourcePathMatch ? sourcePathMatch[1] : "",
        blockStart: match.index,
        blockEnd: match.index + match[0].length,
        block,
      });
    }
  }
  return components;
}

function main() {
  console.log("🔧 Safely fixing template descriptions...\n");

  let text = readText(META_FILE);
  if (!text) throw new Error(`Cannot read ${META_FILE}`);

  const components = parseComponents(text);
  console.log(`Found ${components.length} components.`);

  let fixed = 0;
  const lines = text.split("\n");

  // Build a map of line index to component info for template desc lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for template descZh on a single line
    // Pattern: descZh: "面向 ERP/企业场景的业务组件。",
    const descZhMatch = line.match(/^(\s*descZh:\s*"?)([^"]*面向 ERP[^"]*?)("?,?)\s*$/);
    if (descZhMatch) {
      // Find the component this line belongs to
      // Search backwards for the slug
      let componentSlug = null;
      let compInfo = null;
      for (let j = i - 1; j >= 0 && j > i - 20; j--) {
        const slugMatch = lines[j].match(/slug:\s*"([^"]+)"/);
        if (slugMatch) {
          componentSlug = slugMatch[1];
          compInfo = components.find(c => c.slug === componentSlug);
          break;
        }
      }

      if (compInfo && compInfo.sourcePath) {
        const newDesc = generateDescription(compInfo.name, compInfo.nameZh, compInfo.sourcePath, compInfo.category);
        if (newDesc) {
          const indent = line.match(/^(\s*)/)[1];
          lines[i] = `${indent}descZh: "${newDesc.zh}",`;
          fixed++;
        }
      }
    }

    // Check for template desc (English) on a single line
    const descMatch = line.match(/^(\s*desc:\s*"?)([^"]*general-purpose[^"]*?)("?,?)\s*$/);
    if (descMatch) {
      let componentSlug = null;
      let compInfo = null;
      for (let j = i - 1; j >= 0 && j > i - 20; j--) {
        const slugMatch = lines[j].match(/slug:\s*"([^"]+)"/);
        if (slugMatch) {
          componentSlug = slugMatch[1];
          compInfo = components.find(c => c.slug === componentSlug);
          break;
        }
      }

      if (compInfo && compInfo.sourcePath) {
        const newDesc = generateDescription(compInfo.name, compInfo.nameZh, compInfo.sourcePath, compInfo.category);
        if (newDesc) {
          const indent = line.match(/^(\s*)/)[1];
          lines[i] = `${indent}desc: "${newDesc.en}",`;
        }
      }
    }
  }

  // Write back
  if (fixed > 0) {
    writeFileSync(META_FILE, lines.join("\n"));
    console.log(`✅ Fixed ${fixed} template descriptions.`);
  } else {
    console.log(`No template descriptions found to fix.`);
  }
}

main();
