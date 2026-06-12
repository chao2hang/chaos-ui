import type { Meta, StoryObj } from "@storybook/react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Layout direction of the panels",
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ label }: { label: string }) => (
  <div className="flex h-full w-full items-center justify-center rounded-md border bg-muted/40 text-sm font-medium">
    {label}
  </div>
)

export const Default: Story = {
  name: "Horizontal (Default)",
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-64 w-full max-w-2xl rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <ResizableHandle withHandle />
        <Box label="Left" />
      </ResizablePanel>
      <ResizablePanel defaultSize={50}>
        <Box label="Right" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="h-72 w-full max-w-2xl rounded-lg border">
      <ResizablePanel defaultSize={40}>
        <ResizableHandle withHandle />
        <Box label="Top" />
      </ResizablePanel>
      <ResizablePanel defaultSize={60}>
        <Box label="Bottom" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const ThreeColumns: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-64 w-full max-w-3xl rounded-lg border">
      <ResizablePanel defaultSize={25} minSize={15}>
        <ResizableHandle withHandle />
        <Box label="Sidebar" />
      </ResizablePanel>
      <ResizablePanel defaultSize={50} minSize={20}>
        <ResizableHandle withHandle />
        <Box label="Main" />
      </ResizablePanel>
      <ResizablePanel defaultSize={25} minSize={15}>
        <Box label="Inspector" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Collapsible: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-64 w-full max-w-2xl rounded-lg border">
      <ResizablePanel defaultSize={30} collapsible collapsedSize={5} minSize={20}>
        <ResizableHandle withHandle />
        <Box label="Collapsible" />
      </ResizablePanel>
      <ResizablePanel defaultSize={70}>
        <Box label="Main" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ResizablePanelGroup direction="horizontal" className="h-32 w-full max-w-2xl rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <ResizableHandle withHandle />
          <Box label="50 / 50" />
        </ResizablePanel>
        <ResizablePanel defaultSize={50}>
          <Box label="50" />
        </ResizablePanel>
      </ResizablePanelGroup>
      <ResizablePanelGroup direction="vertical" className="h-48 w-full max-w-2xl rounded-lg border">
        <ResizablePanel defaultSize={30}>
          <ResizableHandle withHandle />
          <Box label="Top" />
        </ResizablePanel>
        <ResizablePanel defaultSize={70}>
          <Box label="Bottom" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark w-full max-w-2xl">
      <ResizablePanelGroup direction="horizontal" className="h-64 rounded-lg border">
        <ResizablePanel defaultSize={30}>
          <ResizableHandle withHandle />
          <Box label="Left" />
        </ResizablePanel>
        <ResizablePanel defaultSize={70}>
          <Box label="Right" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}
