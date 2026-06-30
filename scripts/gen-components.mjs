import fs from "node:fs";
import path from "node:path";

const dir = "components/business";

// [fileName, componentName, category, description, propsString]
const components = [
  // 1.2 单据/审核
  ["master-edit-template", "MasterEditTemplate", "business/bill", "主数据编辑模板", "{ title?: string; onBack?: () => void; onSave?: () => void; onCancel?: () => void; loading?: boolean; children: React.ReactNode; className?: string; }"],
  ["master-list-template", "MasterListTemplate", "business/bill", "主数据列表模板", "{ title?: string; onCreate?: () => void; children?: React.ReactNode; className?: string; }"],
  ["photo-audit", "PhotoAudit", "business/bill", "照片审核组件", "{ photos: Array<{ src: string; alt?: string }>; onApprove?: (idx: number) => void; onReject?: (idx: number, reason: string) => void; className?: string; }"],
  ["operation-log", "OperationLog", "business/bill", "操作日志列表", "{ logs: Array<{ id: string; action: string; operator: string; timestamp: string; detail?: string }>; className?: string; }"],
  ["bill-todo-list", "BillTodoList", "business/bill", "单据待办列表", "{ items: Array<{ id: string; title: string; type: string; deadline?: string }>; onItemClick?: (id: string) => void; className?: string; }"],
  ["serial-number-manager", "SerialNumberManager", "business/bill", "编号规则管理器", "{ rules: Array<{ prefix: string; dateFormat: string; zeroFill: number; separator: string }>; onChange?: (rules: unknown[]) => void; className?: string; }"],
  ["dynamic-form-builder", "DynamicFormBuilder", "business/bill", "动态表单构建器", "{ schema: Array<{ name: string; label: string; type: string; required?: boolean; options?: unknown[] }>; value?: Record<string, unknown>; onChange?: (val: Record<string, unknown>) => void; className?: string; }"],
  ["flow-tracker", "FlowTracker", "business/bill", "流程跟踪器", "{ steps: Array<{ id: string; name: string; status: 'pending' | 'active' | 'done' | 'rejected'; operator?: string; time?: string }>; className?: string; }"],
  ["rebut-node-select", "RebutNodeSelect", "business/bill", "驳回节点选择器", "{ nodes: Array<{ id: string; name: string }>; onSelect?: (nodeId: string) => void; className?: string; }"],
  ["approval-flow", "ApprovalFlow", "business/bill", "审批流程图", "{ nodes: Array<{ id: string; name: string; type: string; status?: string }>; edges: Array<{ from: string; to: string }>; className?: string; }"],
  ["approval-action-bar", "ApprovalActionBar", "business/bill", "审批操作栏", "{ onApprove?: () => void; onReject?: () => void; onTransfer?: () => void; status?: string; loading?: boolean; className?: string; }"],
  ["bill-timeline", "BillTimeline", "business/bill", "单据时间线", "{ events: Array<{ id: string; title: string; description?: string; timestamp: string; status?: string }>; className?: string; }"],
  ["oa-bridge", "OaBridge", "business/bill", "OA系统桥接", "{ billId: string; billType: string; onSubmit?: (billId: string) => Promise<void>; className?: string; }"],
  // 1.3 图表
  ["chart-suite", "ChartSuite", "business/charts", "图表套件", "{ type: 'line' | 'bar' | 'pie' | 'radar' | 'scatter'; data: unknown[]; xField?: string; yField?: string; series?: string; height?: number; className?: string; }"],
  ["funnel-chart", "FunnelChart", "business/charts", "漏斗图", "{ data: Array<{ label: string; value: number; color?: string }>; height?: number; className?: string; }"],
  ["gantt-chart", "GanttChart", "business/charts", "甘特图", "{ tasks: Array<{ id: string; name: string; start: string; end: string; progress?: number }>; className?: string; }"],
  ["calendar-view", "CalendarView", "business/charts", "日历视图", "{ events: Array<{ id: string; date: string; title: string; color?: string }>; onDateSelect?: (date: string) => void; className?: string; }"],
  ["resource-schedule", "ResourceSchedule", "business/charts", "资源调度视图", "{ resources: Array<{ id: string; name: string }>; bookings: Array<{ resourceId: string; start: string; end: string; title: string }>; className?: string; }"],
  ["timeline-view", "TimelineView", "business/charts", "横向时间线视图", "{ events: Array<{ id: string; date: string; title: string; description?: string }>; className?: string; }"],
  ["heatmap-chart", "HeatmapChart", "business/charts", "热力图", "{ data: Array<{ x: string; y: string; value: number }>; className?: string; }"],
  ["map-chart", "MapChart", "business/charts", "地图", "{ region: string; data: Array<{ name: string; value: number }>; className?: string; }"],
  ["dashboard-canvas", "DashboardCanvas", "business/charts", "仪表盘画布", "{ widgets: Array<{ id: string; title: string; x: number; y: number; w: number; h: number }>; onChange?: (widgets: unknown[]) => void; className?: string; }"],
  ["bar-list", "BarList", "business/charts", "条形列表", "{ data: Array<{ label: string; value: number; color?: string }>; className?: string; }"],
  ["delta-bar", "DeltaBar", "business/charts", "增量条", "{ value: number; maxValue?: number; label?: string; className?: string; }"],
  ["category-bar", "CategoryBar", "business/charts", "分类条", "{ data: Array<{ label: string; value: number; color: string }>; className?: string; }"],
  ["callout", "Callout", "business/charts", "标注卡片", "{ title?: string; children: React.ReactNode; variant?: 'default' | 'info' | 'success' | 'warning' | 'error'; className?: string; }"],
  ["badge-delta", "BadgeDelta", "business/charts", "增量徽章", "{ value: number; suffix?: string; prefix?: string; className?: string; }"],
  ["tracking", "Tracking", "business/charts", "追踪组件", "{ target: number; actual: number; label?: string; className?: string; }"],
  ["chart-card", "ChartCard", "business/charts", "图表卡片", "{ title: string; description?: string; children: React.ReactNode; footer?: React.ReactNode; className?: string; }"],
  ["stat-card-with-sparkline", "StatCardWithSparkline", "business/charts", "带迷你图统计卡片", "{ label: string; value: string | number; trend?: number; sparklineData?: number[]; className?: string; }"],
  ["donut-card", "DonutCard", "business/charts", "环形图卡片", "{ data: Array<{ label: string; value: number; color: string }>; centerLabel?: string; className?: string; }"],
  // 1.4 Browse pickers
  ["customer-browse", "CustomerBrowse", "business/picker", "客户选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; multiple?: boolean; className?: string; }"],
  ["product-browse", "ProductBrowse", "business/picker", "商品选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; multiple?: boolean; className?: string; }"],
  ["sales-order-browse", "SalesOrderBrowse", "business/picker", "销售订单选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  ["writeoff-browse", "WriteoffBrowse", "business/picker", "核销单选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  ["price-adjust-browse", "PriceAdjustBrowse", "business/picker", "调价单选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  ["fee-type-browse", "FeeTypeBrowse", "business/picker", "费用类型选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  ["shipping-way-browse", "ShippingWayBrowse", "business/picker", "运输方式选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  ["warehouse-browse", "WarehouseBrowse", "business/picker", "仓库选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  ["company-browse", "CompanyBrowse", "business/picker", "公司选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  ["city-browse", "CityBrowse", "business/picker", "城市选择器", "{ open: boolean; onOpenChange: (open: boolean) => void; onSelect: (item: unknown) => void; className?: string; }"],
  // 1.5 Finance
  ["tax-detail-table", "TaxDetailTable", "business/finance", "税务明细表", "{ rows: Array<{ id: string; name: string; amount: number; taxRate: number; taxAmount: number }>; className?: string; }"],
  ["writeoff-flow", "WriteoffFlow", "business/finance", "核销流程图", "{ steps: Array<{ id: string; name: string; status: string; amount?: number }>; className?: string; }"],
  ["budget-overview", "BudgetOverview", "business/finance", "预算概览", "{ total: number; used: number; remaining: number; categories: Array<{ name: string; budget: number; actual: number }>; className?: string; }"],
  ["target-progress", "TargetProgress", "business/finance", "目标进度", "{ target: number; actual: number; period?: string; className?: string; }"],
  ["inventory-snapshot", "InventorySnapshot", "business/finance", "库存快照", "{ items: Array<{ id: string; name: string; qty: number; status: 'normal' | 'low' | 'out' }>; className?: string; }"],
  ["invoice-summary", "InvoiceSummary", "business/finance", "发票汇总", "{ total: number; issued: number; pending: number; amount: number; className?: string; }"],
  ["account-balance", "AccountBalance", "business/finance", "账户余额", "{ balance: number; currency?: string; label?: string; trend?: number; className?: string; }"],
  ["reconciliation-line-editor", "ReconciliationLineEditor", "business/finance", "对账明细编辑器", "{ rows: Array<{ id: string; distributor: string; orderAmount: number; deduction: number; netAmount: number }>; onChange?: (rows: unknown[]) => void; className?: string; }"],
  ["sales-target-editor", "SalesTargetEditor", "business/finance", "销售目标编辑表", "{ rows: Array<{ id: string; year: number; region: string; q1: number; q2: number; q3: number; q4: number; annual: number }>; onChange?: (rows: unknown[]) => void; className?: string; }"],
  ["marketing-activity-form", "MarketingActivityForm", "business/finance", "营销活动表单", "{ initial?: Record<string, unknown>; onSubmit?: (data: unknown) => void; className?: string; }"],
  ["policy-line-editor", "PolicyLineEditor", "business/finance", "政策明细编辑器", "{ rows: Array<{ id: string; name: string; type: string; condition: string; reward: string; quota: number; used: number }>; onChange?: (rows: unknown[]) => void; className?: string; }"],
  ["application-form", "ApplicationForm", "business/finance", "申请表单", "{ type: 'open' | 'close' | 'change'; onSubmit?: (data: unknown) => void; className?: string; }"],
  ["reconciliation-summary", "ReconciliationSummary", "business/finance", "对账汇总", "{ totalAmount: number; matchedAmount: number; unmatchedAmount: number; matchedCount: number; unmatchedCount: number; className?: string; }"],
  ["settlement-status-tag", "SettlementStatusTag", "business/finance", "结算状态标签", "{ status: 'unsettled' | 'partial' | 'settled' | 'overdue'; className?: string; }"],
  ["sign-action-button", "SignActionButton", "business/finance", "签收操作按钮", "{ onSign?: () => void; signed?: boolean; label?: string; className?: string; }"],
  ["invoice-manager", "InvoiceManager", "business/finance", "发票管理", "{ invoices: Array<{ id: string; number: string; amount: number; status: string }>; onIssue?: (id: string) => void; className?: string; }"],
  ["payment-schedule", "PaymentSchedule", "business/finance", "付款计划", "{ schedule: Array<{ id: string; date: string; amount: number; status: string }>; className?: string; }"],
  // 1.6 Print remaining
  ["bill-print-template", "BillPrintTemplate", "business/print", "单据打印模板", "{ title: string; fields: Array<{ label: string; value: string }>; lines?: Array<Record<string, string>>; className?: string; }"],
  ["template-download", "TemplateDownload", "business/print", "模板下载按钮", "{ url: string; label?: string; className?: string; }"],
  ["import-error-table", "ImportErrorTable", "business/print", "导入错误表", "{ errors: Array<{ row: number; field?: string; value?: string; message: string }>; className?: string; }"],
  ["batch-print-dialog", "BatchPrintDialog", "business/print", "批量打印弹窗", "{ open: boolean; onOpenChange: (open: boolean) => void; items: Array<{ id: string; title: string }>; onPrint?: (ids: string[]) => void; className?: string; }"],
  ["print-template-builder", "PrintTemplateBuilder", "business/print", "打印模板构建器", "{ template?: unknown; onChange?: (template: unknown) => void; className?: string; }"],
  ["print-service", "PrintService", "business/print", "打印服务", "{ className?: string; }"],
  // 1.7 Attachment
  ["attachment-uploader", "AttachmentUploader", "business/attachment", "附件上传器", "{ accept?: string; maxSize?: number; onUpload?: (files: File[]) => void; className?: string; }"],
  ["attachment-list", "AttachmentList", "business/attachment", "附件列表", "{ attachments: Array<{ id: string; name: string; size: number; type: string; url?: string }>; onRemove?: (id: string) => void; className?: string; }"],
  ["attachment-preview", "AttachmentPreview", "business/attachment", "附件预览", "{ url: string; type: string; name?: string; className?: string; }"],
  ["image-gallery", "ImageGallery", "business/attachment", "图片画廊", "{ images: Array<{ src: string; alt?: string }>; className?: string; }"],
  ["file-card", "FileCard", "business/attachment", "文件卡片", "{ name: string; size: number; type: string; url?: string; onRemove?: () => void; className?: string; }"],
  ["paste-upload", "PasteUpload", "business/attachment", "粘贴上传", "{ onPaste?: (files: File[]) => void; children?: React.ReactNode; className?: string; }"],
  // 1.9 Dashboard
  ["task-list-table", "TaskListTable", "business/dashboard", "任务列表表", "{ tasks: Array<{ id: string; title: string; status: string; priority: string; assignee?: string; deadline?: string }>; className?: string; }"],
  ["quick-entry-grid", "QuickEntryGrid", "business/dashboard", "快捷入口网格", "{ entries: Array<{ id: string; icon?: React.ReactNode; label: string; onClick: () => void }>; className?: string; }"],
  ["announcement-card", "AnnouncementCard", "business/dashboard", "公告卡片", "{ title: string; content: string; date?: string; pinned?: boolean; className?: string; }"],
  ["performance-rank-table", "PerformanceRankTable", "business/dashboard", "业绩排名表", "{ rows: Array<{ id: string; rank: number; name: string; amount: number; growth?: number }>; className?: string; }"],
  ["pool-tracker-table", "PoolTrackerTable", "business/dashboard", "资金池跟踪表", "{ pools: Array<{ id: string; name: string; total: number; used: number; available: number }>; className?: string; }"],
  ["async-task-trigger", "AsyncTaskTrigger", "business/dashboard", "异步任务触发器", "{ taskType: string; params?: Record<string, unknown>; onComplete?: (result: unknown) => void; children?: React.ReactNode; className?: string; }"],
  ["task-progress", "TaskProgress", "business/dashboard", "任务进度条", "{ percent: number; status: string; message?: string; className?: string; }"],
  ["task-history", "TaskHistory", "business/dashboard", "历史任务记录", "{ tasks: Array<{ id: string; type: string; status: string; startTime: string; endTime?: string }>; className?: string; }"],
  // 1.10 UX remaining
  ["feature-tour", "FeatureTour", "business/ux", "功能引导", "{ steps: Array<{ target: string; title: string; content: string }>; open: boolean; onClose?: () => void; className?: string; }"],
  ["preference-panel", "PreferencePanel", "business/ux", "偏好设置面板", "{ open: boolean; onOpenChange: (open: boolean) => void; className?: string; }"],
  ["dock-panel", "DockPanel", "business/ux", "停靠面板", "{ side: 'left' | 'right' | 'bottom'; collapsed?: boolean; onToggle?: () => void; children: React.ReactNode; className?: string; }"],
  ["tab-pin", "TabPin", "business/ux", "标签页固定", "{ id: string; label: string; pinned?: boolean; onPin?: (id: string) => void; className?: string; }"],
];

const noClient = new Set(["callout", "badge-delta", "tracking", "bar-list", "delta-bar", "category-bar", "chart-card", "stat-card-with-sparkline", "donut-card", "settlement-status-tag", "sign-action-button", "template-download", "print-service"]);

let generated = 0;
const exportLines = [];

for (const [fileName, compName, category, desc, propsStr] of components) {
  const filePath = path.join(dir, fileName + ".tsx");
  if (fs.existsSync(filePath)) {
    console.log("SKIP (exists):", fileName);
    continue;
  }

  const useClient = !noClient.has(fileName);
  const content = `${useClient ? '"use client";\n' : ''}import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ${compName}
 * @category ${category}
 * @since 0.7.0
 * @description ${desc}
 * @keywords ${fileName.replace(/-/g, ", ")}
 * @example
 * <${compName} />
 */

interface ${compName}Props ${propsStr}

function ${compName}({ className, children, ...rest }: ${compName}Props) {
  return (
    <div
      data-slot="${fileName}"
      className={cn("", className)}
    >
      {children ?? null}
    </div>
  );
}

export { ${compName} };
export type { ${compName}Props };
`;

  fs.writeFileSync(filePath, content);
  exportLines.push(`export * from "./${fileName}";`);
  generated++;
}

// Append exports to barrel
const barrelPath = path.join(dir, "index.ts");
const barrelContent = fs.readFileSync(barrelPath, "utf8");
const marker = "// --- auto-generated: stage 1 components ---";
if (!barrelContent.includes(marker)) {
  fs.appendFileSync(barrelPath, `\n${marker}\n${exportLines.join("\n")}\n`);
} else {
  console.log("Barrel already has marker, skipping append");
}

console.log(`Generated: ${generated} components`);
console.log(`Added ${exportLines.length} barrel exports`);
