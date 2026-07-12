import type { ComponentMeta } from "@/content/components.meta";
import { BUSINESS_SUBCATEGORY_OVERRIDES } from "@/lib/business-subcategory-overrides";

/** Business 组件的子分组 key */
export type BusinessSubCategory =
  | "dashboard"
  | "report"
  | "approval"
  | "list"
  | "detail"
  | "modal"
  | "toolbar"
  | "picker"
  | "other";

export const BUSINESS_SUB_CATEGORIES: BusinessSubCategory[] = [
  "dashboard",
  "report",
  "approval",
  "list",
  "detail",
  "modal",
  "toolbar",
  "picker",
  "other",
];

export const businessSubLabelsZh: Record<BusinessSubCategory, string> = {
  dashboard: "仪表盘 & 看板",
  report: "报表 & 图表",
  approval: "审批 & 工作流",
  list: "列表 & 表格",
  detail: "详情 & 卡片",
  modal: "弹窗 & 抽屉",
  toolbar: "工具栏 & 操作栏",
  picker: "输入 & 选择器",
  other: "其他",
};

export const businessSubLabelsEn: Record<BusinessSubCategory, string> = {
  dashboard: "Dashboards",
  report: "Reports & Charts",
  approval: "Approval & Workflow",
  list: "Lists & Tables",
  detail: "Details & Cards",
  modal: "Modals & Drawers",
  toolbar: "Toolbars & Action Bars",
  picker: "Pickers & Selectors",
  other: "Other",
};

/**
 * 根据组件名/别名为 Business 分类分配子分组。
 * 1) slug 覆盖表  2) name/slug/sourcePath 启发式  3) other
 */
export function getBusinessSubCategory(
  comp: ComponentMeta,
): BusinessSubCategory {
  const override = BUSINESS_SUBCATEGORY_OVERRIDES[comp.slug];
  if (override) return override;

  const hay = [comp.name, comp.nameZh, comp.slug, comp.sourcePath]
    .join(" ")
    .toLowerCase();

  if (/dashboard|仪表盘|看板|概览|metrics\b|kpi\b|analytic|overview/i.test(hay))
    return "dashboard";
  if (
    /report|报表|chart|图表|statistic|统计|trend|趋势|echart|sankey|funnel|heatmap|spark|gauge|treemap|waterfall|radar|scatter|donut|pie-chart|line-chart|bar-chart|area-chart/i.test(
      hay,
    )
  )
    return "report";
  if (
    /approval|审批|workflow|工作流|audit|审核|examin|查验|auth-guard|sign-action|status-action/i.test(
      hay,
    )
  )
    return "approval";
  if (
    /modal|弹窗|dialog|drawer|抽屉|popup|popover|prompt-dialog|browse-dialog|confirm-dialog|import-dialog|action-sheet/i.test(
      hay,
    )
  )
    return "modal";
  if (
    /list|列表|table|表格|grid|网格|crud|增删改查|tree|树|kanban|看板列|data-table|pro-table|search-table|todo-list|task-list|attachment-list|message-list/i.test(
      hay,
    )
  )
    return "list";
  if (
    /toolbar|工具栏|actionbar|操作栏|filter-bar|filter-builder|saved-filter|advanced-search|refresh-button|bulk-action|edit-toolbar|crud-toolbar/i.test(
      hay,
    )
  )
    return "toolbar";
  if (
    /picker|选择器|selector|browse|筛选器|chooser|upload|上传|select\b|form-field|form-wizard|form-designer|form-dialog|date-range|multi-select|remote-select|dict-select/i.test(
      hay,
    )
  )
    return "picker";
  if (
    /detail|详情|view|查看|profile|档案|info|信息|card|卡片|timeline|时间线|bill-|status-tag|status-badge|page-header|page-shell|invoice|campaign-card|customer-360|work-order|chat-shell/i.test(
      hay,
    )
  )
    return "detail";
  if (/calendar|日历|schedule|排班|attendance|shift/i.test(hay))
    return "dashboard";

  return "other";
}

/**
 * 将组件列表按子分组归类。
 */
export function groupByBusinessSub(
  components: ComponentMeta[],
): Map<BusinessSubCategory, ComponentMeta[]> {
  const map = new Map<BusinessSubCategory, ComponentMeta[]>();
  for (const sc of BUSINESS_SUB_CATEGORIES) map.set(sc, []);
  for (const c of components) {
    map.get(getBusinessSubCategory(c))!.push(c);
  }
  return map;
}
