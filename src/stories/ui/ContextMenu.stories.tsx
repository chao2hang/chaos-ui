import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

function SelectionOptionsDemo() {
  const [columns, setColumns] = useState({
    owner: true,
    status: true,
    dueDate: false,
  })
  const [density, setDensity] = useState("comfortable")

  const visibleColumns = [
    columns.owner && "Owner",
    columns.status && "Status",
    columns.dueDate && "Due date",
  ].filter(Boolean)

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-44 w-full max-w-80 flex-col items-center justify-center gap-3 rounded-lg border bg-muted/40 p-4 text-center text-sm">
        <span className="font-medium">Right-click table settings</span>
        <span className="text-xs text-muted-foreground">
          {visibleColumns.join(", ")} - {density} density
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Visible columns</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={columns.owner}
            onCheckedChange={(checked) => setColumns((current) => ({ ...current, owner: checked }))}
          >
            Owner
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={columns.status}
            onCheckedChange={(checked) => setColumns((current) => ({ ...current, status: checked }))}
          >
            Status
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={columns.dueDate}
            onCheckedChange={(checked) => setColumns((current) => ({ ...current, dueDate: checked }))}
          >
            Due date
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup
          value={density}
          onValueChange={(value) => setDensity(String(value))}
        >
          <ContextMenuLabel>Density</ContextMenuLabel>
          <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
          <ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem>
          <ContextMenuRadioItem value="spacious">Spacious</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-44 w-72 items-center justify-center rounded-lg border border-dashed bg-muted/50 text-sm text-muted-foreground">
        Right-click this panel
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Document</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem>Duplicate</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-44 w-72 items-center justify-center rounded-lg border bg-card text-sm">
        Right-click for share actions
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy link</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share with</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Product team</ContextMenuItem>
            <ContextMenuItem>Design review</ContextMenuItem>
            <ContextMenuItem>Leadership</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Archive</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const SelectionOptions: Story = {
  render: () => <SelectionOptionsDemo />,
}

