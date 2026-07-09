/**
 * Component Audit Script
 *
 * Scans all registered components in components.meta.ts and checks:
 * 1. Source file existence and Props interface extraction
 * 2. MDX documentation quality (template vs real, code examples, API tables)
 * 3. Preview coverage (hand-authored, story, auto-loader)
 * 4. i18n consistency (.en.mdx vs .zh.mdx structure)
 *
 * Output: docs/audit/component-audit-report.json + docs/audit/component-audit-summary.md
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DOCS_CONTENT = join(ROOT, "apps/docs/@/content");
const META_FILE = join(DOCS_CONTENT, "components.meta.ts");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readText(p) {
  try {
    return readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

// Extract all component entries from components.meta.ts
function parseMeta() {
  const text = readText(META_FILE);
  if (!text) throw new Error(`Cannot read ${META_FILE}`);

  const components = [];
  // Match each { slug, name, ... } block
  const blockRegex = /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*nameZh:\s*"([^"]*)",\s*category:\s*"([^"]+)",[\s\S]*?sourcePath:\s*"([^"]+)"[\s\S]*?\}/g;
  let match;
  while ((match = blockRegex.exec(text)) !== null) {
    const [, slug, name, nameZh, category, sourcePath] = match;
    // Extract desc and descZh
    const descMatch = text.slice(match.index, match.index + match[0].length + 500).match(/desc:\s*"([\s\S]*?)",\s*descZh:/);
    const descZhMatch = text.slice(match.index, match.index + match[0].length + 500).match(/descZh:\s*([\s\S]*?)(?:,\s*(?:storybookId|isNew|\}))/);
    const desc = descMatch ? descMatch[1].trim() : "";
    const descZh = descZhMatch ? descZhMatch[1].replace(/^["']|["']$/g, "").trim() : "";
    components.push({ slug, name, nameZh, category, sourcePath, desc, descZh });
  }
  return components;
}

// Template description patterns
const TEMPLATE_PATTERNS_EN = [
  /a general-purpose primitives? used across the app/i,
  /—?\s*a general-purpose/i,
];

const TEMPLATE_PATTERNS_ZH = [
  /Chaos UI 的通用基础组件/,
  /面向 ERP\/企业场景的业务组件/,
  /通用基础组件/,
];

function isTemplateDesc(desc, isZh = false) {
  if (!desc || desc.length < 10) return true;
  const patterns = isZh ? TEMPLATE_PATTERNS_ZH : TEMPLATE_PATTERNS_EN;
  return patterns.some((p) => p.test(desc));
}

// Check if MDX has real code example (not just <Component />)
function hasRealCodeExample(mdxContent, componentName) {
  if (!mdxContent) return false;
  // Check for CodeBlock with more than just <Component />
  const codeBlocks = mdxContent.match(/<CodeBlock[^>]*code=\{`([\s\S]*?)`}/g) || [];
  for (const block of codeBlocks) {
    const code = block.match(/code=\{`([\s\S]*?)`}/)?.[1] || "";
    // If code has props beyond just <Component />, it's a real example
    if (code.includes(`${componentName} `) || code.includes(`${componentName}\n`)) {
      if (code.match(/\w+=/)) return true; // has at least one prop
    }
    // If code has children content
    if (code.includes(`${componentName}>`) && code.includes(`</${componentName}>`)) {
      const inner = code.split(`${componentName}>`)[1]?.split(`</${componentName}>`)[0];
      if (inner && inner.trim().length > 0) return true;
    }
  }
  return false;
}

// Check if MDX has API/Props table with real props
function hasRealPropsTable(mdxContent, componentName) {
  if (!mdxContent) return false;
  // Look for table rows with prop names other than className and ...rest
  const tableRows = mdxContent.match(/\|\s*`(\w+)`\s*\|/g) || [];
  const realProps = tableRows.filter((row) => {
    const prop = row.match(/`(\w+)`/)?.[1];
    return prop && prop !== "className" && prop !== "rest" && !prop.startsWith("...");
  });
  return realProps.length > 0;
}

// Check MDX section completeness
function checkMdxSections(mdxContent) {
  if (!mdxContent) return { hasTitle: false, hasDesc: false, hasWhenToUse: false, hasCodeExample: false, hasApi: false, hasNotes: false };
  return {
    hasTitle: /^#\s/.test(mdxContent),
    hasDesc: /^>\s/m.test(mdxContent) || /## .*/m.test(mdxContent),
    hasWhenToUse: /## 何时使用|## When to Use/i.test(mdxContent),
    hasCodeExample: /## 代码示例|## Code Example|<CodeBlock/i.test(mdxContent),
    hasApi: /## API|## Props/i.test(mdxContent),
    hasNotes: /## 注意事项|## Notes/i.test(mdxContent),
  };
}

