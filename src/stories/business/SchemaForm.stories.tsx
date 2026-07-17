import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SchemaForm, type FormSchema } from "@/components/business/schema-form";

const meta: Meta<typeof SchemaForm> = {
  title: "Business/SchemaForm",
  component: SchemaForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "JSON/配置驱动表单（对齐 Ecology WeaForm）：按 schema 渲染字段，支持分组、联动、校验。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SchemaForm>;

const basicSchema: FormSchema = {
  fields: [
    {
      name: "name",
      label: "名称",
      type: "text",
      required: true,
      placeholder: "请输入名称",
    },
    { name: "code", label: "编码", type: "text", placeholder: "请输入编码" },
    {
      name: "category",
      label: "分类",
      type: "select",
      options: [
        { label: "类型 A", value: "a" },
        { label: "类型 B", value: "b" },
      ],
    },
    { name: "amount", label: "金额", type: "number", placeholder: "0.00" },
    { name: "active", label: "启用", type: "switch" },
    { name: "remark", label: "备注", type: "textarea", colSpan: 2 },
  ],
};

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<Record<string, unknown>>({});
    return (
      <div className="max-w-2xl space-y-4">
        <SchemaForm schema={basicSchema} value={value} onChange={setValue} />
        <pre className="text-muted-foreground text-xs">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    );
  },
};

const groupedSchema: FormSchema = {
  groups: [
    {
      key: "base",
      title: "基本信息",
      fields: [
        { name: "name", label: "名称", type: "text", required: true },
        { name: "code", label: "编码", type: "text" },
      ],
    },
    {
      key: "extra",
      title: "扩展信息",
      collapsed: true,
      fields: [
        { name: "amount", label: "金额", type: "number" },
        { name: "remark", label: "备注", type: "textarea", colSpan: 2 },
      ],
    },
  ],
};

export const Grouped: Story = {
  render: () => (
    <div className="max-w-2xl">
      <SchemaForm schema={groupedSchema} />
    </div>
  ),
};

const dependencySchema: FormSchema = {
  fields: [
    {
      name: "country",
      label: "国家",
      type: "select",
      options: [
        { label: "中国", value: "cn" },
        { label: "美国", value: "us" },
      ],
    },
    {
      name: "city",
      label: "城市",
      type: "select",
      options: [],
      dependencies: [
        {
          name: "country",
          when: "cn",
          then: {
            options: [
              { label: "北京", value: "bj" },
              { label: "上海", value: "sh" },
            ],
          },
        },
      ],
    },
  ],
};

export const WithDependencies: Story = {
  render: () => (
    <div className="max-w-2xl">
      <SchemaForm schema={dependencySchema} />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const schema: FormSchema = {
      fields: [
        {
          name: "email",
          label: "邮箱",
          type: "text",
          required: true,
          rules: [
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "请输入有效邮箱",
            },
          ],
        },
      ],
    };
    return (
      <div className="max-w-2xl">
        <SchemaForm schema={schema} onSubmit={() => alert("提交成功")} />
      </div>
    );
  },
};
