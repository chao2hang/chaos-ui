"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2Icon, AlertTriangleIcon, LogOutIcon } from "lucide-react"

export default function AlertDialogPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Alert Dialog</h1>
        <p className="mt-2 text-muted-foreground">
          A modal dialog that interrupts the user with a confirmation action. Used for destructive or important decisions.
        </p>
      </div>

      {/* Basic */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Basic</h2>
          <p className="text-sm text-muted-foreground">Simple confirmation dialog.</p>
        </div>
        <Card>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Open Alert Dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Please confirm you want to proceed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </section>

      {/* Destructive */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Destructive</h2>
          <p className="text-sm text-muted-foreground">Dangerous action confirmation with warning icon.</p>
        </div>
        <Card>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>
                <Trash2Icon />
                Delete Account
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangleIcon className="size-5 text-destructive" />
                    Delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account and all associated data.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    <Trash2Icon className="size-4" />
                    Delete account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </section>

      {/* With Custom Action */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Sign Out</h2>
          <p className="text-sm text-muted-foreground">Non-destructive confirmation with custom styling.</p>
        </div>
        <Card>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="ghost" />}>
                <LogOutIcon />
                Sign Out
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be redirected to the login page. Any unsaved changes will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay</AlertDialogCancel>
                  <AlertDialogAction>Sign out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
