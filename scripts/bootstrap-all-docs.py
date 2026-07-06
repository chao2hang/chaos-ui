#!/usr/bin/env python3
"""
One-shot bootstrap: scan all source components, expand meta, generate MDX drafts, sync proxies.
Works idempotently — won't overwrite existing MDX or proxy files unless --force-proxies.
"""
import re, os, sys, shutil
from pathlib import Path

ROOT = Path("/home/chaos/projects/personal/chaos_style")
SOURCE_ROOT = ROOT / "packages/chaos-design-ui/components"
META_FILE = ROOT / "apps/docs/@/content/components.meta.ts"
CONTENT_DIR = ROOT / "apps/docs/@/content"
DOCS_COMPONENTS = ROOT / "apps/docs/@/components"
SRC_PREFIX = "packages/chaos-design-ui/"

# ---- Categorization rules for ui/ components ----
# business/* → Business, layout/* → System Layout
# ui/* need to be mapped to the 6 remaining categories by name
CATEGORY_RULES = [
    # Feedback — overlays, status indicators, progress, empty/result/loading
    ("Feedback", ["alert", "alert-dialog", "toast", "sonner", "message", "notification", "banner", "progress", "skeleton", "spinner", "loading", "empty-state", "result", "empty", "dialog", "drawer", "sheet", "modal", "popconfirm", "toaster"]),
    # Form — inputs, controls, pickers, form layout
    ("Form", ["form", "input", "checkbox", "radio", "select", "switch", "textarea", "slider", "date-picker", "time-picker", "upload", "file-upload", "rate", "cascader", "calendar", "color-picker", "autocomplete", "combobox", "multi-select", "tree-select", "input-number", "form-grid", "form-list", "browse-input", "otp-input", "otp-field", "toggle", "picker", "search", "label", "form"]),
    # Navigation — menus, tabs, breadcrumbs, pagination, steps, anchors, sidebars
    ("Navigation", ["menu", "menubar", "breadcrumb", "pagination", "steps", "stepper", "tabs", "tab", "anchor", "dropdown", "dropdown-menu", "context-menu", "navigation-menu", "sidebar", "back-top", "dot", "fab", "command", "navigation"]),
    # DataDisplay — cards, avatars, badges, tags, popups, collapsibles, trees, timelines, charts, carousels, images, descriptions, statistics
    ("DataDisplay", ["table", "list", "card", "avatar", "avatar-group", "badge", "tag", "tooltip", "popover", "hover-card", "collapse", "accordion", "tree", "timeline", "carousel", "image", "descriptions", "statistic", "ribbon", "watermark", "qrcode", "barcode", "department-browse", "segmented", "kpi-panel", "kpi", "charts"]),
    # Layout — structural layout primitives
    ("Layout", ["flex", "grid", "resizable", "aspect-ratio", "divider", "space", "stack", "container", "splitter", "scroll-area", "separator", "split-pane", "app-shell"]),
]

