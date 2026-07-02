import type { Meta, StoryObj } from "@storybook/react";
import { LeadPipelineBoard } from "@/components/business/lead-pipeline-board";
import type { PipelineStage, Deal } from "@/components/business/lead-pipeline-board";

const meta = {
  title: "Business/LeadPipelineBoard",
  component: LeadPipelineBoard,
  tags: ["autodocs"],
} satisfies Meta<typeof LeadPipelineBoard>;
export default meta;
type Story = StoryObj<typeof meta>;

const stages: PipelineStage[] = [
  { id: "s1", label: "New Lead", probability: 10, color: "blue" },
  { id: "s2", label: "Qualified", probability: 25, color: "indigo" },
  { id: "s3", label: "Proposal Sent", probability: 50, color: "violet" },
  { id: "s4", label: "Negotiation", probability: 75, color: "amber" },
  { id: "s5", label: "Closed Won", probability: 100, color: "emerald" },
];

const deals: Deal[] = [
  { id: "d1", customer: "Acme Corp", title: "ERP Annual License", value: 250000, stageId: "s1", owner: "Alice Wang", priority: "high", expectedClose: "2026-08-15" },
  { id: "d2", customer: "Globex Inc", title: "Cloud Migration", value: 180000, stageId: "s1", owner: "Bob Li", priority: "medium", expectedClose: "2026-09-01" },
  { id: "d3", customer: "Initech LLC", title: "Consulting Package", value: 95000, stageId: "s2", owner: "Carol Zhang", priority: "medium", expectedClose: "2026-07-30" },
  { id: "d4", customer: "Umbrella Co", title: "Hardware Supply", value: 320000, stageId: "s3", owner: "Dave Chen", priority: "high", expectedClose: "2026-07-20" },
  { id: "d5", customer: "Stark Industries", title: "R&D Platform", value: 560000, stageId: "s4", owner: "Eve Liu", priority: "high", expectedClose: "2026-07-15" },
  { id: "d6", customer: "Wayne Enterprises", title: "Security Suite", value: 145000, stageId: "s5", owner: "Frank Wu", priority: "low", expectedClose: "2026-06-30" },
  { id: "d7", customer: "Cyberdyne Systems", title: "AI Infrastructure", value: 420000, stageId: "s2", owner: "Grace Sun", priority: "high", expectedClose: "2026-08-01" },
  { id: "d8", customer: "Tyrell Corp", title: "Data Platform", value: 210000, stageId: "s3", owner: "Henry Zhao", priority: "medium", expectedClose: "2026-08-10" },
];

export const Default: Story = {
  args: { stages, deals, currencySymbol: "¥" },
};

export const ReadOnly: Story = {
  args: { ...Default.args, readOnly: true },
};

export const Usd: Story = {
  args: { stages, deals: deals.map((d) => ({ ...d, value: Math.round(d.value / 7) })), currencySymbol: "$" },
};

export const Empty: Story = {
  args: { stages, deals: [] },
};
