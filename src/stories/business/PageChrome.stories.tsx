import type { Meta, StoryObj } from "@storybook/react";
import { PageChrome } from "@/components/business/page-chrome";
import { ListPageShell } from "@/components/business/list-page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, RefreshCwIcon, PrinterIcon } from "@/components/ui/icons";

const meta = {
  title: "Business/PageChrome",
  component: PageChrome,
  tags: ["autodocs", "a11y"],
  parameters: {
    docs: {
      description: {
        component:
          "Page-type density chrome (#44 / #55 / #58). `list` / `form` / `detail` hide in-page title. List CRUD: put 刷新/新增 on `ListPageShell` toolbar (same row as filter) — **not** `PageChrome.actions`. `document` is a deprecated alias of `form`.",
      },
    },
  },
} satisfies Meta<typeof PageChrome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    variant: "overview",
    title: "Dashboard",
    description: "KPI overview for the workspace",
    actions: <Button size="sm">Export</Button>,
    children: (
      <div className="grid gap-4 md:grid-cols-3">
        {["Revenue", "Orders", "Active users"].map((label) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm">{label}</p>
              <p className="text-2xl font-semibold">—</p>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
  },
};

/** Recommended list: no PageChrome.actions; toolbar beside FilterBar (#58). */
export const List: Story = {
  name: "List (recommended)",
  args: {
    variant: "list",
    children: (
      <ListPageShell
        filterFields={[
          {
            key: "keyword",
            label: "关键词",
            type: "input",
            placeholder: "姓名 / 工号",
          },
        ]}
        onSearch={() => {}}
        toolbar={
          <>
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="mr-1 size-4" />
              刷新
            </Button>
            <Button size="sm">
              <PlusIcon className="mr-1 size-4" />
              新增
            </Button>
          </>
        }
      >
        <div className="text-muted-foreground border-border rounded-md border border-dashed p-8 text-center text-sm">
          SearchTable / data grid — filter and actions share one row.
        </div>
      </ListPageShell>
    ),
  },
};

/** Anti-pattern: full-width justify-end strip under tabs (#58). */
export const ListActionsAntiPattern: Story = {
  name: "List + actions (Do Not)",
  parameters: {
    docs: {
      description: {
        story:
          "**Do not** put CRUD 刷新/新增 on `PageChrome.actions` — creates a full-width empty strip. Use `ListPageShell` toolbar instead.",
      },
    },
  },
  args: {
    variant: "list",
    actions: (
      <>
        <Button variant="outline" size="sm">
          刷新
        </Button>
        <Button size="sm">新增</Button>
      </>
    ),
    children: (
      <div className="text-muted-foreground border-border rounded-md border border-dashed p-8 text-center text-sm">
        Anti-pattern demo only.
      </div>
    ),
  },
};

export const Form: Story = {
  args: {
    variant: "form",
    // title/actions intentionally ignored — submit lives in card footer
    title: "ignored",
    children: (
      <Card>
        <CardContent className="space-y-3 pt-6">
          <p className="text-muted-foreground text-sm">
            Create / edit form — no page title, no top toolbar.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Submit</Button>
          </div>
        </CardContent>
      </Card>
    ),
  },
};

export const Detail: Story = {
  args: {
    variant: "detail",
    identity: (
      <>
        <span className="font-medium tabular-nums">SO-20260717-001</span>
        <Badge variant="secondary">已审</Badge>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <PrinterIcon className="mr-1 size-3.5" />
            打印
          </Button>
          <Button variant="outline" size="sm">
            更多
          </Button>
        </div>
      </>
    ),
    children: (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            Detail body — identity strip only, no h1.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

/** @deprecated Prefer Form — same layout */
export const Document: Story = {
  name: "Document (deprecated → form)",
  args: {
    variant: "document",
    title: "No longer shown as header",
    children: (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            `document` aliases `form`: no in-page title.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const ListWithShell: Story = {
  name: "List + ListPageShell (inline toolbar)",
  args: {
    variant: "list",
    children: (
      <ListPageShell
        filterFields={[
          {
            key: "keyword",
            label: "关键词",
            type: "input",
            placeholder: "姓名 / 工号",
          },
        ]}
        onSearch={() => {}}
        extra={<span className="text-sm">共 128 条</span>}
        toolbar={
          <>
            <Button variant="outline" size="sm">
              导出
            </Button>
            <Button size="sm">
              <PlusIcon className="mr-1 size-4" />
              新增员工
            </Button>
          </>
        }
      >
        <div className="text-muted-foreground border-border rounded-md border border-dashed p-8 text-center text-sm">
          SearchTable / data grid
        </div>
      </ListPageShell>
    ),
  },
};
