"use client";

import * as React from "react";
import { NotificationCenter, UserMenu } from "@chaos_team/chaos-ui/business";
import { AdminShell } from "@chaos_team/chaos-ui/layout";
import { ChaosI18nProvider } from "@chaos_team/chaos-ui/lib";
import {
  ADMIN_MENU_ITEMS,
  ADMIN_NOTIFICATIONS,
  ADMIN_SHELL_TABS,
  AdminBrandLogo,
} from "./admin-template-config";
import { AdminDashboardScene } from "./admin-template-dashboard";
import { AdminLoginScene } from "./admin-template-login";
import {
  AdminReconciliationDetailScene,
  AdminReconciliationListScene,
} from "./admin-template-reconciliation";
import {
  INITIAL_DEMO_ROWS,
  addDemoRow,
  confirmDemoRow,
  type DemoRow,
} from "./mock-data";

export type AdminSceneId = "login" | "dashboard" | "list" | "detail";

export type AdminTemplateDemoProps = {
  scene: AdminSceneId;
  onSceneChange: (scene: AdminSceneId) => void;
  /** Increment / call to re-seed rows from INITIAL_DEMO_ROWS. */
  resetToken?: number;
};

function resolveShellTab(scene: AdminSceneId): string {
  return scene === "dashboard" ? "workspace" : "reconciliation";
}

function AdminTemplateDemoContent({
  scene,
  onSceneChange,
  resetToken = 0,
}: AdminTemplateDemoProps) {
  const [rows, setRows] = React.useState<DemoRow[]>(() => [
    ...INITIAL_DEMO_ROWS,
  ]);
  const [selectedRowId, setSelectedRowId] = React.useState(
    INITIAL_DEMO_ROWS[0]?.id ?? "",
  );
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setRows([...INITIAL_DEMO_ROWS]);
    setSelectedRowId(INITIAL_DEMO_ROWS[0]?.id ?? "");
    setRefreshing(false);
  }, [resetToken]);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 650);
  }, []);

  const handleConfirm = React.useCallback((id: string) => {
    setRows((current) => confirmDemoRow(current, id));
  }, []);

  const handleAdd = React.useCallback(() => {
    setRows((current) =>
      addDemoRow(current, {
        name: `新建经销商 ${current.length + 1}`,
        status: "pending",
      }),
    );
    onSceneChange("list");
  }, [onSceneChange]);

  const selectedRow =
    rows.find((row) => row.id === selectedRowId) ??
    rows[0] ??
    INITIAL_DEMO_ROWS[0];

  if (scene === "login") {
    return (
      <div className="h-full min-h-0">
        <AdminLoginScene onSubmit={() => onSceneChange("dashboard")} />
      </div>
    );
  }

  const shellScene: Exclude<AdminSceneId, "login"> =
    scene === "detail" ? "detail" : scene === "list" ? "list" : "dashboard";

  return (
    <div className="h-full min-h-0">
      <AdminShell
        className="h-full min-h-0"
        logo={<AdminBrandLogo />}
        logoCollapsed={<AdminBrandLogo compact />}
        sidebarWidth={232}
        collapsedWidth={64}
        collapseTrigger="header"
        menuExpandMode="accordion"
        menuItems={ADMIN_MENU_ITEMS}
        selectedMenuKey={
          scene === "detail" || shellScene === "list"
            ? "reconciliation"
            : "dashboard"
        }
        onMenuItemClick={(item) => {
          if (item.key === "dashboard") onSceneChange("dashboard");
          if (item.key === "reconciliation") onSceneChange("list");
        }}
        breadcrumb={[
          { label: "首页" },
          { label: "费用管理" },
          { label: scene === "detail" ? "对账单详情" : "对账签认" },
        ]}
        tabs={ADMIN_SHELL_TABS}
        activeTabKey={resolveShellTab(scene)}
        onTabChange={(key) => {
          if (key === "workspace") onSceneChange("dashboard");
          if (key === "reconciliation") onSceneChange("list");
        }}
        showSearch={false}
        contentPadding={{
          inline: "px-4 lg:px-6",
          top: "pt-4",
          bottom: "pb-6",
        }}
        contentClassName="bg-muted/20"
        notification={
          <NotificationCenter notifications={ADMIN_NOTIFICATIONS} />
        }
        userMenu={
          <UserMenu
            user={{
              name: "运营管理员",
              email: "admin@example.com",
              role: "费用中心",
            }}
            onSignOut={() => onSceneChange("login")}
          />
        }
        siderFooter={
          <div className="text-muted-foreground flex items-center gap-2 px-2 py-1 text-[11px]">
            <span className="bg-success size-1.5 rounded-full" />
            服务运行正常
          </div>
        }
      >
        {shellScene === "dashboard" ? (
          <AdminDashboardScene
            rows={rows}
            onOpenList={() => onSceneChange("list")}
          />
        ) : null}
        {shellScene === "list" ? (
          <AdminReconciliationListScene
            rows={rows}
            onConfirm={handleConfirm}
            onAdd={handleAdd}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            onViewDetail={(id) => {
              setSelectedRowId(id);
              onSceneChange("detail");
            }}
          />
        ) : null}
        {shellScene === "detail" && selectedRow ? (
          <AdminReconciliationDetailScene
            row={selectedRow}
            onBack={() => onSceneChange("list")}
            onConfirm={handleConfirm}
          />
        ) : null}
      </AdminShell>
    </div>
  );
}

export function AdminTemplateDemo(props: AdminTemplateDemoProps) {
  return (
    <ChaosI18nProvider locale="zh-CN">
      <AdminTemplateDemoContent {...props} />
    </ChaosI18nProvider>
  );
}
