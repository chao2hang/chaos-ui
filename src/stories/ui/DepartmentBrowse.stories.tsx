import type { Meta, StoryObj } from "@storybook/react";
import {
  DepartmentBrowse,
  type Department,
} from "@/components/ui/department-browse";
import { useState } from "react";

const sampleDepartments: Department[] = [
  {
    id: "1",
    name: "Head Office",
    code: "HQ",
    children: [
      {
        id: "1-1",
        name: "Engineering",
        code: "ENG",
        parentId: "1",
        children: [
          { id: "1-1-1", name: "Frontend", code: "FE", parentId: "1-1" },
          { id: "1-1-2", name: "Backend", code: "BE", parentId: "1-1" },
        ],
      },
      { id: "1-2", name: "Design", code: "DES", parentId: "1" },
      { id: "1-3", name: "Marketing", code: "MKT", parentId: "1" },
    ],
  },
];

const meta = {
  title: "Components/DepartmentBrowse",
  component: DepartmentBrowse,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof DepartmentBrowse>;

export default meta;
type Story = StoryObj;

function DefaultDepartmentBrowse() {
  const [value, setValue] = useState<Department | undefined>();
  return (
    <div className="w-[300px]">
      <DepartmentBrowse
        departments={sampleDepartments}
        value={value as Department}
        onChange={(next) => setValue(Array.isArray(next) ? undefined : next)}
        placeholder="Select department..."
      />
    </div>
  );
}

function MultipleDepartmentBrowse() {
  const [value, setValue] = useState<Department[]>([]);
  return (
    <div className="w-[300px]">
      <DepartmentBrowse
        departments={sampleDepartments}
        value={value}
        onChange={(next) =>
          setValue(Array.isArray(next) ? next : next ? [next] : [])
        }
        multiple
        placeholder="Select departments..."
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultDepartmentBrowse />,
};

export const WithDefault: Story = {
  args: {
    departments: sampleDepartments,
    defaultValue: { id: "1-1", name: "Engineering", code: "ENG" },
  },
};

export const Multiple: Story = {
  render: () => <MultipleDepartmentBrowse />,
};

export const Disabled: Story = {
  args: {
    departments: sampleDepartments,
    disabled: true,
  },
};
