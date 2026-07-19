import { type StatusMapping } from "@chaos_team/chaos-ui/business";
import {
  BarChart3Icon,
  Building2Icon,
  DatabaseIcon,
  LayoutDashboardIcon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon,
  WalletIcon,
} from "@chaos_team/chaos-ui/ui-icons";

export const ADMIN_MENU_ITEMS = [
  {
    key: "dashboard",
    label: "工作台",
    icon: <LayoutDashboardIcon className="size-4" />,
  },
  {
    key: "base-data",
    label: "基础资料",
    icon: <DatabaseIcon className="size-4" />,
    children: [
      { key: "companies", label: "公司管理" },
      { key: "departments", label: "部门管理" },
      { key: "products", label: "商品管理" },
    ],
  },
  {
    key: "customers",
    label: "客户管理",
    icon: <UsersIcon className="size-4" />,
    children: [
      { key: "distributors", label: "经销商档案" },
      { key: "customer-requests", label: "开户申请" },
    ],
  },
  {
    key: "orders",
    label: "订单中心",
    icon: <ShoppingCartIcon className="size-4" />,
  },
  {
    key: "logistics",
    label: "物流管理",
    icon: <TruckIcon className="size-4" />,
    children: [
      { key: "shipments", label: "发货单" },
      { key: "signatures", label: "签收管理" },
    ],
  },
  {
    key: "expenses",
    label: "费用管理",
    icon: <WalletIcon className="size-4" />,
    children: [
      { key: "expense-apply", label: "费用申请" },
      { key: "expense-ledger", label: "费用台账" },
      { key: "reconciliation", label: "对账签认" },
    ],
  },
  {
    key: "reports",
    label: "经营分析",
    icon: <BarChart3Icon className="size-4" />,
  },
];

export const ADMIN_SHELL_TABS = [
  { key: "workspace", label: "工作台", closable: false },
  { key: "company", label: "公司管理", closable: false },
  { key: "customer", label: "客户管理", closable: false },
  { key: "reconciliation", label: "对账签认", closable: false },
  { key: "reports", label: "经营分析", closable: false },
];

export const RECONCILIATION_STATUS_MAPPING: StatusMapping = {
  pending: ["待签认", "info"],
  confirmed: ["已签认", "success"],
  closed: ["已关闭", "default"],
  active: ["已启用", "success"],
  draft: ["草稿", "warning"],
  archived: ["已归档", "default"],
};

export const ADMIN_NOTIFICATIONS = [
  {
    id: "reconciliation-1",
    title: "有 3 笔对账单待签认",
    description: "费用管理 · 2026-07 账期",
    timestamp: "2026-07-19T08:20:00+08:00",
    type: "info" as const,
  },
  {
    id: "reconciliation-2",
    title: "费用台账已完成同步",
    description: "数据更新时间：2026-07-19 08:00",
    timestamp: "2026-07-19T08:00:00+08:00",
    type: "success" as const,
    read: true,
  },
];

export function AdminBrandLogo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg text-sm font-bold">
        M
      </span>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Building2Icon className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-sm font-bold tracking-tight">
          清香园 MOP
        </span>
        <span className="text-muted-foreground mt-1 truncate text-[10px]">
          营销管理系统
        </span>
      </span>
    </div>
  );
}
