import type { Meta, StoryObj } from "@storybook/react";
import { Direction } from "@/components/ui/direction";

const meta: Meta<typeof Direction> = {
  title: "Components/Direction",
  component: Direction,
  tags: ["autodocs", "a11y"],
  argTypes: {
    dir: {
      control: "radio",
      options: ["ltr", "rtl"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Direction>;

export const LTR: Story = {
  args: {
    dir: "ltr",
    children: (
      <div className="space-y-2 rounded-lg border p-4">
        <h3 className="font-semibold">Left-to-Right (Default)</h3>
        <p>
          This text flows from left to right. Numbers and punctuation follow LTR
          conventions.
        </p>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>← Previous</span>
          <span className="mx-2">|</span>
          <span>Next →</span>
        </div>
      </div>
    ),
  },
};

export const RTL: Story = {
  args: {
    dir: "rtl",
    children: (
      <div className="space-y-2 rounded-lg border p-4">
        <h3 className="font-semibold">Right-to-Left (Arabic example)</h3>
        <p className="text-lg" lang="ar">
          مرحبا بالعالم — هذا نص تجريبي باللغة العربية
        </p>
        <p className="text-muted-foreground text-sm" lang="ar">
          يدعم المكون الاتجاه من اليمين إلى اليسار للغات مثل العربية والعبرية
          والفارسية
        </p>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>→ السابق</span>
          <span className="mx-2">|</span>
          <span>التالي ←</span>
        </div>
      </div>
    ),
  },
};

export const MixedContent: Story = {
  render: () => (
    <div className="space-y-4">
      <Direction dir="ltr">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">English Section (LTR)</h3>
          <p>This is a left-to-right section.</p>
        </div>
      </Direction>
      <Direction dir="rtl">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold" lang="ar">
            القسم العربي (RTL)
          </h3>
          <p lang="ar">هذا قسم من اليمين إلى اليسار.</p>
        </div>
      </Direction>
    </div>
  ),
};
