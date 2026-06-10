import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  InfoIcon,
  HelpCircleIcon,
  PlusIcon,
  SettingsIcon,
  PencilIcon,
  Trash2Icon,
  SaveIcon,
  UndoIcon,
} from "lucide-react"

export default function TooltipPage() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="font-heading text-3xl font-bold">Tooltip</h1>
          <p className="mt-2 text-muted-foreground">
            A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it.
          </p>
        </div>

        {/* Default */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Default</h2>
            <p className="text-sm text-muted-foreground">Basic tooltip on hover.</p>
          </div>
          <Card>
            <CardContent>
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>
                  Hover me
                </TooltipTrigger>
                <TooltipContent>
                  This is a tooltip
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>
        </section>

        {/* Different Sides */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Sides</h2>
            <p className="text-sm text-muted-foreground">Tooltip positioned on different sides of the trigger.</p>
          </div>
          <Card>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                    Top
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Tooltip on top
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                    Right
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Tooltip on right
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                    Bottom
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Tooltip on bottom
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                    Left
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    Tooltip on left
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* With Icon Trigger */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Icon Triggers</h2>
            <p className="text-sm text-muted-foreground">Tooltips on icon-only buttons for accessible labeling.</p>
          </div>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
                    <PlusIcon />
                    <span className="sr-only">Add</span>
                  </TooltipTrigger>
                  <TooltipContent>Add item</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
                    <PencilIcon />
                    <span className="sr-only">Edit</span>
                  </TooltipTrigger>
                  <TooltipContent>Edit item</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
                    <Trash2Icon />
                    <span className="sr-only">Delete</span>
                  </TooltipTrigger>
                  <TooltipContent>Delete item</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
                    <SettingsIcon />
                    <span className="sr-only">Settings</span>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
                    <HelpCircleIcon />
                    <span className="sr-only">Help</span>
                  </TooltipTrigger>
                  <TooltipContent>Get help</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* With Keyboard Shortcut */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">With Keyboard Shortcut</h2>
            <p className="text-sm text-muted-foreground">Tooltips displaying keyboard shortcuts using kbd element.</p>
          </div>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                    <SaveIcon />
                    Save
                  </TooltipTrigger>
                  <TooltipContent>
                    Save document
                    <kbd data-slot="kbd">⌘S</kbd>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                    <UndoIcon />
                    Undo
                  </TooltipTrigger>
                  <TooltipContent>
                    Undo last action
                    <kbd data-slot="kbd">⌘Z</kbd>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                    <InfoIcon />
                    Info
                  </TooltipTrigger>
                  <TooltipContent>
                    Show details
                    <kbd data-slot="kbd">⌘I</kbd>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </TooltipProvider>
  )
}
