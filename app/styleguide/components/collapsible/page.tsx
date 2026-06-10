"use client"
import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDownIcon, ChevronRightIcon } from "lucide-react"
export default function CollapsiblePage() {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Collapsible</h1>
      <p className="mt-2 text-muted-foreground">Expandable and collapsible content section.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md space-y-2">
          <div className="flex items-center justify-between rounded-md border px-4 py-2">
            <h3 className="text-sm font-semibold">@peduarte starred 3 repos</h3>
            <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}><ChevronsUpDownIcon /></CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
            <div className="rounded-md border px-4 py-2 text-sm">@stitches/react</div>
          </CollapsibleContent>
        </Collapsible>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Nested</h2>
        <div className="w-full max-w-md space-y-1">
          <Collapsible className="rounded-md border">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-muted">
              <span>Category A</span><ChevronRightIcon className="size-4 transition-transform [[data-state=open]>&]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t px-4 py-2">
              <div className="py-1 text-sm text-muted-foreground">Item A-1</div>
              <div className="py-1 text-sm text-muted-foreground">Item A-2</div>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="rounded-md border">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-muted">
              <span>Category B</span><ChevronRightIcon className="size-4 transition-transform [[data-state=open]>&]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t px-4 py-2">
              <div className="py-1 text-sm text-muted-foreground">Item B-1</div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    </div>
  )
}
