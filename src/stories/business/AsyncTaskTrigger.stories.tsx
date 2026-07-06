import type { Meta, StoryObj } from "@storybook/react";
import { AsyncTaskTrigger } from "@/components/business/async-task-trigger";

const meta = { title: "Business/Forms/AsyncTaskTrigger", component: AsyncTaskTrigger, tags: ["autodocs"], parameters: { layout: "padded" }, args: { taskType: "export" } } satisfies Meta<typeof AsyncTaskTrigger>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithParams: Story = { args: { taskType: "import", params: { format: "csv" }, children: "Import contacts" } };
export const WithCallback: Story = { args: { taskType: "report", onComplete: (result) => { void result; }, children: "Generate report" } };