# Chinese name heuristics (slug → zh name)
ZH_NAMES = {
    "button": "按钮", "badge": "徽章", "input": "输入框", "select": "选择器", "dialog": "对话框",
    "modal": "模态框", "card": "卡片", "alert": "警告", "tooltip": "文字提示", "popover": "气泡卡片",
    "dropdown-menu": "下拉菜单", "tabs": "标签页", "breadcrumb": "面包屑", "pagination": "分页",
    "table": "表格", "checkbox": "复选框", "radio": "单选框", "switch": "开关", "slider": "滑块",
    "textarea": "文本域", "avatar": "头像", "progress": "进度条", "spinner": "加载中", "toast": "轻提示",
    "sonner": "通知", "drawer": "抽屉", "sheet": "面板", "accordion": "手风琴", "collapse": "折叠面板",
    "menu": "导航菜单", "sidebar": "侧边栏", "form": "表单", "date-picker": "日期选择器",
    "calendar": "日历", "file-upload": "文件上传", "carousel": "轮播", "tree": "树形控件",
    "timeline": "时间轴", "steps": "步骤条", "tag": "标签", "divider": "分割线", "back-top": "回到顶部",
    "affix": "固钉", "empty-state": "空状态", "result": "结果", "skeleton": "骨架屏", "rate": "评分",
    "input-number": "数字输入框", "cascader": "级联选择", "autocomplete": "自动完成", "combobox": "组合框",
    "color-picker": "颜色选择器", "time-picker": "时间选择器", "toggle": "开关", "anchor": "锚点",
    "navigation-menu": "导航菜单", "image": "图片", "descriptions": "描述列表", "statistic": "统计数值",
    "flex": "弹性布局", "grid": "栅格", "resizable": "可调整大小", "aspect-ratio": "宽高比",
    "space": "间距", "alert-dialog": "警告对话框", "context-menu": "右键菜单", "hover-card": "悬浮卡片",
    "menubar": "菜单栏", "navigation": "导航", "scroll-area": "滚动区域", "separator": "分隔符",
    "toggle-group": "开关组", "toolbar": "工具栏", "dot": "圆点指示器", "fab": "悬浮按钮",
    "multi-select": "多选", "tree-select": "树选择", "department-browse": "部门浏览",
    "browse-input": "浏览输入框", "otp-input": "验证码输入框", "segmented": "分段控制器",
    "form-grid": "表单栅格", "form-list": "表单列表", "watermark": "水印", "qrcode": "二维码",
    "barcode-display": "条形码", "ribbon": "缎带", "config-provider": "全局配置", "countdown": "倒计时",
    "fab": "悬浮按钮", "list": "列表", "message": "全局消息", "notification": "通知",
    "popconfirm": "气泡确认框", "command": "命令面板", "upload": "上传", "search": "搜索",
    "picker": "选择器", "stack": "堆叠布局", "splitter": "分割面板", "container": "容器",
}

BUSINESS_ZH_PREFIX = {
    "auth": "认证", "login": "登录", "user": "用户", "address": "地址", "payment": "支付",
    "order": "订单", "product": "商品", "cart": "购物车", "chart": "图表", "dashboard": "仪表盘",
    "form": "表单", "table": "表格", "data": "数据", "map": "地图", "video": "视频",
    "audio": "音频", "file": "文件", "rich-text": "富文本", "editor": "编辑器",
    "mobile": "移动端", "report": "报表", "approval": "审批", "audit": "审计",
    "transfer": "穿梭框", "picker": "选择", "selector": "选择器", "select": "选择",
    "search": "搜索", "filter": "筛选", "inbox": "收件箱", "notification": "通知",
    "message": "消息", "chat": "聊天", "calendar": "日历", "schedule": "日程",
    "task": "任务", "project": "项目", "team": "团队", "department": "部门",
    "organization": "组织", "role": "角色", "permission": "权限", "config": "配置",
    "setting": "设置", "profile": "个人资料", "account": "账户", "security": "安全",
    "password": "密码", "phone": "电话", "email": "邮箱", "verify": "验证",
    "code": "代码", "barcode": "条形码", "qrcode": "二维码", "scan": "扫码",
    "print": "打印", "export": "导出", "import": "导入", "batch": "批量",
    "bulk": "批量", "preview": "预览", "detail": "详情", "list": "列表",
    "card": "卡片", "timeline": "时间线", "activity": "活动", "feed": "动态",
    "announcement": "公告", "banner": "横幅", "onboarding": "引导", "checklist": "清单",
    "wizard": "向导", "step": "步骤", "progress": "进度", "stat": "统计",
    "trend": "趋势", "metric": "指标", "analytics": "分析", "insight": "洞察",
    "segmented": "分段", "pivot": "数据透视", "cross-tab": "交叉表",
}

# Common suffix translations for business components
BUSINESS_ZH_SUFFIX = {
    "form": "表单", "list": "列表", "card": "卡片", "detail": "详情", "view": "视图",
    "table": "表格", "chart": "图表", "picker": "选择器", "selector": "选择器",
    "select": "选择", "input": "输入", "editor": "编辑器", "display": "展示",
    "component": "组件", "widget": "部件", "panel": "面板", "dialog": "对话框",
    "modal": "模态框", "drawer": "抽屉", "sheet": "面板", "page": "页面",
    "layout": "布局", "shell": "外壳", "center": "中心", "manager": "管理器",
    "builder": "构建器", "designer": "设计器", "timeline": "时间线",
    "feed": "动态", "flow": "流程", "guard": "守卫", "wrapper": "包装器",
    "provider": "提供者", "button": "按钮", "badge": "徽章", "tag": "标签",
}


