"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2Icon, AlertTriangleIcon } from "lucide-react"

export default function DialogPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Dialog</h1>
        <p className="mt-2 text-muted-foreground">
          A window overlaid on the primary content. Renders modally with an overlay.
        </p>
      </div>

      {/* Basic Dialog */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Basic</h2>
          <p className="text-sm text-muted-foreground">Simple dialog with title and description.</p>
        </div>
        <Card>
          <CardContent>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  This is a basic dialog with a title, description, and close button.
                </p>
                <DialogFooter showCloseButton />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>

      {/* With Form */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Form</h2>
          <p className="text-sm text-muted-foreground">Dialog containing form inputs with save and cancel actions.</p>
        </div>
        <Card>
          <CardContent>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Edit Profile
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your profile information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dialog-name">Name</Label>
                    <Input id="dialog-name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-email">Email</Label>
                    <Input id="dialog-email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-bio">Bio</Label>
                    <Input id="dialog-bio" placeholder="Tell us about yourself" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <DialogClose render={<Button />}>
                    Save changes
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>

      {/* Destructive Confirmation */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Destructive Confirmation</h2>
          <p className="text-sm text-muted-foreground">Dangerous action confirmation dialog with warning styling.</p>
        </div>
        <Card>
          <CardContent>
            <Dialog>
              <DialogTrigger render={<Button variant="destructive" />}>
                <Trash2Icon />
                Delete Account
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangleIcon className="size-5 text-destructive" />
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <DialogClose render={<Button variant="destructive" />}>
                    Delete account
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>

      {/* Custom Content */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Custom Content</h2>
          <p className="text-sm text-muted-foreground">Dialog with rich custom content layout.</p>
        </div>
        <Card>
          <CardContent>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                View Details
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Subscription Plan</DialogTitle>
                  <DialogDescription>
                    You are currently on the Pro plan.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Plan</span>
                    <span className="text-sm text-muted-foreground">Pro</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Price</span>
                    <span className="text-sm text-muted-foreground">$19/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Next billing</span>
                    <span className="text-sm text-muted-foreground">Jan 1, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage</span>
                    <span className="text-sm text-muted-foreground">45.2 GB / 100 GB</span>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Close
                  </DialogClose>
                  <Button variant="outline">Manage subscription</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
