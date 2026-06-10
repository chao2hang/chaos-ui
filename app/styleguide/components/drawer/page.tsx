"use client"
import * as React from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function DrawerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Drawer</h1>
      <p className="mt-2 text-muted-foreground">Sliding panel from screen edge.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Bottom Drawer</h2>
        <Drawer>
          <DrawerTrigger asChild><Button variant="outline">Open Bottom Drawer</Button></DrawerTrigger>
          <DrawerContent>
            <DrawerHeader><DrawerTitle>Edit Profile</DrawerTitle><DrawerDescription>Make changes to your profile.</DrawerDescription></DrawerHeader>
            <div className="grid gap-4 p-4">
              <div className="space-y-1.5"><Label>Name</Label><Input placeholder="Enter name" /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input placeholder="Enter email" /></div>
            </div>
            <DrawerFooter>
              <Button>Save</Button>
              <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Right Drawer</h2>
        <Drawer direction="right">
          <DrawerTrigger asChild><Button variant="outline">Open Right Drawer</Button></DrawerTrigger>
          <DrawerContent>
            <DrawerHeader><DrawerTitle>Notifications</DrawerTitle><DrawerDescription>3 unread messages.</DrawerDescription></DrawerHeader>
            <div className="space-y-2 p-4">
              {["New order received", "Payment confirmed", "Shipment dispatched"].map((m) => (
                <div key={m} className="rounded-lg border p-3 text-sm">{m}</div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </section>
    </div>
  )
}
