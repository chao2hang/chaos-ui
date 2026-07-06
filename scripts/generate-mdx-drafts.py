#!/usr/bin/env python3
"""
Generate draft MDX files for all components listed in components.meta.ts
that don't yet have an MDX file.

Usage: python3 generate-mdx-drafts.py [--batch N] [--total M]
  --batch N: only process batch N (1-indexed) out of --total batches
  --total M: split work into M batches (default: 4)
"""

import re, os, sys, argparse
from collections import defaultdict
from pathlib import Path

ROOT = Path("/home/chaos/projects/personal/chaos_style")
META_FILE = ROOT / "apps/docs/@/content/components.meta.ts"
CONTENT_DIR = ROOT / "apps/docs/@/content"
SOURCE_ROOT = ROOT / "packages/chaos-design-ui"


def parse_meta():
    """Parse components.meta.ts and return list of entry dicts."""
    content = META_FILE.read_text()
    entries = []
    blocks = re.split(r'\n  \},\n', content)
    for block in blocks:
        slug_m = re.search(r"slug:\s*['\"]" + "([^'\"]+)" + r"['\"]", block)
        name_m = re.search(r"name:\s*['\"]" + "([^'\"]+)" + r"['\"]", block)
        namezh_m = re.search(r"nameZh:\s*['\"]" + "([^'\"]*)" + r"['\"]", block)
        cat_m = re.search(r"category:\s*['\"]" + "([^'\"]+)" + r"['\"]", block)
        src_m = re.search(r"sourcePath:\s*['\"]" + "([^'\"]+)" + r"['\"]", block)
        sb_m = re.search(r"storybookId:\s*['\"]" + "([^'\"]*)" + r"['\"]", block)
        desc_m = re.search(r"desc:\s*['\"]" + "([^'\"]*)" + r"['\"]", block)
        descZh_m = re.search(r"descZh:\s*['\"]" + "([^'\"]*)" + r"['\"]", block)

        if slug_m and name_m and cat_m:
            entries.append({
                'slug': slug_m.group(1),
                'name': name_m.group(1),
                'nameZh': namezh_m.group(1) if namezh_m else '',
                'category': cat_m.group(1),
                'sourcePath': src_m.group(1) if src_m else '',
                'storybookId': sb_m.group(1) if sb_m else '',
                'desc': desc_m.group(1) if desc_m else '',
                'descZh': descZh_m.group(1) if descZh_m else '',
            })
    return entries


def existing_slugs():
    """Return set of slugs that already have MDX files."""
    existing = set()
    if CONTENT_DIR.exists():
        for f in CONTENT_DIR.rglob("*.mdx"):
            existing.add(f.stem)
    return existing


def derive_import_path(source_path: str) -> str:
    """Convert sourcePath to import path used in MDX."""
    # sourcePath like: "packages/chaos-design-ui/components/ui/button.tsx"
    # We need: "@/components/ui/button"
    # Or for business: "@/components/business/data-table"
    # Or for layout: "@/components/layout/app-shell"
    s = source_path
    if "/components/ui/" in s:
        return "@/" + s[s.index("components/ui/"):].replace(".tsx", "")
    if "/components/business/" in s:
        return "@/" + s[s.index("components/business/"):].replace(".tsx", "")
    if "/components/layout/" in s:
        return "@/" + s[s.index("components/layout/"):].replace(".tsx", "")
    # fallback: derive from slug
    return ""


def parse_source_exports(source_path: str) -> dict:
    """Parse component source file to extract export names, props interface, etc."""
    try:
        content = (SOURCE_ROOT / source_path.replace("packages/chaos-design-ui/", "")).read_text()
    except FileNotFoundError:
        return {}

    info = {
        'has_use_client': content.strip().startswith('"use client"'),
        'exports': [],
        'interfaces': [],
        'has_variants': False,
        'has_cva': False,
        'has_lucide': False,
        'has_on_event': False,
        'has_state': False,
        'imports_base_ui': False,
        'has_sub_components': False,
        'has_badge': False,
        'has_button': False,
    }

    # Check for key patterns
    if 'class-variance-authority' in content or 'cva(' in content:
        info['has_cva'] = True
        info['has_variants'] = True

    info['has_variants'] = info['has_variants'] or 'variants' in content.lower()

    if 'lucide-react' in content:
        info['has_lucide'] = True

    if '@base-ui' in content:
        info['imports_base_ui'] = True

    if 'useState' in content:
        info['has_state'] = True

    if 'onClick' in content or 'onChange' in content or 'onSubmit' in content:
        info['has_on_event'] = True

    if '@/components/ui/badge' in content:
        info['has_badge'] = True

    if '@/components/ui/button' in content:
        info['has_button'] = True

    # Extract export names
    export_patterns = [
        r'export function (\w+)',
        r'export\s+{\s*(\w+)',
    ]
    for p in export_patterns:
        for m in re.finditer(p, content):
            name = m.group(1)
            if name not in info['exports']:
                info['exports'].append(name)

    # Also find named exports after "export {"
    named_block = re.findall(r'export\s*\{([^}]+)\}', content)
    for block in named_block:
        names = re.findall(r'(\w+)', block)
        info['exports'].extend([n for n in names if n not in ('type', 'export') and n not in info['exports']])

    if len(info['exports']) > 1:
        info['has_sub_components'] = True

    # Extract interface names
    for m in re.finditer(r'interface (\w+)', content):
        info['interfaces'].append(m.group(1))
    for m in re.finditer(r'type (\w+)', content):
        info['interfaces'].append(m.group(1))

    return info


