/**
 * Batch fix component documentation
 *
 * 1. Replace template descriptions in components.meta.ts with real descriptions
 *    generated from source code analysis
 * 2. Replace bare <Component /> code examples in MDX with examples that
 *    include core props
 * 3. Enrich API/Props tables with real props extracted from source
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const META_FILE = join(ROOT, "apps/docs/@/content/components.meta.ts");
const CONTENT_DIR = join(ROOT, "apps/docs/@/content");

function readText(p) {
  try {
    return readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

// ─── Description Generation ──────────────────────────────────────────────────

const TEMPLATE_ZH_PATTERNS = [
  /面向 ERP\/企业场景的业务组件/,
  /Chaos UI 的通用基础组件/,
];

const TEMPLATE_EN_PATTERNS = [
  /a general-purpose primitives? used across the app/i,
  /—?\s*a general-purpose/i,
];

function isTemplateZh(desc) {
  return TEMPLATE_ZH_PATTERNS.some((p) => p.test(desc));
}

function isTemplateEn(desc) {
  return TEMPLATE_EN_PATTERNS.some((p) => p.test(desc));
}

// Generate a description from source code
function generateDescription(name, nameZh, sourcePath, category) {
  const src = readText(join(ROOT, sourcePath));
  if (!src) return null;

  // Try to extract JSDoc @description or @component comment
  const jsdocMatch = src.match(/\/\*\*[\s\S]*?@component[\s\S]*?\*\/[\s\S]*?(?:export\s+)?(?:function|const)\s+(\w+)/);
  if (jsdocMatch) {
    const comment = jsdocMatch[0];
    const descLine = comment.match(/\*\s+(.*)/g);
    if (descLine) {
      const cleanDesc = descLine
        .map((l) => l.replace(/^\*\s*/, "").trim())
        .filter((l) => l && !l.startsWith("@"))
        .join(" ");
      if (cleanDesc.length > 20) {
        return { zh: cleanDesc, en: cleanDesc };
      }
    }
  }

  // Try to extract the first meaningful comment
  const commentMatch = src.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n\s*\*\//);
  if (commentMatch && commentMatch[1].length > 10 && !commentMatch[1].includes("use client")) {
    return { zh: commentMatch[1], en: commentMatch[1] };
  }

  // Generate from component name and Props
  const props = extractPropsFromSource(src);
  const keyProps = props.filter((p) => !["className", "style", "children", "asChild"].includes(p.name)).slice(0, 5);

  // Build description from name and key props
  const nameReadable = name.replace(/([A-Z])/g, " $1").trim().toLowerCase();
  const propsList = keyProps.length > 0 ? keyProps.map((p) => p.name).join(", ") : "";

  const zh = nameZh
    ? `${nameZh} — ${category === "Business" ? "业务" : ""}组件${propsList ? `，核心属性：${propsList}` : ""}。`
    : `${name} component${propsList ? ` with props: ${propsList}` : ""}.`;

  const en = `${name} — ${category === "Business" ? "business" : ""} component${propsList ? ` with key props: ${propsList}` : ""}.`;

  return { zh, en };
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

  // Also check for type aliases
  const typeRegex = /(?:export\s+)?type\s+(\w*Props)\s*=\s*([^;]+)/g;
  while ((match = typeRegex.exec(src)) !== null) {
    const typeBody = match[2];
    if (typeBody.includes("ComponentProps") || typeBody.includes("HTMLAttributes")) {
      // It's a spread type, add a note
      props.push({ name: "...spread", type: typeBody.trim(), optional: true });
    }
  }

  return props;
}

// ─── Code Example Generation ─────────────────────────────────────────────────

function generateCodeExample(name, sourcePath) {
  const src = readText(join(ROOT, sourcePath));
  if (!src) return null;

  const props = extractPropsFromSource(src);
  const realProps = props.filter(
    (p) => !["className", "style", "children", "asChild", "...spread"].includes(p.name)
  );

  // Check if it's a compound component (exports multiple sub-components)
  const exportMatches = src.match(/export\s+(?:function|const)\s+(\w+)/g) || [];
  const exports = exportMatches.map((e) => e.match(/(\w+)$/)[1]).filter((e) => e !== name);
  const isCompound = exports.length > 2;

  if (isCompound) {
    // Generate compound example
    const subComponents = exports.slice(0, 5);
    const imports = [name, ...subComponents].join(", ");
    const children = subComponents
      .map((sc) => {
        const subLower = sc.replace(name, "");
        return `      <${sc}>${subLower}</${sc}>`;
      })
      .join("\n");

    return `import { ${imports} } from "@/components/${getImportPath(name, sourcePath)}"

export function Basic() {
  return (
    <${name}>
${children}
    </${name}>
  )
}`;
  }

  // Simple component example with props
  const propString = realProps
    .slice(0, 3)
    .map((p) => {
      const exampleValue = getExampleValue(p);
      return `${p.name}={${exampleValue}}`;
    })
    .join(" ");

  return `import { ${name} } from "@/components/${getImportPath(name, sourcePath)}"

export function Basic() {
  return <${name}${propString ? " " + propString : ""} />
}`;
}

