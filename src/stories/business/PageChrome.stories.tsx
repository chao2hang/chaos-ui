import type { Meta, StoryObj } from "@storybook/react";
import { PageChrome } from "@/components/business/page-chrome";
import { ListPageShell } from "@/components/business/list-page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, RefreshCwIcon } from "@/components/ui/icons";

const meta = {
  title: "Business/PageChrome",
  component: PageChrome,
  tags: ["autodocs", "a11y"],
  parameters: {
    docs: {
      description: {
        component:
          "Page-type density chrome (issue #44). `list` hides the in-page title; `document` uses compact header; `overview` keeps the display header.",
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

export const Document: Story = {
  args: {
    variant: "document",
    title: "Employee detail",
    description: "Edit profile and employment info",
    actions: (
      <>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </>
    ),
    children: (
      <Card>
        <CardContent className="space-y-3 pt-6">
          <p className="text-muted-foreground text-sm">Form fields go here.</p>
        </CardContent>
      </Card>
    ),
  },
};

export const List: Story = {
  args: {
    variant: "list",
    actions: (
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
    ),
    children: (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            List body (table) — no in-page h1.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const ListWithShell: Story = {
  name: "List + ListPageShell",
  args: {
    variant: "list",
    actions: (
      <Button size="sm">
        <PlusIcon className="mr-1 size-4" />
        新增员工
      </Button>
    ),
    children: (
      <Card>
        <CardContent className="p-0">
          <div className="p-4">
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
                <Button variant="outline" size="sm">
                  导出
                </Button>
              }
            >
              <div className="text-muted-foreground border-border rounded-md border border-dashed p-8 text-center text-sm">
                SearchTable / data grid
              </div>
            </ListPageShell>
          </div>
        </CardContent>
      </Card>
    ),
  },
};