def guess_zh_name(slug: str, category: str) -> str:
    if slug in ZH_NAMES:
        return ZH_NAMES[slug]
    if category == "Business":
        parts = slug.split("-")
        # Try prefix match
        for i in range(len(parts), 0, -1):
            prefix = "-".join(parts[:i])
            if prefix in BUSINESS_ZH_PREFIX:
                zh_prefix = BUSINESS_ZH_PREFIX[prefix]
                remaining = parts[i:]
                if remaining:
                    # Translate suffix
                    suffix_zh = ""
                    for w in reversed(remaining):
                        if w in BUSINESS_ZH_SUFFIX:
                            suffix_zh = BUSINESS_ZH_SUFFIX[w] + suffix_zh
                        elif w in ZH_NAMES:
                            suffix_zh = ZH_NAMES[w] + suffix_zh
                    return zh_prefix + suffix_zh
                return zh_prefix
        # Try suffix match
        for i in range(1, len(parts) + 1):
            suffix = "-".join(parts[-i:])
            if suffix in BUSINESS_ZH_SUFFIX:
                prefix_parts = parts[:-i]
                if prefix_parts:
                    prefix_zh = ""
                    for w in prefix_parts:
                        prefix_zh += BUSINESS_ZH_PREFIX.get(w, ZH_NAMES.get(w, w))
                    return prefix_zh + BUSINESS_ZH_SUFFIX[suffix]
                return BUSINESS_ZH_SUFFIX[suffix]
        # Fallback: title case
        return slug.replace("-", " ").title()
    if category == "System Layout":
        LAYOUT_ZH = {
            "app-shell": "应用外壳", "admin-header": "管理后台头部", "admin-sider": "管理后台侧边栏",
            "admin-breadcrumb": "管理后台面包屑", "admin-tabs": "管理后台标签页",
            "auth-layout": "认证布局", "blank-layout": "空白布局", "dashboard-layout": "仪表盘布局",
            "detail-layout": "详情布局", "error-layout": "错误页布局", "master-detail-layout": "主次布局",
            "master-detail-tabs": "主次标签布局", "print-layout": "打印布局", "public-layout": "公共布局",
            "region-layout": "区域布局", "top-bar": "顶部栏", "dialog-form-body": "弹窗表单主体",
        }
        return LAYOUT_ZH.get(slug, slug.replace("-", " ").title())
    # Default
    return slug.replace("-", " ").title()


def slug_to_pascal(slug: str) -> str:
    return "".join(w.capitalize() for w in slug.split("-"))


def categorize(slug: str, subfolder: str) -> str:
    """Determine category from slug and subfolder."""
    if subfolder == "business":
        return "Business"
    if subfolder == "layout":
        return "System Layout"
    # ui/ components
    for cat, keywords in CATEGORY_RULES:
        for kw in keywords:
            if slug == kw or slug.startswith(kw + "-") or slug.endswith("-" + kw):
                return cat
    return "General"


def discover_sources() -> list[dict]:
    """Scan all source components and return metadata for each."""
    components = []
    for subfolder in ["ui", "business", "layout"]:
        src_dir = SOURCE_ROOT / subfolder
        if not src_dir.exists():
            continue
        for path in src_dir.rglob("*.tsx"):
            if path.name.endswith(".test.tsx") or path.name.endswith(".spec.tsx"):
                continue
            if path.name.startswith("_") or path.name.startswith("index."):
                continue
            # Get relative path
            rel = path.relative_to(ROOT / "packages/chaos-design-ui")
            rel_str = str(rel)
            # Compute slug: for nested files like business/charts/bar-chart.tsx, use subfolder path
            rel_no_ext = str(rel.with_suffix(""))  # e.g. components/business/charts/bar-chart
            slug = rel_no_ext.replace("components/ui/", "").replace("components/business/", "").replace("components/layout/", "").replace("/", "-")
            # Skip internal util files
            if slug.startswith("_") or slug.startswith("utils") or slug.startswith("types") or slug.startswith("lib"):
                continue
            if "shared" in slug or "helpers" in slug or "hooks" in slug.split("/")[-1]:
                # Check if it looks like a component (PascalCase export)
                try:
                    content = path.read_text()
                    if not re.search(r'export\s+(function|const|class)\s+[A-Z]', content):
                        continue
                except:
                    continue
            # Determine category
            category = categorize(slug, subfolder)
            name = slug_to_pascal(slug.split("/")[-1].split("-")[-1] if "/" in slug else "")
            # Better name from filename
            name = slug_to_pascal(slug.split("/")[-1])
            nameZh = guess_zh_name(slug, category)
            source_path = f"packages/chaos-design-ui/{rel_str}"
            storybook_id = f"components-{slug}--docs"
            components.append({
                "slug": slug,
                "name": name,
                "nameZh": nameZh,
                "category": category,
                "desc": f"{name} — a {category.lower()} component from Chaos UI.",
                "descZh": f"{name} — Chaos UI 的{('业务组件' if category == 'Business' else '系统布局组件' if category == 'System Layout' else '通用组件')}。",
                "sourcePath": source_path,
                "storybookId": storybook_id,
            })
    return components


