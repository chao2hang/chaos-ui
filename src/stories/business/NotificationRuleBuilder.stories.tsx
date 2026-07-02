import type { Meta, StoryObj } from "@storybook/react";
import { NotificationRuleBuilder } from "@/components/business/notification-rule-builder";
import type { NotificationRule } from "@/components/business/notification-rule-builder";

const meta = {
  title: "Business/NotificationRuleBuilder",
  component: NotificationRuleBuilder,
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationRuleBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

const recipientOptions = [
  { type: "user" as const, label: "Alice Chen", value: "u1" },
  { type: "user" as const, label: "Bob Smith", value: "u2" },
  { type: "user" as const, label: "Carol Wu", value: "u3" },
  { type: "role" as const, label: "Sales Manager", value: "sales_mgr" },
  { type: "role" as const, label: "Finance Team", value: "finance" },
  { type: "group" as const, label: "All Staff", value: "all" },
  { type: "group" as const, label: "Department Heads", value: "dept_heads" },
];

const templates = [
  { id: "t1", name: "Order Alert Template" },
  { id: "t2", name: "Urgent Notification" },
  { id: "t3", name: "Daily Summary" },
];

const defaultRule: NotificationRule = {
  id: "1",
  name: "High Value Order Alert",
  event: "order.created",
  enabled: true,
  conditions: [
    { id: "c1", field: "amount", operator: "gt", value: "10000" },
    { id: "c2", field: "status", operator: "eq", value: "pending" },
  ],
  recipients: [
    { id: "r1", type: "role", target: "sales_mgr" },
    { id: "r2", type: "user", target: "u1" },
  ],
  channels: ["email", "inApp"],
  templateId: "t1",
  priority: "high",
};

/** Default rule builder with conditions, recipients, and channels. */
export const Default: Story = {
  args: {
    rule: defaultRule,
    recipientOptions,
    templates,
  },
};

/** Simple rule with no conditions. */
export const NoConditions: Story = {
  args: {
    rule: {
      ...defaultRule,
      id: "2",
      name: "Task Assignment Notification",
      event: "task.assigned",
      conditions: [],
      channels: ["inApp"],
      priority: "normal",
    },
    recipientOptions,
    templates,
  },
};

/** Disabled rule. */
export const Disabled: Story = {
  args: {
    rule: { ...defaultRule, enabled: false, name: "Disabled Rule Example" },
    recipientOptions,
    templates,
  },
};

/** Multi-channel rule with all channels enabled. */
export const AllChannels: Story = {
  args: {
    rule: {
      ...defaultRule,
      name: "Critical Stock Alert",
      event: "stock.low",
      channels: ["email", "sms", "inApp", "webhook"],
      priority: "urgent",
      conditions: [{ id: "c1", field: "amount", operator: "lt", value: "100" }],
    },
    recipientOptions,
    templates,
  },
};

/** Read-only view of a rule. */
export const ReadOnly: Story = {
  args: {
    rule: defaultRule,
    recipientOptions,
    templates,
    readOnly: true,
  },
};
