import type { Meta, StoryObj } from "@storybook/react";
import { SupplierScorecard } from "@/components/business/supplier-scorecard";
import type { Supplier } from "@/components/business/supplier-scorecard";

const meta = {
  title: "Business/SupplierScorecard",
  component: SupplierScorecard,
  tags: ["autodocs"],
} satisfies Meta<typeof SupplierScorecard>;

export default meta;
type Story = StoryObj<typeof meta>;

const topSupplier: Supplier = {
  id: "1",
  name: "Shenzhen TechFab Electronics",
  code: "SUP-2026-001",
  category: "Electronic Components",
  period: "2026 Q2",
  previousScore: 91,
  criteria: [
    { id: "q", name: "Quality", score: 95, weight: 30, trend: "up", comment: "Defect rate dropped to 0.3%" },
    { id: "d", name: "On-Time Delivery", score: 92, weight: 25, trend: "up" },
    { id: "p", name: "Price Competitiveness", score: 88, weight: 20, trend: "stable" },
    { id: "s", name: "Service & Support", score: 90, weight: 15, trend: "stable" },
    { id: "c", name: "Compliance", score: 97, weight: 10, trend: "up", comment: "ISO 9001 recertified" },
  ],
};

const averageSupplier: Supplier = {
  id: "2",
  name: "Jiangsu Precision Parts Co.",
  code: "SUP-2026-042",
  category: "Precision Machining",
  period: "2026 Q2",
  previousScore: 72,
  criteria: [
    { id: "q", name: "Quality", score: 78, weight: 30, trend: "stable", comment: "Minor quality issues in May batch" },
    { id: "d", name: "On-Time Delivery", score: 65, weight: 25, trend: "down", comment: "3 late deliveries this quarter" },
    { id: "p", name: "Price Competitiveness", score: 82, weight: 20, trend: "up" },
    { id: "s", name: "Service & Support", score: 70, weight: 15, trend: "stable" },
    { id: "c", name: "Compliance", score: 85, weight: 10, trend: "stable" },
  ],
};

const poorSupplier: Supplier = {
  id: "3",
  name: "Guangzhou Materials Ltd.",
  code: "SUP-2025-188",
  category: "Raw Materials",
  period: "2026 Q2",
  previousScore: 58,
  criteria: [
    { id: "q", name: "Quality", score: 52, weight: 30, trend: "down", comment: "Multiple defect reports" },
    { id: "d", name: "On-Time Delivery", score: 48, weight: 25, trend: "down", comment: "Chronic delays" },
    { id: "p", name: "Price Competitiveness", score: 70, weight: 20, trend: "stable" },
    { id: "s", name: "Service & Support", score: 55, weight: 15, trend: "down" },
    { id: "c", name: "Compliance", score: 60, weight: 10, trend: "stable" },
  ],
};

/** Top-performing supplier with excellent scores. */
export const TopPerformer: Story = {
  args: { supplier: topSupplier },
};

/** Average supplier with mixed results. */
export const AveragePerformer: Story = {
  args: { supplier: averageSupplier },
};

/** Underperforming supplier requiring attention. */
export const PoorPerformer: Story = {
  args: { supplier: poorSupplier },
};

/** Compact view without bars. */
export const NoBars: Story = {
  args: { supplier: topSupplier, showBars: false },
};
