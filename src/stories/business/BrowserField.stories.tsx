import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  BrowserField,
  type BrowseItem,
} from "@/components/business/browser-field";

const meta: Meta<typeof BrowserField> = {
  title: "Business/BrowserField",
  component: BrowserField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "表单级浏览字段（对齐 Ecology WeaBrowser）：弹层 + 多选 + 联想。内部复用 BrowseDialog。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrowserField>;

interface MockEmployee extends BrowseItem {
  name: string;
  code: string;
  department: string;
}

const mockItems: MockEmployee[] = Array.from({ length: 30 }, (_, i) => ({
  id: `emp-${i + 1}`,
  name: `员工 ${String(i + 1).padStart(2, "0")}`,
  code: `E${String(i + 1).padStart(3, "0")}`,
  department: i % 3 === 0 ? "技术部" : i % 3 === 1 ? "市场部" : "财务部",
}));

const columns = [
  { key: "id", title: "ID", width: 80 },
  { key: "name", title: "姓名" },
  { key: "code", title: "工号", width: 120 },
  { key: "department", title: "部门", width: 100 },
];

const loadData = async (params: {
  keyword: string;
  page: number;
  pageSize: number;
}) => {
  await new Promise((r) => setTimeout(r, 300));
  const filtered = mockItems.filter(
    (item) =>
      !params.keyword ||
      item.name.includes(params.keyword) ||
      item.code.includes(params.keyword),
  );
  const start = (params.page - 1) * params.pageSize;
  return {
    rows: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  };
};

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    const [labels, setLabels] = useState<{ id: string; label: string }[]>([]);
    return (
      <div className="max-w-md space-y-4">
        <BrowserField<MockEmployee>
          title="选择员工"
          columns={columns}
          loadData={loadData}
          value={value}
          labels={labels}
          onChange={(val, items) => {
            setValue(Array.isArray(val) ? (val[0] ?? "") : val);
            setLabels(items.map((i) => ({ id: String(i.id), label: i.name })));
          }}
          placeholder="请选择员工"
        />
        <pre className="text-muted-foreground text-xs">
          value: {JSON.stringify(value)}
        </pre>
      </div>
    );
  },
};

export const MultipleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [labels, setLabels] = useState<{ id: string; label: string }[]>([]);
    return (
      <div className="max-w-md space-y-4">
        <BrowserField<MockEmployee>
          title="选择员工（多选）"
          columns={columns}
          loadData={loadData}
          multiple
          value={value}
          labels={labels}
          onChange={(val, items) => {
            setValue(Array.isArray(val) ? val : [val]);
            setLabels(items.map((i) => ({ id: String(i.id), label: i.name })));
          }}
          placeholder="请选择员工（可多选）"
        />
        <pre className="text-muted-foreground text-xs">
          {JSON.stringify(value)}
        </pre>
      </div>
    );
  },
};

export const WithAutocomplete: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    const [labels, setLabels] = useState<{ id: string; label: string }[]>([]);
    return (
      <div className="max-w-md space-y-4">
        <BrowserField<MockEmployee>
          title="选择员工"
          columns={columns}
          loadData={loadData}
          complete={async (keyword) => {
            return mockItems
              .filter(
                (i) => i.name.includes(keyword) || i.code.includes(keyword),
              )
              .slice(0, 5);
          }}
          value={value}
          labels={labels}
          onChange={(val, items) => {
            setValue(Array.isArray(val) ? (val[0] ?? "") : val);
            setLabels(items.map((i) => ({ id: String(i.id), label: i.name })));
          }}
          placeholder="输入关键字联想…"
        />
      </div>
    );
  },
};