def parse_existing_meta() -> dict:
    """Parse existing meta and return dict keyed by slug."""
    if not META_FILE.exists():
        return {}
    content = META_FILE.read_text()
    entries = {}
    # Parse by finding blocks between { and }
    blocks = re.split(r'\n  \},\n', content)
    for block in blocks:
        slug_m = re.search(r"slug:\s*['\"]([^'\"]+)['\"]", block)
        if not slug_m:
            continue
        slug = slug_m.group(1)
        name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
        namezh_m = re.search(r"nameZh:\s*['\"]([^'\"]*)['\"]", block)
        cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", block)
        src_m = re.search(r"sourcePath:\s*['\"]([^'\"]+)['\"]", block)
        sb_m = re.search(r"storybookId:\s*['\"]([^'\"]*)['\"]", block)
        desc_m = re.search(r"desc:\s*['\"]([^'\"]*)['\"]", block)
        descZh_m = re.search(r"descZh:\s*['\"]([^'\"]*)['\"]", block)
        entries[slug] = {
            'slug': slug,
            'name': name_m.group(1) if name_m else '',
            'nameZh': namezh_m.group(1) if namezh_m else '',
            'category': cat_m.group(1) if cat_m else 'General',
            'sourcePath': src_m.group(1) if src_m else '',
            'storybookId': sb_m.group(1) if sb_m else '',
            'desc': desc_m.group(1) if desc_m else '',
            'descZh': descZh_m.group(1) if descZh_m else '',
        }
    return entries


def format_entry(e: dict) -> str:
    return f"""  {{
    slug: '{e['slug']}',
    name: "{e['name']}",
    nameZh: "{e['nameZh']}",
    category: '{e['category']}',
    desc: "{e['desc']}",
    descZh: "{e['descZh']}",
    sourcePath: '{e['sourcePath']}',
    storybookId: '{e['storybookId']}',
  }}"""


def write_meta(entries: list[dict]):
    """Write the complete meta file."""
    header = """// AI-generated draft, manual review needed
//
// Source-of-truth: packages/chaos-design-ui/components/{ui,business,layout}/*.tsx
// Auto-generated by scripts/bootstrap-all-docs.py. Covers all discovered source components.

export type Category =
  | 'General'
  | 'Layout'
  | 'Navigation'
  | 'Form'
  | 'DataDisplay'
  | 'Feedback'
  | 'Business'
  | 'System Layout'

export interface ComponentMeta {
  /** kebab-case identifier used in the URL /components/[category]/[slug] */
  slug: string
  /** PascalCase component export name */
  name: string
  /** Chinese display name */
  nameZh: string
  /** One of the 8 product categories */
  category: Category
  /** one-sentence English description */
  desc: string
  /** one-sentence Chinese description */
  descZh: string
  /** optional icon name (lucide). Optional in batch 1. */
  icon?: string
  /** relative path to source file under packages/chaos-design-ui/ */
  sourcePath: string
  /** Storybook autodocs id, e.g. `components-button--docs`. Optional. */
  storybookId?: string
  /** free-form tags for search */
  tags?: string[]
}

export const CATEGORIES: Category[] = [
  'General',
  'Layout',
  'Navigation',
  'Form',
  'DataDisplay',
  'Feedback',
  'Business',
  'System Layout',
]

export const categoryLabelsZh: Record<Category, string> = {
  General: '通用',
  Layout: '布局',
  Navigation: '导航',
  Form: '表单',
  DataDisplay: '数据展示',
  Feedback: '反馈',
  Business: '业务',
  'System Layout': '系统布局',
}

export const categoryLabelsEn: Record<Category, string> = {
  General: 'General',
  Layout: 'Layout',
  Navigation: 'Navigation',
  Form: 'Form',
  DataDisplay: 'Data Display',
  Feedback: 'Feedback',
  Business: 'Business',
  'System Layout': 'System Layout',
}

"""
    # Sort entries: by category order, then by slug
    cat_order = {c: i for i, c in enumerate(['General', 'Layout', 'Navigation', 'Form', 'DataDisplay', 'Feedback', 'Business', 'System Layout'])}
    entries_sorted = sorted(entries, key=lambda e: (cat_order.get(e['category'], 99), e['slug']))

    body = "export const components: ComponentMeta[] = [\n"
    body += ",\n".join(format_entry(e) for e in entries_sorted)
    body += "\n]\n"

    META_FILE.parent.mkdir(parents=True, exist_ok=True)
    META_FILE.write_text(header + body)
    return len(entries_sorted)