def generate_mdx(entry: dict, source_info: dict) -> str:
    """Generate MDX content for a component."""
    name = entry['name']
    nameZh = entry['nameZh'] or name
    slug = entry['slug']
    category = entry['category']
    import_path = derive_import_path(entry['sourcePath'])
    storybook_id = entry.get('storybookId', f'components-{slug}--docs')

    if not import_path:
        import_path = f"@/components/{'business' if category == 'Business' else 'ui' if category != 'System Layout' else 'layout'}/{slug}"

    # Determine the import statement
    exports = source_info.get('exports', [name])
    if not exports:
        exports = [name]

    primary_export = exports[0] if exports else name

    # Build import line
    if len(exports) == 1 or not source_info.get('has_sub_components'):
        import_line = f'import {{ {primary_export} }} from "{import_path}"'
    elif len(exports) <= 3:
        import_line = f'import {{ {", ".join(exports)} }} from "{import_path}"'
    else:
        main = [e for e in exports if e[0].isupper()]
        if len(main) <= 4:
            import_line = f'import {{ {", ".join(main)} }} from "{import_path}"'
        else:
            import_line = f'import {{ {primary_export} }} from "{import_path}"'

    # Build title
    if nameZh and nameZh != name:
        title_line = f"# {name} {nameZh}"
    else:
        title_line = f"# {name}"

    # Category-based descriptions
    cat_descs = {
        'General': ('通用组件', 'General-purpose component'),
        'Layout': ('布局组件', 'Layout component'),
        'Navigation': ('导航组件', 'Navigation component'),
        'Form': ('表单组件', 'Form component'),
        'DataDisplay': ('数据展示组件', 'Data display component'),
        'Feedback': ('反馈组件', 'Feedback component'),
        'Business': ('业务组件', 'Business component'),
        'System Layout': ('系统布局组件', 'System layout component'),
    }
    cat_desc_zh, cat_desc_en = cat_descs.get(category, ('组件', 'Component'))

    # Use meta descriptions if available
    desc = entry.get('desc', '')
    descZh = entry.get('descZh', '')
    if not desc:
        desc = f"{name} — a {cat_desc_en.lower()} from Chaos UI."
    if not descZh:
        descZh = f"{name} — Chaos UI 的{cat_desc_zh.lower()}。"

    # When to use
    when_zh = f"在需要使用{nameZh}的场景下使用该组件。"
    when_en = f"Use the {name} component in scenarios requiring {slug.replace('-', ' ')} functionality."

    # Basic example - build different examples based on source info
    has_cva = source_info.get('has_cva', False)
    has_state = source_info.get('has_state', False)
    has_lucide = source_info.get('has_lucide', False)
    has_sub = source_info.get('has_sub_components', False)
    has_badge = source_info.get('has_badge', False)
    has_button = source_info.get('has_button', False)
    has_on_event = source_info.get('has_on_event', False)

    # Build examples section
    examples = []

    # Basic usage
    if has_sub:
        # Multi-part component
        example_children = f'<{primary_export}>\n  {{/* {nameZh} 内容 */}}\n</{primary_export}>'
        examples.append(("基础用法 / Basic", example_children,
            f'import {{ {primary_export} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{primary_export}>\n      {{/* {nameZh} 内容 */}}\n    </{primary_export}>\n  )\n}}'))

    elif has_cva:
        # Has variants
        example_children = f'<{primary_export}>Default</{primary_export}>'
        examples.append(("基础用法 / Basic", example_children,
            f'import {{ {primary_export} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary_export}>Default</{primary_export}>\n}}'))

    elif has_lucide:
        example_children = f'<{primary_export}>▼</{primary_export}>'
        examples.append(("基础用法 / Basic", example_children,
            f'import {{ {primary_export} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary_export}>▼</{primary_export}>\n}}'))
    else:
        example_children = f'<{primary_export} />'
        examples.append(("基础用法 / Basic", example_children,
            f'import {{ {primary_export} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary_export} />\n}}'))

    # Variants example if CVA
    if has_cva:
        examples.append(("变体 / Variants",
            f'<div style={{{{ display: "flex", gap: 8, flexWrap: "wrap" }}}}>\n  <{primary_export} variant="default">Default</{primary_export}>\n  <{primary_export} variant="outline">Outline</{primary_export}>\n  <{primary_export} variant="ghost">Ghost</{primary_export}>\n</div>',
            f'<{primary_export} variant="default">Default</{primary_export}>\n<{primary_export} variant="outline">Outline</{primary_export}>\n<{primary_export} variant="ghost">Ghost</{primary_export}>'))

    # Disabled/state example if has state or is client
    if has_state or source_info.get('has_use_client', False):
        examples.append(("状态 / States",
            f'<div style={{{{ display: "flex", gap: 8, flexWrap: "wrap" }}}}>\n  <{primary_export}>Normal</{primary_export}>\n  <{primary_export} disabled>Disabled</{primary_export}>\n</div>',
            f'<{primary_export}>Normal</{primary_export}>\n<{primary_export} disabled>Disabled</{primary_export}>'))

    # Build examples MDX (code-only, no live component renders)
    # Live renders are omitted because required props vary per component;
    # human reviewers will add proper interactive examples later.
    examples_mdx = ""
    for ex_title, _ex_jsx, ex_code in examples:
        examples_mdx += f"""
### {ex_title}

<CodeBlock code={{`{ex_code}`}} lang="tsx" />
"""

    # Build API table
    api_rows = ""
    props_added = set()

    # Common props
    if has_cva:
        api_rows += "| variant | `'default' \\| 'outline' \\| 'ghost' \\| ...` | `'default'` | 变体风格 | Style variant |\n"
    api_rows += "| className | `string` | — | 自定义样式类名 | Custom CSS class |\n"
    if has_sub:
        api_rows += "| children | `React.ReactNode` | — | 子内容 | Children content |\n"
    if has_state:
        api_rows += "| disabled | `boolean` | `false` | 禁用状态 | Disabled state |\n"

    if not api_rows.strip():
        api_rows = "| className | `string` | — | 自定义样式类名 | Custom CSS class |\n| ...rest | `React.ComponentProps<'div'>` | — | 透传原生属性 | Passthrough native props |\n"

    # Notes
    notes_lines = []
    if source_info.get('has_use_client', False):
        notes_lines.append("- **Client Component**: 该组件使用 `\"use client\"` 指令，依赖 React 状态或事件处理，需在客户端渲染。")
    if has_cva:
        notes_lines.append("- **变体系统**: 通过 `class-variance-authority` 管理样式变体，确保类型安全且易于扩展。")
    if has_sub:
        notes_lines.append("- **组合模式**: 该组件由多个子组件组成，使用组合模式对外暴露，按需导入子组件。")
    notes_lines.append("- **无障碍**: 组件遵循 WAI-ARIA 最佳实践，提供适当的语义属性和键盘交互支持。")

    notes = "\n".join(notes_lines)

    # Build the full MDX
    # Avoid duplicate CodeBlock import for code-block's own doc page
    codeblock_import = "" if slug == "code-block" else '\nimport { CodeBlock } from "@/components/code-block"'

    mdx = f"""{import_line}{codeblock_import}

{title_line}

{descZh}
{desc}

## 何时使用 / When to use

{when_zh}

{when_en}

## 代码示例 / Examples
{examples_mdx}
## API

### {primary_export}

| Prop | Type | Default | Description (zh) | Description (en) |
|---|---|---|---|---|
{api_rows}
## 注意事项

{notes}

> 完整 Storybook autodocs: [Storybook 文档](?path=/docs/{storybook_id})
"""

    return mdx


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--batch', type=int, default=0, help='Batch number (1-indexed). 0 = all.')
    parser.add_argument('--total', type=int, default=4, help='Total number of batches (default 4)')
    args = parser.parse_args()

    entries = parse_meta()
    existing = existing_slugs()

    missing = [e for e in entries if e['slug'] not in existing]
    print(f"Total entries: {len(entries)}, Existing MDX: {len(existing)}, Missing: {len(missing)}")

    if args.batch > 0:
        # Split into batches
        batch_idx = args.batch - 1
        batch = [missing[i] for i in range(batch_idx, len(missing), args.total)]
        print(f"Processing batch {args.batch}/{args.total}: {len(batch)} components")
    else:
        batch = missing
        print(f"Processing all {len(batch)} components")

    generated = 0
    skipped = 0
    errors = []

    for entry in batch:
        slug = entry['slug']
        category = entry['category']

        # Determine target directory
        cat_dir_map = {
            'Business': 'Business',
            'DataDisplay': 'DataDisplay',
            'Feedback': 'Feedback',
            'Form': 'Form',
            'General': 'General',
            'Layout': 'Layout',
            'Navigation': 'Navigation',
            'System Layout': 'System Layout',
        }
        dir_name = cat_dir_map.get(category, category)
        out_dir = CONTENT_DIR / dir_name
        out_dir.mkdir(parents=True, exist_ok=True)

        out_path = out_dir / f"{slug}.mdx"
        if out_path.exists():
            skipped += 1
            continue

        # Parse source for richer content
        source_info = parse_source_exports(entry.get('sourcePath', ''))

        # Generate MDX
        mdx_content = generate_mdx(entry, source_info)
        out_path.write_text(mdx_content)
        generated += 1

        if generated % 20 == 0:
            print(f"  ... generated {generated} / {len(batch)}")

    print(f"\nDone! Generated: {generated}, Skipped (already exist): {skipped}, Errors: {len(errors)}")

    if errors:
        for e in errors[:10]:
            print(f"  ERROR: {e}")


if __name__ == '__main__':
    main()
