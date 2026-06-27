import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Tour, type TourStep } from "@/components/business/tour"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tourSteps: TourStep[] = [
  {
    target: "#tour-create-campaign",
    title: "Create campaigns",
    description: "Start a new campaign from the primary action in the workspace header.",
    placement: "bottom",
  },
  {
    target: "#tour-kpi-card",
    title: "Watch performance",
    description: "Key metrics update as your campaign moves through review and launch.",
    placement: "right",
  },
  {
    target: "#tour-audience-card",
    title: "Refine the audience",
    description: "Use saved filters and segments before scheduling messages.",
    placement: "top",
  },
]

const meta = {
  title: "Business/Tour",
  component: Tour,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof Tour>

export default meta
type Story = StoryObj<typeof meta>
type TourProps = React.ComponentProps<typeof Tour>

function TourDemo(args: TourProps) {
  const [open, setOpen] = React.useState(args.open ?? true)
  const [status, setStatus] = React.useState("Tour is ready.")

  return (
    <div className="min-h-[460px] space-y-6 p-6">
      <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-4">
        <div>
          <h3 className="text-sm font-semibold">Campaign workspace</h3>
          <p className="text-xs text-muted-foreground">A compact surface for onboarding flow demos.</p>
        </div>
        <Button id="tour-create-campaign" onClick={() => setOpen(true)}>
          Create campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card id="tour-kpi-card">
          <CardHeader>
            <CardTitle className="text-base">Revenue lift</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">18.4%</p>
            <p className="text-xs text-muted-foreground">Compared with the previous period.</p>
          </CardContent>
        </Card>

        <Card id="tour-audience-card">
          <CardHeader>
            <CardTitle className="text-base">Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">24.8k</p>
            <p className="text-xs text-muted-foreground">Reachable customers after suppression rules.</p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">{status}</p>

      <Tour
        {...args}
        open={open}
        onOpenChange={setOpen}
        onComplete={() => {
          setStatus("Tour completed.")
          args.onComplete?.()
        }}
        onSkip={() => {
          setStatus("Tour skipped.")
          args.onSkip?.()
        }}
      />
    </div>
  )
}

export const Default: Story = {
  args: {
    steps: tourSteps,
  },
  render: (args) => <TourDemo {...args} />,
}

export const ManualStart: Story = {
  args: {
    steps: tourSteps,
    open: false,
  },
  render: (args) => <TourDemo {...args} />,
}

export const SingleStep: Story = {
  args: {
    steps: [
      {
        target: "#tour-create-campaign",
        title: "Primary action",
        description: "A single-step tour can spotlight a focused change.",
        placement: "bottom",
      },
    ],
  },
  render: (args) => <TourDemo {...args} />,
}