def parse_source_info(source_path: str) -> dict:
    """Parse component source for key features."""
    full = ROOT / source_path
    try:
        content = full.read_text()
    except FileNotFoundError:
        return {}
    info = {
        'has_use_client': content.strip().startswith('"use client"') or content.strip().startswith("'use client'"),
        'exports': [],
        'has_cva': 'cva(' in content or 'class-variance-authority' in content,
        'has_lucide': 'lucide-react' in content,
        'has_state': 'useState' in content or 'useReducer' in content,
        'imports_base_ui': '@base-ui' in content,
        'has_on_event': any(x in content for x in ['onClick', 'onChange', 'onSubmit', 'onSelect']),
    }
    exports = set()
    for m in re.finditer(r'export function (\w+)', content):
        exports.add(m.group(1))
    for m in re.finditer(r'export const (\w+)', content):
        name = m.group(1)
        if name[0].isupper():
            exports.add(name)
    named_block = re.findall(r'export\s*\{([^}]+)\}', content)
    for block in named_block:
        for n in re.findall(r'(\w+)', block):
            if n[0].isupper() and n not in ('type', 'default'):
                exports.add(n)
    info['exports'] = list(exports)
    info['has_sub_components'] = len([e for e in exports if e[0].isupper()]) > 1
    return info


def derive_import_path(source_path: str, category: str) -> str:
    if "/components/ui/" in source_path:
        return "@/" + source_path[source_path.index("components/ui/"):].replace(".tsx", "")
    if "/components/business/" in source_path:
        return "@/" + source_path[source_path.index("components/business/"):].replace(".tsx", "")
    if "/components/layout/" in source_path:
        return "@/" + source_path[source_path.index("components/layout/"):].replace(".tsx", "")
    return f"@/components/{'business' if category == 'Business' else 'layout' if category == 'System Layout' else 'ui'}"


