"use client"
import * as React from "react"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react"
export default function CommandPage() {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Command</h1>
      <p className="mt-2 text-muted-foreground">Command palette for keyboard-driven navigation and actions.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Inline Command</h2>
        <Command className="rounded-lg border shadow-sm">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem><Calendar /><span>Calendar</span></CommandItem>
              <CommandItem><Smile /><span>Search Emoji</span></CommandItem>
              <CommandItem><Calculator /><span>Calculator</span></CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem><User /><span>Profile</span><CommandShortcut>P</CommandShortcut></CommandItem>
              <CommandItem><CreditCard /><span>Billing</span><CommandShortcut>B</CommandShortcut></CommandItem>
              <CommandItem><Settings /><span>Settings</span><CommandShortcut>S</CommandShortcut></CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Dialog Command</h2>
        <Button variant="outline" onClick={() => setOpen(true)}>Open Command Palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem><Calendar /><span>Create Event</span></CommandItem>
              <CommandItem><User /><span>Invite User</span></CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </section>
    </div>
  )
}
