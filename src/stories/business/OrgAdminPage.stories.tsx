import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { OrgAdminPage } from "@/components/business/org-admin-page";
import { Button } from "@/components/ui/button";
import type { OrgAdminTreeNode } from "@/components/business/org-admin-page";

const sampleTree: OrgAdminTreeNode[] = [
  {
    id: "hq",
    label: "集团总部",
    count: 128,
    children: [
      {
        id: "eng",
        label: "工程中心",
        count: 42,
        badges: (
          <span className="rounded bg-blue-500/10 px-1 text-[10px] text-blue-600">
            OA
          </span>
        ),
        children: [
          { id: "fe", label: "前端组", count: 8 },
          { id: "be", label: "后端组", count: 12 },
        ],
      },
      {
        id: "hr",
        label: "人力资源",
        count: 15,
        readOnly: true,
      },
      { id: "fin", label: "财务部", count: 9 },
    ],
  },
];

const meta = {
  title: "Business/Org/OrgAdminPage",
  component: OrgAdminPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "组织管理台（#49）：左树 + 右摘要/Tabs。分类 CRUD 用 TreeCrudPage；超大字典懒加载表用 TreeTable + onExpandRow（#50）。",
      },
    },
  },
} satisfies Meta<typeof OrgAdminPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [id, setId] = React.useState<string | undefined>("eng");
    return (
      <div className="h-[560px] p-4">
        <OrgAdminPage
          treeData={sampleTree}
          {...(id !== undefined ? { selectedId: id } : {})}
          onSelect={(next) => setId(next)}
          filterSlot={
            <select className="border-input h-7 rounded-md border px-2 text-sm">
              <option>默认公司</option>
            </select>
          }
          headerActions={
            <Button size="sm" variant="outline">
              从 OA 同步
            </Button>
          }
          onRefresh={() => {}}
          onCreate={() => {}}
          summary={
            <div className="space-y-1">
              <p className="text-base font-semibold">
                {sampleTree[0]?.children?.find((c) => c.id === id)?.label ?? id}
              </p>
              <p className="text-muted-foreground text-sm">
                组织节点摘要槽 — 编码 / 负责人 / 状态由业务填充
              </p>
            </div>
          }
          tabs={[
            {
              key: "members",
              label: "成员",
              children: (
                <p className="text-muted-foreground p-2 text-sm">成员表格槽</p>
              ),
            },
            {
              key: "children",
              label: "下级部门",
              children: (
                <p className="text-muted-foreground p-2 text-sm">
                  下级部门表槽
                </p>
              ),
            },
            {
              key: "audit",
              label: "变更记录",
              children: (
                <p className="text-muted-foreground p-2 text-sm">审计日志槽</p>
              ),
            },
          ]}
        />
      </div>
    );
  },
};

export const EmptySelection: Story = {
  render: () => (
    <div className="h-[400px] p-4">
      <OrgAdminPage treeData={sampleTree} emptySelection="请选择左侧组织节点" />
    </div>
  ),
};

export const ReadOnlyBadge: Story = {
  render: () => (
    <div className="h-[400px] p-4">
      <OrgAdminPage
        treeData={sampleTree}
        defaultSelectedId="hr"
        summary={<p className="text-sm">人力资源（只读，来自 OA）</p>}
        tabs={[
          {
            key: "members",
            label: "成员",
            children: <p className="text-sm">只读成员列表</p>,
          },
        ]}
      />
    </div>
  ),
};
