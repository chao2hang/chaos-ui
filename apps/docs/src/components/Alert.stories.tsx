import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, AlertTriangleIcon } from "lucide-react"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <AlertCircleIcon />,
    children: (
      <>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </>
    ),
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: <AlertCircleIcon />,
    children: (
      <>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </>
    ),
  },
}

export const Success: Story = {
  args: {
    variant: "success",
    icon: <CheckCircle2Icon />,
    children: (
      <>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </>
    ),
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    icon: <AlertTriangleIcon />,
    children: (
      <>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your storage is almost full.</AlertDescription>
      </>
    ),
  },
}

export const Info: Story = {
  args: {
    variant: "info",
    icon: <InfoIcon />,
    children: (
      <>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>A new version is available for download.</AlertDescription>
      </>
    ),
  },
}

export const WithoutIcon: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>This alert has no icon.</AlertDescription>
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Alert variant="default" icon={<AlertCircleIcon />}>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Default alert message.</AlertDescription>
      </Alert>
      <Alert variant="info" icon={<InfoIcon />}>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Informational message.</AlertDescription>
      </Alert>
      <Alert variant="success" icon={<CheckCircle2Icon />}>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Success message.</AlertDescription>
      </Alert>
      <Alert variant="warning" icon={<AlertTriangleIcon />}>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warning message.</AlertDescription>
      </Alert>
      <Alert variant="destructive" icon={<AlertCircleIcon />}>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error message.</AlertDescription>
      </Alert>
    </div>
  ),
}
