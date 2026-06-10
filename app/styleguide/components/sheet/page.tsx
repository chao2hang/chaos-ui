"use client"

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowUpIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
} from "lucide-react"

export default function SheetPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Sheet</h1>
        <p className="mt-2 text-muted-foreground">
          A dialog that slides in from the edge of the screen. Supports all four sides.
        </p>
      </div>

      {/* Right (Default) */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Right Side</h2>
          <p className="text-sm text-muted-foreground">Default sheet sliding in from the right.</p>
        </div>
        <Card>
          <CardContent>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                <ArrowLeftIcon />
                Open Right Sheet
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Edit Profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when done.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 px-4">
                  <p className="text-sm text-muted-foreground">
                    This sheet slides in from the right side of the screen.
                  </p>
                </div>
                <SheetFooter>
                  <SheetClose render={<Button />}>Save changes</SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </section>

      {/* Left */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Left Side</h2>
          <p className="text-sm text-muted-foreground">Sheet sliding in from the left.</p>
        </div>
        <Card>
          <CardContent>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                <ArrowRightIcon />
                Open Left Sheet
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Browse through the application sections.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 px-4">
                  <p className="text-sm text-muted-foreground">
                    This sheet slides in from the left side of the screen.
                  </p>
                </div>
                <SheetFooter>
                  <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </section>

      {/* Top */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Top Side</h2>
          <p className="text-sm text-muted-foreground">Sheet sliding in from the top.</p>
        </div>
        <Card>
          <CardContent>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                <ArrowDownIcon />
                Open Top Sheet
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Notification</SheetTitle>
                  <SheetDescription>
                    You have new updates available.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    This sheet slides in from the top of the screen.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </section>

      {/* Bottom */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Bottom Side</h2>
          <p className="text-sm text-muted-foreground">Sheet sliding in from the bottom.</p>
        </div>
        <Card>
          <CardContent>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                <ArrowUpIcon />
                Open Bottom Sheet
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Share</SheetTitle>
                  <SheetDescription>
                    Share this link with others.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    This sheet slides in from the bottom of the screen.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </section>

      {/* With Form */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Form</h2>
          <p className="text-sm text-muted-foreground">Sheet containing a complete form with inputs and actions.</p>
        </div>
        <Card>
          <CardContent>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Create Task
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Create Task</SheetTitle>
                  <SheetDescription>
                    Fill in the details to create a new task.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 space-y-4 px-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Title</Label>
                    <Input id="task-title" placeholder="Task title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-desc">Description</Label>
                    <Input id="task-desc" placeholder="Describe the task" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-assignee">Assignee</Label>
                    <Input id="task-assignee" placeholder="Assign to..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-due">Due Date</Label>
                    <Input id="task-due" type="date" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose render={<Button variant="outline" />}>
                    Cancel
                  </SheetClose>
                  <SheetClose render={<Button />}>
                    Create task
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </section>

      {/* With Scrollable Content */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Scrollable Content</h2>
          <p className="text-sm text-muted-foreground">Sheet with a long scrollable content area using ScrollArea.</p>
        </div>
        <Card>
          <CardContent>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Activity Log
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Activity Log</SheetTitle>
                  <SheetDescription>
                    Recent activity on your account.
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 pb-4">
                    {Array.from({ length: 20 }, (_, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              {["Login", "Updated profile", "Changed password", "Uploaded file", "Deleted item"][i % 5]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {["from Chrome on macOS", "avatar and bio", "via security settings", "report-final.pdf", "old-backup.zip"][i % 5]}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {i + 1}h ago
                          </span>
                        </div>
                        {i < 19 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <SheetFooter>
                  <SheetClose render={<Button variant="outline" />}>
                    Close
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
