"use client";

import * as React from "react";
import { AdminShell, AuthLayout } from "@chaos_team/chaos-ui/layout";
import { ListPageShell } from "@chaos_team/chaos-ui/business";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@chaos_team/chaos-ui/ui";
import {
  INITIAL_DEMO_ROWS,
  addDemoRow,
  deleteDemoRow,
  filterDemoRows,
  type DemoRow,
} from "./mock-data";

export type AdminSceneId = "login" | "dashboard" | "list" | "detail";

export type AdminTemplateDemoProps = {
  scene: AdminSceneId;
  onSceneChange: (scene: AdminSceneId) => void;
  /** Increment / call to re-seed rows from INITIAL_DEMO_ROWS */
  resetToken?: number;
};

const MENU_ITEMS = [
  { key: "dashboard", label: "仪表盘" },
  { key: "list", label: "列表" },
  { key: "detail", label: "详情" },
] as const;

const STAT_CARDS = [
  { title: "待办事项", value: "12", hint: "本周新增 3" },
  { title: "活跃合同", value: "48", hint: "较上月 +6%" },
  { title: "草稿单据", value: "7", hint: "需跟进" },
  { title: "归档记录", value: "126", hint: "本季度" },
] as const;

function LoginScene({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  const [email, setEmail] = React.useState("admin@example.com");
  const [password, setPassword] = React.useState("demo");

  return (
    <AuthLayout variant="centered" className="h-full min-h-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">登录 Chaos Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-xs font-medium" htmlFor="admin-demo-email">
                邮箱
              </label>
              <Input
                id="admin-demo-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-muted-foreground text-xs font-medium"
                htmlFor="admin-demo-password"
              >
                密码
              </label>
              <Input
                id="admin-demo-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

function DashboardScene() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
              <p className="text-muted-foreground mt-1 text-xs">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">运营概览</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-28 items-center justify-center rounded-md border border-dashed text-sm">
            图表 / 动态占位区
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ListScene({
  rows,
  onAdd,
  onDelete,
}: {
  rows: DemoRow[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  const [nameQuery, setNameQuery] = React.useState("");
  const [statusQuery, setStatusQuery] = React.useState("");
  const [applied, setApplied] = React.useState({ name: "", status: "" });

  const filtered = React.useMemo(
    () => filterDemoRows(rows, applied),
    [rows, applied],
  );

  return (
    <ListPageShell
      filter={
        <div className="flex flex-wrap items-end gap-2">
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs" htmlFor="admin-demo-filter-name">
              名称
            </label>
            <Input
              id="admin-demo-filter-name"
              value={nameQuery}
              onChange={(event) => setNameQuery(event.target.value)}
              placeholder="搜索名称"
              className="w-44"
            />
          </div>
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs" htmlFor="admin-demo-filter-status">
              状态
            </label>
            <Input
              id="admin-demo-filter-status"
              value={statusQuery}
              onChange={(event) => setStatusQuery(event.target.value)}
              placeholder="active / draft / archived"
              className="w-48"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              setApplied({
                name: nameQuery,
                status: statusQuery,
              })
            }
          >
            查询
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setNameQuery("");
              setStatusQuery("");
              setApplied({ name: "", status: "" });
            }}
          >
            重置
          </Button>
        </div>
      }
      toolbar={
        <Button type="button" size="sm" onClick={onAdd}>
          新建
        </Button>
      }
      extra={<span>共 {filtered.length} 条</span>}
    >
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground h-16 text-center text-sm">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(row.id)}
                    >
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </ListPageShell>
  );
}

function DetailScene({ rows }: { rows: DemoRow[] }) {
  const row =
    rows.find((item) => item.id === "ord-1001") ?? rows[0] ?? INITIAL_DEMO_ROWS[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">单据详情</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-xs">ID</dt>
            <dd className="font-mono text-sm">{row.id}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">名称</dt>
            <dd className="text-sm">{row.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">状态</dt>
            <dd className="text-sm">{row.status}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">更新时间</dt>
            <dd className="text-sm">{row.updatedAt}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

export function AdminTemplateDemo({
  scene,
  onSceneChange,
  resetToken = 0,
}: AdminTemplateDemoProps) {
  const [rows, setRows] = React.useState<DemoRow[]>(() => [...INITIAL_DEMO_ROWS]);

  React.useEffect(() => {
    setRows([...INITIAL_DEMO_ROWS]);
  }, [resetToken]);

  if (scene === "login") {
    return (
      <div className="h-full min-h-0">
        <LoginScene onSubmit={() => onSceneChange("dashboard")} />
      </div>
    );
  }

  const shellScene: Exclude<AdminSceneId, "login"> =
    scene === "list" || scene === "detail" ? scene : "dashboard";

  return (
    <div className="h-full min-h-0">
      <AdminShell
        className="h-full min-h-0"
        logo={<span className="text-sm font-bold">Chaos Admin</span>}
        menuItems={[...MENU_ITEMS]}
        selectedMenuKey={shellScene}
        onMenuItemClick={(item) => {
          if (item.key === "dashboard" || item.key === "list" || item.key === "detail") {
            onSceneChange(item.key);
          }
        }}
        user={{ name: "Demo Admin", email: "admin@example.com" }}
        onSignOut={() => onSceneChange("login")}
        showSearch={false}
      >
        {shellScene === "dashboard" ? <DashboardScene /> : null}
        {shellScene === "list" ? (
          <ListScene
            rows={rows}
            onAdd={() =>
              setRows((current) =>
                addDemoRow(current, { name: `新建单据 ${current.length + 1}` }),
              )
            }
            onDelete={(id) => setRows((current) => deleteDemoRow(current, id))}
          />
        ) : null}
        {shellScene === "detail" ? <DetailScene rows={rows} /> : null}
      </AdminShell>
    </div>
  );
}
