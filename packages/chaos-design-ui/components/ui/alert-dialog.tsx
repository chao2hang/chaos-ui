"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function AlertDialog(props: React.ComponentProps<typeof Dialog>) { return <Dialog {...props} /> }
function AlertDialogTrigger(props: React.ComponentProps<typeof DialogTrigger>) { return <DialogTrigger {...props} /> }
function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof DialogContent>) {
  return <DialogContent className={cn("max-w-md", className)} {...props} />
}
function AlertDialogHeader(props: React.ComponentProps<typeof DialogHeader>) { return <DialogHeader {...props} /> }
function AlertDialogTitle(props: React.ComponentProps<typeof DialogTitle>) { return <DialogTitle {...props} /> }
function AlertDialogDescription(props: React.ComponentProps<typeof DialogDescription>) { return <DialogDescription {...props} /> }
function AlertDialogFooter(props: React.ComponentProps<typeof DialogFooter>) { return <DialogFooter {...props} /> }
function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof Button>) { return <Button className={className} {...props} /> }
function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof Button>) { return <Button variant="outline" className={className} {...props} /> }

export {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
}
