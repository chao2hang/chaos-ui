"use client"
import * as React from "react"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function PopoverPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Popover</h1>
      <p className="mt-2 text-muted-foreground">Floating content panel triggered by click.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <Popover>
          <PopoverTrigger><Button variant="outline">Open Popover</Button></PopoverTrigger>
          <PopoverContent>
            <PopoverHeader><PopoverTitle>Title</PopoverTitle><PopoverDescription>Description text.</PopoverDescription></PopoverHeader>
          </PopoverContent>
        </Popover>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Form</h2>
        <Popover>
          <PopoverTrigger><Button variant="outline">Edit Dimensions</Button></PopoverTrigger>
          <PopoverContent className="w-72">
            <PopoverHeader><PopoverTitle>Dimensions</PopoverTitle></PopoverHeader>
            <div className="grid gap-3 mt-2">
              <div className="grid grid-cols-3 items-center gap-2"><Label>Width</Label><Input defaultValue="100%" className="col-span-2 h-8" /></div>
              <div className="grid grid-cols-3 items-center gap-2"><Label>Height</Label><Input defaultValue="25px" className="col-span-2 h-8" /></div>
            </div>
          </PopoverContent>
        </Popover>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Positioning</h2>
        <div className="flex flex-wrap gap-4">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Popover key={side}>
              <PopoverTrigger><Button variant="outline" size="sm">{side}</Button></PopoverTrigger>
              <PopoverContent side={side}><p className="text-sm">Popover on {side}</p></PopoverContent>
            </Popover>
          ))}
        </div>
      </section>
    </div>
  )
}