// Parse source file for Props interface
function extractPropsFromSource(sourcePath) {
  const fullPath = join(ROOT, sourcePath.replace(/^packages\/chaos-design-ui\//, "packages/chaos-design-ui/"));
  const text = readText(fullPath);
  if (!text) return { exists: false, props: [], isClient: false };

  const isClient = text.includes('"use client"') || text.includes("'use client'");

  // Extract interface XXXProps { ... }
  const props = [];
  const interfaceRegex = /(?:export\s+)?interface\s+(\w*Props)\s*(?:extends\s+[\s\S]*?)?\s*\{([\s\S]*?)\}/g;
  let match;
  while ((match = interfaceRegex.exec(text)) !== null) {
    const body = match[2];
    // Extract prop names and types
    const propRegex = /^\s*(?:\/\*\*[\s\S]*?\*\/\s*)?(\w+)(\?)?:\s*([^;\n]+)/gm;
    let propMatch;
    while ((propMatch = propRegex.exec(body)) !== null) {
      const [, propName, optional, propType] = propMatch;
      if (propName && !propName.startsWith("//")) {
        props.push({
          name: propName,
          type: propType.trim(),
          optional: !!optional,
        });
      }
    }
  }

  return { exists: true, props, isClient };
}

// Check preview coverage
function checkPreviewCoverage(name) {
  const previewsText = readText(join(ROOT, "apps/docs/@/components/component-previews.tsx")) || "";
  const storyText = readText(join(ROOT, "apps/docs/@/components/component-story-previews.tsx")) || "";
  const loaderText = readText(join(ROOT, "apps/docs/@/components/component-loader.ts")) || "";

  return {
    hasHandAuthored: new RegExp(`\\b${name}:`).test(previewsText),
    hasStoryPreview: new RegExp(`\\b${name}:`).test(storyText),
    hasAutoLoader: new RegExp(`\\b${name}:`).test(loaderText),
  };
}

// Get MDX file path for a component
function getMdxPath(slug, category) {
  const categoryDir = category.replace(/\s+/g, "");
  return {
    zh: join(DOCS_CONTENT, category, `${slug}.zh.mdx`),
    en: join(DOCS_CONTENT, category, `${slug}.en.mdx`),
    base: join(DOCS_CONTENT, category, `${slug}.mdx`),
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("🔍 Starting component audit...\n");

  const components = parseMeta();
  console.log(`Found ${components.length} registered components.\n`);

  const report = [];
  const stats = {
    total: components.length,
    byCategory: {},
    templateDesc: 0,
    noRealCodeExample: 0,
    noRealPropsTable: 0,
    noPreview: 0,
    sourceMissing: 0,
    mdxMissing: 0,
    i18nMismatch: 0,
    grades: { A: 0, B: 0, C: 0, D: 0 },
  };

  for (const comp of components) {
    const mdxPaths = getMdxPath(comp.slug, comp.category);

    // Read MDX files
    const zhMdx = readText(mdxPaths.zh) || readText(mdxPaths.base);
    const enMdx = readText(mdxPaths.en) || readText(mdxPaths.base);

    // Check source
    const sourceInfo = extractPropsFromSource(comp.sourcePath);

    // Check preview coverage
    const preview = checkPreviewCoverage(comp.name);

    // Check MDX quality
    const isTemplateZh = isTemplateDesc(comp.descZh, true);
    const isTemplateEn = isTemplateDesc(comp.desc, false);
    const hasRealCode = hasRealCodeExample(zhMdx, comp.name);
    const hasRealProps = hasRealPropsTable(zhMdx, comp.name);
    const zhSections = checkMdxSections(zhMdx);
    const enSections = checkMdxSections(enMdx);

    // i18n consistency
    const i18nConsistent = zhSections.hasTitle === enSections.hasTitle &&
      zhSections.hasWhenToUse === enSections.hasWhenToUse &&
      zhSections.hasCodeExample === enSections.hasCodeExample;

    // Calculate scores
    // Dim 1: Functionality (25)
    let funcScore = 0;
    if (sourceInfo.exists) funcScore += 8;
    if (sourceInfo.props.length > 0) funcScore += 8;
    if (preview.hasHandAuthored || preview.hasStoryPreview) funcScore += 6;
    else if (preview.hasAutoLoader) funcScore += 3;
    if (sourceInfo.isClient) funcScore += 3;

    // Dim 2: Style (20) - partial: check for dark mode classes in source
    let styleScore = 10; // baseline — needs manual verification
    if (sourceInfo.exists) {
      const srcText = readText(join(ROOT, comp.sourcePath.replace(/^packages\/chaos-design-ui\//, "packages/chaos-design-ui/")));
      if (srcText) {
        if (/dark:|bg-card|border-border|text-foreground|bg-background/.test(srcText)) styleScore += 5;
        if (/sm:|md:|lg:|xl:/.test(srcText)) styleScore += 3;
        if (/rtl:|dir=|logical|inline-start|inline-end/.test(srcText)) styleScore += 2;
      }
    }

    // Dim 3: Interaction (25) - needs manual verification, baseline
    let interactionScore = 15; // baseline
    if (sourceInfo.exists) {
      const srcText = readText(join(ROOT, comp.sourcePath.replace(/^packages\/chaos-design-ui\//, "packages/chaos-design-ui/")));
      if (srcText) {
        if (/role=|aria-|aria-label|aria-expanded/.test(srcText)) interactionScore += 5;
        if (/onKeyDown|onKeyUp|onKeyPress|useKeyboard|focus/.test(srcText)) interactionScore += 3;
        if (/debounce|throttle|setTimeout/.test(srcText)) interactionScore += 2;
      }
    }

    // Dim 4: Documentation (15)
    let docScore = 0;
    if (!isTemplateZh) docScore += 3;
    if (!isTemplateEn) docScore += 1;
    if (zhSections.hasWhenToUse) docScore += 3;
    if (zhSections.hasApi) docScore += 2;
    if (hasRealProps) docScore += 3;
    if (zhSections.hasNotes) docScore += 2;
    if (zhMdx && enMdx && i18nConsistent) docScore += 1;

    // Dim 5: Code examples (15)
    let codeScore = 0;
    if (zhSections.hasCodeExample) codeScore += 4;
    if (hasRealCode) codeScore += 5;
    if (zhMdx && (zhMdx.match(/###\s/g) || []).length >= 2) codeScore += 3; // multiple examples
    if (zhMdx && /lang=["']tsx["']/.test(zhMdx)) codeScore += 3;

    const totalScore = funcScore + styleScore + interactionScore + docScore + codeScore;
    const grade = totalScore >= 85 ? "A" : totalScore >= 70 ? "B" : totalScore >= 50 ? "C" : "D";

    // Track issues
    const issues = [];
    if (isTemplateZh) issues.push("template_desc_zh");
    if (isTemplateEn) issues.push("template_desc_en");
    if (!hasRealCode) issues.push("no_real_code_example");
    if (!hasRealProps) issues.push("no_real_props_table");
    if (!sourceInfo.exists) issues.push("source_missing");
    if (!zhMdx) issues.push("zh_mdx_missing");
    if (!enMdx) issues.push("en_mdx_missing");
    if (!preview.hasHandAuthored && !preview.hasStoryPreview && !preview.hasAutoLoader) issues.push("no_preview");
    if (!i18nConsistent) issues.push("i18n_mismatch");

    const entry = {
      slug: comp.slug,
      name: comp.name,
      nameZh: comp.nameZh,
      category: comp.category,
      scores: {
        functionality: funcScore,
        style: styleScore,
        interaction: interactionScore,
        documentation: docScore,
        codeExample: codeScore,
        total: totalScore,
      },
      grade,
      issues,
      preview: {
        handAuthored: preview.hasHandAuthored,
        story: preview.hasStoryPreview,
        autoLoader: preview.hasAutoLoader,
      },
      source: {
        exists: sourceInfo.exists,
        propsCount: sourceInfo.props.length,
        isClient: sourceInfo.isClient,
      },
      mdx: {
        zhExists: !!zhMdx,
        enExists: !!enMdx,
        sections: zhSections,
        hasRealCode,
        hasRealProps,
        i18nConsistent,
      },
    };

    report.push(entry);

    // Update stats
    if (!stats.byCategory[comp.category]) stats.byCategory[comp.category] = { total: 0, grades: { A: 0, B: 0, C: 0, D: 0 } };
    stats.byCategory[comp.category].total++;
    stats.byCategory[comp.category].grades[grade]++;
    stats.grades[grade]++;
    if (isTemplateZh || isTemplateEn) stats.templateDesc++;
    if (!hasRealCode) stats.noRealCodeExample++;
    if (!hasRealProps) stats.noRealPropsTable++;
    if (!preview.hasHandAuthored && !preview.hasStoryPreview && !preview.hasAutoLoader) stats.noPreview++;
    if (!sourceInfo.exists) stats.sourceMissing++;
    if (!zhMdx || !enMdx) stats.mdxMissing++;
    if (!i18nConsistent) stats.i18nMismatch++;
  }

  // Sort by total score ascending (worst first)
  report.sort((a, b) => a.scores.total - b.scores.total);

  // Write JSON report
  const auditDir = join(ROOT, "docs/audit");
  mkdirSync(auditDir, { recursive: true });
  writeFileSync(join(auditDir, "component-audit-report.json"), JSON.stringify({ stats, components: report }, null, 2));

  // Write Markdown summary
  const md = generateSummaryMd(stats, report);
  writeFileSync(join(auditDir, "component-audit-summary.md"), md);

  console.log(`✅ Audit complete. ${report.length} components scanned.`);
  console.log(`📊 Grades: A=${stats.grades.A}  B=${stats.grades.B}  C=${stats.grades.C}  D=${stats.grades.D}`);
  console.log(`📝 Reports:`);
  console.log(`   - docs/audit/component-audit-report.json`);
  console.log(`   - docs/audit/component-audit-summary.md`);
}

function generateSummaryMd(stats, report) {
  const lines = [];
  lines.push("# Component Audit Summary");
  lines.push("");
  lines.push(`> Auto-generated by \`scripts/component-audit.mjs\` on ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");

  // Overview
  lines.push("## Overview");
  lines.push("");
  lines.push("| Metric | Count | Percentage |");
  lines.push("|--------|-------|-----------|");
  lines.push(`| Total components | ${stats.total} | 100% |`);
  lines.push(`| Grade A (85-100) | ${stats.grades.A} | ${(stats.grades.A / stats.total * 100).toFixed(1)}% |`);
  lines.push(`| Grade B (70-84) | ${stats.grades.B} | ${(stats.grades.B / stats.total * 100).toFixed(1)}% |`);
  lines.push(`| Grade C (50-69) | ${stats.grades.C} | ${(stats.grades.C / stats.total * 100).toFixed(1)}% |`);
  lines.push(`| Grade D (<50) | ${stats.grades.D} | ${(stats.grades.D / stats.total * 100).toFixed(1)}% |`);
  lines.push("");

  // Issues
  lines.push("## Issue Summary");
  lines.push("");
  lines.push("| Issue | Count |");
  lines.push("|-------|-------|");
  lines.push(`| Template descriptions | ${stats.templateDesc} |`);
  lines.push(`| No real code example | ${stats.noRealCodeExample} |`);
  lines.push(`| No real props table | ${stats.noRealPropsTable} |`);
  lines.push(`| No preview at all | ${stats.noPreview} |`);
  lines.push(`| Source file missing | ${stats.sourceMissing} |`);
  lines.push(`| MDX file missing | ${stats.mdxMissing} |`);
  lines.push(`| i18n mismatch | ${stats.i18nMismatch} |`);
  lines.push("");

  // By category
  lines.push("## By Category");
  lines.push("");
  lines.push("| Category | Total | A | B | C | D |");
  lines.push("|----------|-------|---|---|---|---|");
  for (const [cat, data] of Object.entries(stats.byCategory)) {
    lines.push(`| ${cat} | ${data.total} | ${data.grades.A} | ${data.grades.B} | ${data.grades.C} | ${data.grades.D} |`);
  }
  lines.push("");

  // Top 50 worst components
  lines.push("## Top 50 Components Needing Attention (Lowest Score)");
  lines.push("");
  lines.push("| Rank | Component | Category | Grade | Score | Key Issues |");
  lines.push("|------|-----------|----------|-------|-------|------------|");
  for (let i = 0; i < Math.min(50, report.length); i++) {
    const c = report[i];
    lines.push(`| ${i + 1} | ${c.name} | ${c.category} | ${c.grade} | ${c.scores.total} | ${c.issues.join(", ") || "—"} |`);
  }
  lines.push("");

  // All D-grade components
  const dGrade = report.filter((c) => c.grade === "D");
  if (dGrade.length > 0) {
    lines.push("## All D-Grade Components (Critical)");
    lines.push("");
    lines.push("| Component | Category | Score | Issues |");
    lines.push("|-----------|----------|-------|--------|");
    for (const c of dGrade) {
      lines.push(`| ${c.name} | ${c.category} | ${c.scores.total} | ${c.issues.join(", ")} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

main();
