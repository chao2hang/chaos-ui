import type { Meta, StoryObj } from "@storybook/react";
import { Cascader } from "@/components/ui/cascader";
import type { CascaderOption } from "@/components/ui/cascader";

const meta = {
  title: "Components/Cascader",
  component: Cascader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Cascader>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const regionOptions: CascaderOption[] = [
  {
    value: "cn",
    label: "中国",
    children: [
      {
        value: "shanghai",
        label: "上海",
        children: [
          { value: "pudong", label: "浦东新区" },
          { value: "huangpu", label: "黄浦区" },
        ],
      },
      {
        value: "beijing",
        label: "北京",
        children: [
          { value: "chaoyang", label: "朝阳区" },
          { value: "haidian", label: "海淀区" },
        ],
      },
    ],
  },
  {
    value: "us",
    label: "United States",
    children: [
      {
        value: "ca",
        label: "California",
        children: [
          { value: "sf", label: "San Francisco" },
          { value: "la", label: "Los Angeles" },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default cascader with region hierarchy. */
export const Default: Story = {
  args: {
    options: regionOptions,
    placeholder: "Select region",
    onChange: noop,
  },
};

/** Pre-selected path (cn → shanghai → pudong). */
export const WithValue: Story = {
  args: {
    options: regionOptions,
    value: ["cn", "shanghai", "pudong"],
    onChange: noop,
  },
};

/** `changeOnSelect` — selecting any level fires onChange. */
export const ChangeOnSelect: Story = {
  args: {
    options: regionOptions,
    changeOnSelect: true,
    placeholder: "Select any level",
    onChange: noop,
  },
};

/** Disabled state. */
export const Disabled: Story = {
  args: {
    options: regionOptions,
    value: ["cn", "beijing", "chaoyang"],
    disabled: true,
  },
};
