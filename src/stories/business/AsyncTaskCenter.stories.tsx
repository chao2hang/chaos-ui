import type { Meta, StoryObj } from "@storybook/react";
import { AsyncTaskCenter, type AsyncTask } from "@/components/business/async-task-center";

const tasks: AsyncTask[] = [
  { id: "1", type: "export", title: "Export orders", status: "running", progress: 65, createdAt: new Date() },
  { id: "2", type: "import", title: "Import contacts", status: "completed", progress: 100, createdAt: new Date() },
  { id: "3", type: "report", title: "Generate report", status: "failed", progress: 30, createdAt: new Date() },
  { id: "4", type: "update", title: "Bulk update", status: "pending", progress: 0, createdAt: new Date() },
];

const noop = () => {};
const meta = { title: "Business/Forms/AsyncTaskCenter", component: AsyncTaskCenter, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, tasks: [] } } satisfies Meta<typeof AsyncTaskCenter>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { tasks } };
export const Empty: Story = { args: { tasks: [] } };
export const WithCallbacks: Story = { args: { tasks, onRetryTask: (id) => { void id; }, onCancelTask: (id) => { void id; } } };