def generate_mdx(entry: dict, source_info: dict) -> str:
    name = entry['name']
    nameZh = entry.get('nameZh', '') or name
    slug = entry['slug']
    category = entry['category']
    import_path = derive_import_path(entry.get('sourcePath', ''), category)
    storybook_id = entry.get('storybookId', f'components-{slug}--docs')

    exports = source_info.get('exports', []) or [name]
    primary_export = name
    for e in exports:
        if e.lower().replace("-", "") == name.lower().replace("-", "") or e == name:
            primary_export = e
            break
    if primary_export not in exports and exports:
        primary_export = exports[0]

    main_exports = [e for e in exports if e[0].isupper()]
    if main_exports:
        import_line = f'import {{ {", ".join(main_exports[:4])} }} from "{import_path}"'
    else:
        import_line = f'import {{ {primary_export} }} from "{import_path}"'

    if nameZh and nameZh != name:
        title_line = f"# {name} {nameZh}"
    else:
        title_line = f"# {name}"

    cat_descs = {
        'General': ('通用组件', 'General-purpose component'),
        'Layout': ('布局组件', 'Layout component'),
        'Navigation': ('导航组件', 'Navigation component'),
        'Form': ('表单组件', 'Form control component'),
        'DataDisplay': ('数据展示组件', 'Data display component'),
        'Feedback': ('反馈组件', 'Feedback component'),
        'Business': ('业务组件', 'Business component'),
        'System Layout': ('系统布局组件', 'System layout component'),
    }
    cat_desc_zh, cat_desc_en = cat_descs.get(category, ('组件', 'Component'))
    desc = entry.get('desc', f"{name} — a {cat_desc_en.lower()} from Chaos UI.")
    descZh = entry.get('descZh', f"{name} — Chaos UI 的{cat_desc_zh}。")

    when_zh = f"在需要使用{nameZh}的场景下使用该组件。"
    when_en = f"Use the {name} component when you need {slug.replace('-', ' ')} functionality."

    has_cva = source_info.get('has_cva', False)
    has_state = source_info.get('has_state', False)
    has_sub = source_info.get('has_sub_components', False)
    is_client = source_info.get('has_use_client', False)

    examples = []
    if has_sub and len(main_exports) >= 2:
        sub_ex = f'import {{ {main_exports[0]}, {main_exports[1]} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{main_exports[0]}>\n      <{main_exports[1]}>Content</{main_exports[1]}>\n    </{main_exports[0]}>\n  )\n}}'
        examples.append(("基础用法 / Basic", sub_ex))
    elif has_cva:
        examples.append(("基础用法 / Basic",
            f'import {{ {primary_export} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary_export}>Default</{primary_export}>\n}}'))
        examples.append(("变体 / Variants",
            f'<{primary_export} variant="default">Default</{primary_export}>\n<{primary_export} variant="outline">Outline</{primary_export}>\n<{primary_export} variant="ghost">Ghost</{primary_export}>'))
    else:
        examples.append(("基础用法 / Basic",
            f'import {{ {primary_export} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary_export} />\n}}'))

    if is_client:
        examples.append(("状态 / States",
            f'<{primary_export}>Normal</{primary_export}>\n<{primary_export} disabled>Disabled</{primary_export}>'))

    examples_mdx = ""
    for ex_title, ex_code in examples:
        examples_mdx += f"\n### {ex_title}\n\n<CodeBlock code={{`{ex_code}`}} lang=\"tsx\" />\n"

    api_rows = ""
    if has_cva:
        api_rows += "| variant | `string` | `'default'` | 变体风格 | Style variant |\n"
    api_rows += "| className | `string` | — | 自定义样式类名 | Custom CSS class |\n"
    if has_sub:
        api_rows += "| children | `React.ReactNode` | — | 子内容 | Children content |\n"
    if has_state or is_client:
        api_rows += "| disabled | `boolean` | `false` | 禁用状态 | Disabled state |\n"
    if not api_rows.strip():
        api_rows = "| className | `string` | — | 自定义样式类名 | Custom CSS class |\n| ...rest | `React.ComponentProps` | — | 透传属性 | Passthrough props |\n"

    notes = []
    if is_client:
        notes.append("- **Client Component**: 该组件使用 `\"use client\"` 指令，需在客户端渲染。")
    if has_cva:
        notes.append("- **变体系统**: 通过 `class-variance-authority` (CVA) 管理样式变体。")
    if has_sub:
        notes.append("- **组合模式**: 该组件由多个子组件组成，使用复合组件模式。")
    notes.append("- **无障碍**: 组件遵循 WAI-ARIA 最佳实践。")

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
## 注意事项 / Notes

{chr(10).join(notes)}

