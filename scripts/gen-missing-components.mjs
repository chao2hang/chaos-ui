import fs from "node:fs";
import path from "node:path";

// Missing components extracted from todo.md
const missingComponents = [
  // Business - pickers
  { name: "tree-crud-page", dir: "components/business", desc: "左树右表 CRUD" },
  { name: "tab-crud-page", dir: "components/business", desc: "标签页切换 CRUD" },
  { name: "todo-list-table", dir: "components/business", desc: "待办事项表格" },
  { name: "company-picker", dir: "components/business", desc: "公司选择器" },
  { name: "department-picker", dir: "components/business", desc: "部门选择器(支持树形)" },
  { name: "employee-picker", dir: "components/business", desc: "员工选择器" },
  { name: "distributor-picker", dir: "components/business", desc: "经销商选择器" },
  { name: "sku-picker", dir: "components/business", desc: "商品/SKU 选择器" },
  { name: "warehouse-picker", dir: "components/business", desc: "仓库选择器" },
  { name: "region-picker", dir: "components/business", desc: "行政区划选择器(树形级联)" },
  { name: "product-category-picker", dir: "components/business", desc: "商品分类选择器(树形)" },
  { name: "cost-center-picker", dir: "components/business", desc: "成本中心选择器" },
  { name: "customer-picker", dir: "components/business", desc: "客户选择器(含经销商/终端)" },
  { name: "promotion-rule-editor", dir: "components/business", desc: "促销规则编辑器" },
  { name: "promotion-rule-card", dir: "components/business", desc: "促销规则展示卡" },
  { name: "budget-allocator", dir: "components/business", desc: "预算分配组件" },
  { name: "kanban-column", dir: "components/business", desc: "看板列(单列)" },
  { name: "message-list", dir: "components/business", desc: "消息列表(站内信)" },
  { name: "im-message", dir: "components/business", desc: "IM 消息气泡" },
  { name: "permission-button", dir: "components/business", desc: "按钮级权限封装" },
  { name: "stat-card-with-delta", dir: "components/business", desc: "统计卡 + 增减标签" },
  { name: "bar-list-card", dir: "components/business", desc: "排名列表卡" },
  { name: "subform-tabs", dir: "components/business", desc: "子表单 tab" },
  // Charts
  { name: "gauge-chart", dir: "components/business", desc: "仪表盘图" },
  { name: "area-chart", dir: "components/business", desc: "面积图(趋势+填充)" },
  { name: "bar-chart", dir: "components/business", desc: "柱状图(分组/堆叠/横向)" },
  { name: "line-chart", dir: "components/business", desc: "折线图(多线+标注)" },
  { name: "donut-chart", dir: "components/business", desc: "环形图(占比)" },
  { name: "pie-chart", dir: "components/business", desc: "饼图" },
  { name: "scatter-chart", dir: "components/business", desc: "散点图" },
  { name: "radial-chart", dir: "components/business", desc: "径向图(达成率)" },
  { name: "spark-chart", dir: "components/business", desc: "迷你趋势图" },
  { name: "treemap-chart", dir: "components/business", desc: "树图(层级占比)" },
  { name: "sankey-chart", dir: "components/business", desc: "桑基图(流量流转)" },
  { name: "radar-chart", dir: "components/business", desc: "雷达图(多维评估)" },
  { name: "waterfall-chart", dir: "components/business", desc: "瀑布图(财务分析)" },
  // Layout
  { name: "split-screen", dir: "components/layout", desc: "左右分屏布局" },
  { name: "article-layout", dir: "components/layout", desc: "长文/帮助文档布局" },
  { name: "print-template-layout", dir: "components/layout", desc: "打印模板布局" },
  { name: "embed-layout", dir: "components/layout", desc: "嵌入第三方系统布局" },
  // UI
  { name: "chat-message", dir: "components/ui", desc: "消息气泡(增强)" },
  { name: "chat-input", dir: "components/ui", desc: "聊天输入框" },
  { name: "with-permission", dir: "components/ui", desc: "高阶组件权限" },
  // Mobile
  { name: "mobile-pull-refresh", dir: "components/ui", desc: "下拉刷新" },
  { name: "mobile-swipe-action", dir: "components/ui", desc: "滑动操作" },
  // Dashboard
  { name: "dashboard-grid", dir: "components/business", desc: "预设仪表盘网格布局" },
  { name: "overview-page", dir: "components/business", desc: "总览页面模板" },
];

// Missing hooks
const missingHooks = [
  "use-dict", "use-table", "use-form-table", "use-bill", "use-approval",
  "use-line-editor", "use-print", "use-export", "use-import", "use-data-scope",
  "use-websocket", "use-sse", "use-async-task", "use-fetch", "use-swr",
  "use-undo", "use-redo", "use-idle", "use-network-quality",
];

// Missing lib
const missingLib = [
  "date", "worker", "excel", "pdf", "crypto",
];

let generated = 0;

function toPascalCase(name) {
  return name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

function genComponent(name, dir, desc) {
  const filePath = path.join(dir, `${name}.tsx`);
  if (fs.existsSync(filePath)) return;

  const compName = toPascalCase(name);
  const content = `"use client";
import { cn } from "@/lib/utils";

/**
 * @component ${compName}
 * @category ${dir.includes("business") ? "Business" : dir.includes("layout") ? "Layout" : "UI"}
 * @since 1.0.0-beta.0
 * @example
 * \`\`\`tsx
 * <${compName} />
 * \`\`\`
 * ${desc}
 */
export interface ${compName}Props {
  className?: string;
}

function ${compName}({ className }: ${compName}Props) {
  return <div data-slot="${name}" className={cn("", className)} />;
}

export { ${compName} };
export type { ${compName}Props };
`;

  fs.writeFileSync(filePath, content);
  generated++;
}

function genHook(name) {
  const filePath = path.join("hooks", `${name}.ts`);
  if (fs.existsSync(filePath)) return;

  const hookName = name; // keep kebab-case for file, but export camelCase
  const exportName = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const content = `"use client";
import * as React from "react";

/**
 * @hook ${exportName}
 * @category ${name.startsWith("use-") ? "Data" : "Utility"}
 * @since 1.0.0-beta.0
 */
export function ${exportName}() {
  return React.useMemo(() => ({}), []);
}
`;

  fs.writeFileSync(filePath, content);
  generated++;
}

function genLib(name) {
  const filePath = path.join("lib", `${name}.ts`);
  if (fs.existsSync(filePath)) return;

  const exportName = toPascalCase(name);
  const content = `/**
 * @module ${name}
 * @category Utility
 * @since 1.0.0-beta.0
 */

export function ${exportName.toLowerCase()}(): void {
  // TODO: implement
}
`;

  fs.writeFileSync(filePath, content);
  generated++;
}

// Generate components
for (const { name, dir, desc } of missingComponents) {
  genComponent(name, dir, desc);
}

// Generate hooks
for (const name of missingHooks) {
  genHook(name);
}

// Generate lib
for (const name of missingLib) {
  genLib(name);
}

console.log(`Generated ${generated} files`);
