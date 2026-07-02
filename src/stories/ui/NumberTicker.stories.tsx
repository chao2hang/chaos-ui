import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberTicker } from "@/components/ui/number-ticker";

const meta = {
  title: "Components/NumberTicker",
  component: NumberTicker,
  tags: ["autodocs", "a11y"],
  argTypes: {
    value: {
      control: { type: "number" },
      description: "Target number to animate to",
    },
    from: {
      control: { type: "number" },
      description: "Starting number",
    },
    duration: {
      control: { type: "number" },
      description: "Animation duration in ms",
    },
    easing: {
      control: { type: "select" },
      options: ["linear", "easeOut", "easeInOut"],
      description: "Easing function",
    },
    decimals: {
      control: { type: "number" },
      description: "Decimal places",
    },
  },
} satisfies Meta<typeof NumberTicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1000,
    duration: 2000,
  },
};

export const WithFormat: Story = {
  args: {} as any,
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="text-lg">
        <span className="mr-2 text-muted-foreground">Revenue:</span>
        <NumberTicker
          value={1250000}
          format={(n) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(n)
          }
          duration={2000}
          className="font-semibold"
        />
      </div>
      <div className="text-lg">
        <span className="mr-2 text-muted-foreground">Growth:</span>
        <NumberTicker
          value={87.5}
          format={(n) => `${n.toFixed(1)}%`}
          duration={2000}
          className="font-semibold text-green-600"
        />
      </div>
    </div>
  ),
};

export const WithPrefixSuffix: Story = {
  args: {} as any,
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="text-lg">
        <NumberTicker
          value={9999}
          prefix="$"
          duration={2000}
          className="font-semibold"
        />
      </div>
      <div className="text-lg">
        <NumberTicker
          value={42.8}
          decimals={1}
          suffix="%"
          duration={2000}
          className="font-semibold text-blue-600"
        />
      </div>
      <div className="text-lg">
        <NumberTicker
          value={350}
          prefix="About "
          suffix=" users online"
          duration={2000}
          className="font-semibold"
        />
      </div>
    </div>
  ),
};

export const EasingVariants: Story = {
  args: {} as any,
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm text-muted-foreground">Linear</span>
        <NumberTicker
          value={100}
          easing="linear"
          duration={2000}
          className="text-2xl font-bold"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm text-muted-foreground">Ease Out</span>
        <NumberTicker
          value={100}
          easing="easeOut"
          duration={2000}
          className="text-2xl font-bold"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm text-muted-foreground">Ease In Out</span>
        <NumberTicker
          value={100}
          easing="easeInOut"
          duration={2000}
          className="text-2xl font-bold"
        />
      </div>
    </div>
  ),
};

function ReAnimateDemo() {
  const [value, setValue] = React.useState(100);

  return (
    <div className="flex flex-col gap-4">
      <NumberTicker
        value={value}
        reAnimate
        duration={1000}
        className="text-4xl font-bold"
      />
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-lg border bg-background px-3 py-1.5 text-sm hover:bg-muted"
          onClick={() => setValue((v) => v + Math.floor(Math.random() * 50))}
        >
          Increase
        </button>
        <button
          type="button"
          className="rounded-lg border bg-background px-3 py-1.5 text-sm hover:bg-muted"
          onClick={() =>
            setValue((v) => Math.max(0, v - Math.floor(Math.random() * 50)))
          }
        >
          Decrease
        </button>
        <button
          type="button"
          className="rounded-lg border bg-background px-3 py-1.5 text-sm hover:bg-muted"
          onClick={() => setValue(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export const ReAnimate: Story = {
  args: {} as any,
  render: () => <ReAnimateDemo />,
};

export const LargeNumber: Story = {
  args: {
    value: 1234567,
    from: 0,
    duration: 3000,
    format: (n: number) =>
      new Intl.NumberFormat("en-US").format(Math.round(n)),
    className: "text-4xl font-bold tracking-tight",
  },
};

export const ReducedMotion: Story = {
  args: {
    value: 500,
    duration: 2000,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `prefers-reduced-motion: reduce` is active, the ticker shows the final value immediately without animation. Toggle reduced motion in your OS/browser settings to see the difference.",
      },
    },
  },
};
