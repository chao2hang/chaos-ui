import type { Meta, StoryObj } from "@storybook/react";
import { TreeSelect, type TreeNode } from "@/components/ui/tree-select";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/business/page-header";
import { PlusIcon, RefreshCwIcon } from "@/components/ui/icons";
import { useState } from "react";

const sampleData: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      { id: "1-1", label: "Work" },
      { id: "1-2", label: "Personal" },
    ],
  },
  {
    id: "2",
    label: "Images",
    children: [
      { id: "2-1", label: "Photo1.jpg" },
      { id: "2-2", label: "Photo2.png" },
    ],
  },
];

const companyTree: TreeNode[] = [
  {
    id: "hq",
    label: "Headquarters",
    children: [
      { id: "cn", label: "China Branch" },
      { id: "us", label: "US Branch" },
    ],
  },
];

const meta = {
  title: "Components/TreeSelect",
  component: TreeSelect,
  tags: ["autodocs", "a11y"],
  argTypes: {
    size: { control: "select", options: ["sm", "default"] },
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj;

function DefaultTreeSelect() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div className="w-[300px]">
      <TreeSelect
        data={sampleData}
        value={value as string}
        onChange={(next) => setValue(Array.isArray(next) ? undefined : next)}
        placeholder="Select..."
      />
    </div>
  );
}

function MultipleTreeSelect() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="w-[300px]">
      <TreeSelect
        data={sampleData}
        value={value}
        onChange={(next) =>
          setValue(Array.isArray(next) ? next : next ? [next] : [])
        }
        multiple
        placeholder="Select items..."
      />
    </div>
  );
}

function SizeSmTreeSelect() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div className="flex items-center gap-2">
      <div className="w-[220px]">
        <TreeSelect
          data={sampleData}
          size="sm"
          value={value as string}
          onChange={(next) => setValue(Array.isArray(next) ? undefined : next)}
          placeholder="Filter tree..."
        />
      </div>
      <Button size="sm" variant="outline">
        Refresh
      </Button>
      <Button size="sm">Add</Button>
    </div>
  );
}

function PageHeaderActionsTreeSelect() {
  const [company, setCompany] = useState<string | undefined>();
  return (
    <PageHeader
      title="Departments"
      description="Filter by company tree alongside sm toolbar actions (#28)"
      actions={
        <>
          <div className="w-[200px]">
            <TreeSelect
              data={companyTree}
              size="sm"
              value={company as string}
              onChange={(next) =>
                setCompany(Array.isArray(next) ? undefined : next)
              }
              placeholder="Company"
            />
          </div>
          <Button size="sm" variant="outline">
            <RefreshCwIcon className="mr-1 size-3.5" />
            Sync
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-1 size-3.5" />
            New
          </Button>
        </>
      }
    />
  );
}

export const Default: Story = {
  render: () => <DefaultTreeSelect />,
};

export const Multiple: Story = {
  render: () => <MultipleTreeSelect />,
};

export const WithDefault: Story = {
  args: {
    data: sampleData,
    defaultValue: "1-1",
  },
};

/** Aligns with Button/SelectTrigger size="sm" (h-7) — issue #28 */
export const SizeSm: Story = {
  render: () => <SizeSmTreeSelect />,
};

/** PageHeader actions: TreeSelect sm + Button sm row */
export const WithPageHeaderActions: Story = {
  render: () => <PageHeaderActionsTreeSelect />,
};
