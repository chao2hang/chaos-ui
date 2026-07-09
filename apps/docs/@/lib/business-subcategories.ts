import type { ComponentMeta } from "@/content/components.meta";

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
 * 规则：按 name + nameZh + slug 做关键词正则匹配，未命中则归入 "other"。
 */
export function getBusinessSubCategory(
  comp: ComponentMeta,
): BusinessSubCategory {
  const hay = [comp.name, comp.nameZh, comp.slug].join(" ").toLowerCase();

  if (/dashboard|仪表盘|看板|概览|metrics\b|kpi\b|analytic/i.test(hay))
    return "dashboard";
  if (/report|报表|chart|图表|statistic|统计|trend|趋势|echart/i.test(hay))
    return "report";
  if (/approval|审批|workflow|工作流|audit|审核|examin|查验/i.test(hay))
    return "approval";
  if (
    /^(?!.*(?:popup|modal|drawer|tooltip)).*(list|列表|table|表格|grid|网格|crud|增删改查|tree|树|column|row)\b/i.test(
      hay,
    )
  )
    return "list";
  if (
    /detail|详情|view|查看|profile|档案|info|信息|card|卡片|timeline|时间线/i.test(
      hay,
    )
  )
    return "detail";
  if (/modal|弹窗|dialog|drawer|抽屉|popup|popover|tooltip|提示框/i.test(hay))
    return "modal";
  if (
    /toolbar|工具栏|actionbar|操作栏|header|顶栏|footer|底栏|menubar|command/i.test(
      hay,
    )
  )
    return "toolbar";
  if (
    /picker|选择器|selector|筛选|input|输入|chooser|upload|上传|drop|拖放|color\b/i.test(
      hay,
    )
  )
    return "picker";

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