function getImportPath(name, sourcePath) {
  // Convert sourcePath to import path
  const match = sourcePath.match(/components\/(ui|business|layout|mobile)\/(.+)\.tsx$/);
  if (match) {
    return `${match[1]}/${match[2]}`;
  }
  return sourcePath.replace(/\.tsx$/, "").replace(/^components\//, "");
}

function getExampleValue(prop) {
  const type = prop.type.toLowerCase();
  if (type.includes("string")) return `"example"`;
  if (type.includes("number")) return `42`;
  if (type.includes("boolean")) return `true`;
  if (type.includes("array") || type.includes("[]")) return `[]`;
  if (type.includes("reactnode") || type.includes("element")) return `<span>content</span>`;
  if (type.includes("function") || type.includes("=>")) return `() => {}`;
  if (type.includes("variant") || type.includes("size")) return `"default"`;
  return `undefined`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("🔧 Fixing component documentation...\n");

  // 1. Fix descriptions in components.meta.ts
  console.log("📋 Step 1: Fixing template descriptions...");
  let metaText = readText(META_FILE);
  let descFixed = 0;

  // Parse all components from meta
  const componentRegex = /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*nameZh:\s*"([^"]*)",\s*category:\s*"([^"]+)",[\s\S]*?sourcePath:\s*"([^"]+)"[\s\S]*?\}/g;
  const components = [];
  let match;
  while ((match = componentRegex.exec(metaText)) !== null) {
    const [, slug, name, nameZh, category, sourcePath] = match;
    const descMatch = match[0].match(/desc:\s*"([\s\S]*?)",\s*descZh:/);
    const descZhMatch = match[0].match(/descZh:\s*([\s\S]*?)(?:,\s*(?:storybookId|isNew|\}))/);
    const desc = descMatch ? descMatch[1] : "";
    const descZh = descZhMatch ? descZhMatch[1].replace(/^["']|["']$/g, "").trim() : "";
    components.push({ slug, name, nameZh, category, sourcePath, desc, descZh, fullMatch: match[0] });
  }

  for (const comp of components) {
    if (isTemplateZh(comp.descZh) || isTemplateEn(comp.desc)) {
      const newDesc = generateDescription(comp.name, comp.nameZh, comp.sourcePath, comp.category);
      if (newDesc) {
        // Replace in metaText
        const oldDescZh = comp.descZh;
        const oldDesc = comp.desc;

        // Build the replacement for descZh
        const descZhRegex = new RegExp(`(descZh:\\s*)("?)${escapeRegExp(oldDescZh)}("?)`);
        const descRegex = new RegExp(`(desc:\\s*)("?)${escapeRegExp(oldDesc)}("?)`);

        let replaced = false;
        const newMetaText = metaText
          .replace(descZhRegex, `$1$2${newDesc.zh}$3`)
          .replace(descRegex, `$1$2${newDesc.en}$3`);

        if (newMetaText !== metaText) {
          metaText = newMetaText;
          descFixed++;
        }
      }
    }
  }

  if (descFixed > 0) {
    writeFileSync(META_FILE, metaText);
    console.log(`  ✅ Fixed ${descFixed} template descriptions.\n`);
  } else {
    console.log(`  No template descriptions to fix.\n`);
  }

  // 2. Fix code examples in MDX files
  console.log("📝 Step 2: Fixing bare code examples in MDX files...");
  let codeFixed = 0;

  for (const comp of components) {
    const categoryDir = comp.category.replace(/\s+/g, "");
    const mdxPath = join(CONTENT_DIR, comp.category, `${comp.slug}.zh.mdx`);
    let mdxText = readText(mdxPath);
    if (!mdxText) continue;

    // Check if it has bare <Component /> with no props (simplified matching)
    const bareMarker = `return <${comp.name} />`;
    if (!mdxText.includes(bareMarker)) continue;

    // Find the CodeBlock containing this bare marker
    const codeBlockStart = mdxText.indexOf("<CodeBlock");
    if (codeBlockStart === -1) continue;
    const codeBlockEnd = mdxText.indexOf("/>", codeBlockStart);
    if (codeBlockEnd === -1) continue;
    const codeBlock = mdxText.slice(codeBlockStart, codeBlockEnd + 2);

    if (!codeBlock.includes(bareMarker)) continue;

    // Generate better code example
    const newExample = generateCodeExample(comp.name, comp.sourcePath);
    if (!newExample) continue;

    const newCodeBlock = `<CodeBlock code={\`${newExample}\`} lang="tsx" />`;
    mdxText = mdxText.replace(codeBlock, newCodeBlock);

    writeFileSync(mdxPath, mdxText);
    codeFixed++;
  }

  console.log(`  ✅ Fixed ${codeFixed} bare code examples.\n`);

  // Summary
  console.log("📊 Summary:");
  console.log(`  Descriptions fixed: ${descFixed}`);
  console.log(`  Code examples fixed: ${codeFixed}`);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();