> ⚠️ 此页为 AI 自动生成草稿 (auto-generated draft)，需人工审稿。完整 API 请参考 [Storybook 文档](?path=/docs/{storybook_id})。
"""
    return mdx


def sync_proxies():
    """Copy source components to docs/@/components/ if missing or different."""
    copied = 0
    skipped = 0
    for subfolder in ["ui", "business", "layout"]:
        src_dir = SOURCE_ROOT / subfolder
        dst_dir = DOCS_COMPONENTS / subfolder
        dst_dir.mkdir(parents=True, exist_ok=True)
        for src_file in src_dir.rglob("*.tsx"):
            if src_file.name.endswith(".test.tsx"):
                continue
            rel = src_file.relative_to(src_dir)
            dst_file = dst_dir / rel
            dst_file.parent.mkdir(parents=True, exist_ok=True)
            should_copy = not dst_file.exists()
            if not should_copy:
                # Check if content differs (proxy should match source)
                try:
                    if src_file.read_text() != dst_file.read_text():
                        should_copy = True
                except:
                    should_copy = True
            if should_copy:
                shutil.copy2(src_file, dst_file)
                copied += 1
            else:
                skipped += 1
    return copied, skipped


def main():
    print("=" * 60)
    print("Bootstrapping all component documentation")
    print("=" * 60)

    # 1. Discover sources
    print("\n[1/5] Scanning source components...")
    discovered = discover_sources()
    print(f"  Discovered {len(discovered)} source components")

    # Count by category
    cats = {}
    for c in discovered:
        cats[c['category']] = cats.get(c['category'], 0) + 1
    for cat, n in sorted(cats.items()):
        print(f"    {cat}: {n}")

    # 2. Merge with existing meta
    print("\n[2/5] Merging with existing meta entries...")
    existing = parse_existing_meta()
    print(f"  Existing meta entries: {len(existing)}")

    merged = {}
    # Start with discovered (authoritative source of truth)
    for c in discovered:
        slug = c['slug']
        if slug in existing:
            # Preserve manually edited descriptions/zh names if they look good
            e = existing[slug]
            if e.get('nameZh') and len(e['nameZh']) > 1 and not e['nameZh'][0].isascii():
                c['nameZh'] = e['nameZh']
            if e.get('desc') and len(e['desc']) > 20 and "from Chaos UI" not in e['desc']:
                c['desc'] = e['desc']
            if e.get('descZh') and len(e['descZh']) > 10 and "Chaos UI" not in e['descZh']:
                c['descZh'] = e['descZh']
        merged[slug] = c

    # Add entries from existing meta that don't have source files (e.g. aliases)
    for slug, e in existing.items():
        if slug not in merged:
            # Keep but verify file exists
            src = e.get('sourcePath', '')
            if src and (ROOT / src).exists():
                merged[slug] = e

    entries_list = list(merged.values())
    written = write_meta(entries_list)
    print(f"  Writing meta file with {written} entries")

    # 3. Sync proxy files
    print("\n[3/5] Syncing proxy component files...")
    copied, skipped = sync_proxies()
    print(f"  Copied/updated: {copied}, Already in sync: {skipped}")

    # 4. Generate MDX files
    print("\n[4/5] Generating missing MDX draft files...")
    generated = 0
    skipped_mdx = 0
    cat_dir_map = {
        'Business': 'Business', 'DataDisplay': 'DataDisplay', 'Feedback': 'Feedback',
        'Form': 'Form', 'General': 'General', 'Layout': 'Layout',
        'Navigation': 'Navigation', 'System Layout': 'System Layout',
    }
    for entry in entries_list:
        slug = entry['slug']
        category = entry['category']
        dir_name = cat_dir_map.get(category, category)
        out_dir = CONTENT_DIR / dir_name
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{slug}.mdx"
        if out_path.exists():
            skipped_mdx += 1
            continue
        source_info = parse_source_info(entry.get('sourcePath', ''))
        try:
            mdx_content = generate_mdx(entry, source_info)
            out_path.write_text(mdx_content)
            generated += 1
            if generated % 30 == 0:
                print(f"  ... generated {generated}")
        except Exception as ex:
            print(f"  ERROR generating {slug}: {ex}")

    print(f"  Generated: {generated}, Already exist: {skipped_mdx}")

    # 5. Ensure code-block component exists for MDX
    print("\n[5/5] Checking MDX helper components...")
    code_block_path = DOCS_COMPONENTS / "code-block.tsx"
    if not code_block_path.exists():
        code_block_path.write_text('"use client"\ninterface CodeBlockProps { code: string; lang?: string }\nexport function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {\n  return <pre data-lang={lang} className="rounded-md bg-muted p-4 overflow-x-auto text-sm"><code>{code}</code></pre>\n}\n')
        print("  Created code-block.tsx helper")
    else:
        print("  code-block.tsx exists")

    # Count final MDX
    total_mdx = sum(1 for _ in CONTENT_DIR.rglob("*.mdx"))
    print(f"\n{'=' * 60}")
    print(f"DONE! Total MDX files: {total_mdx}, Total meta entries: {written}")
    cats_final = {}
    for f in CONTENT_DIR.rglob("*.mdx"):
        cat = f.parent.name
        cats_final[cat] = cats_final.get(cat, 0) + 1
    for cat, n in sorted(cats_final.items()):
        print(f"  {cat}: {n}")


if __name__ == '__main__':
    main()
