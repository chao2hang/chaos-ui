import type { Meta, StoryObj } from "@storybook/react";
import { Pencil, Trash2, KeyRound } from "lucide-react";
import { RowActionsMenu } from "@/components/ui/row-actions-menu";
import type { RowMenuItem } from "@/components/ui/row-context-menu";

const sampleItems: RowMenuItem[] = [
  {
    key: "edit",
    label: "编辑",
    icon: <Pencil className="size-3.5" />,
    onClick: () => undefined,
  },
  {
    key: "delete",
    label: "删除",
    icon: <Trash2 className="size-3.5" />,
    danger: true,
    onClick: () => undefined,
  },
  { key: "sep-1", label: "", separator: true },
  {
    key: "reset",
    label: "重置密码",
    icon: <KeyRound className="size-3.5" />,
    disabled: true,
    onClick: () => undefined,
  },
];

const meta = {
  title: "Components/RowActionsMenu",
  component: RowActionsMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof RowActionsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default link trigger「操作」for table action columns (issue #52). */
export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

/** Custom trigger label. */
export const CustomLabel: Story = {
  args: {
    items: sampleItems,
    triggerLabel: "更多",
  },
};

/** In a fixed-width action column mock. */
export const InActionColumn: Story = {
  args: {
    items: sampleItems,
  },
  decorators: [
    (Story) => (
      <div className="border-border flex w-24 justify-end border p-2">
        <Story />
      </div>
    ),
  ],
};
