"use client"
import * as React from "react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { SearchIcon, EyeIcon, EyeOffIcon, LockIcon, AtSignIcon } from "lucide-react"
export default function InputGroupPage() {
  const [showPw, setShowPw] = React.useState(false)
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Input Group</h1>
      <p className="mt-2 text-muted-foreground">Input field with addons, prefixes, suffixes, and inline buttons.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Prefix Addon</h2>
        <div className="max-w-sm space-y-3">
          <InputGroup><InputGroupAddon><AtSignIcon /></InputGroupAddon><InputGroupInput placeholder="username" /></InputGroup>
          <InputGroup><InputGroupAddon><LockIcon /></InputGroupAddon><InputGroupInput placeholder="https://" /><InputGroupAddon align="inline-end"><InputGroupText>.com</InputGroupText></InputGroupAddon></InputGroup>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Button</h2>
        <div className="max-w-sm">
          <InputGroup><InputGroupAddon><SearchIcon /></InputGroupAddon><InputGroupInput placeholder="Search..." /><InputGroupAddon align="inline-end"><InputGroupButton>Search</InputGroupButton></InputGroupAddon></InputGroup>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Password Toggle</h2>
        <div className="max-w-sm">
          <InputGroup><InputGroupAddon><LockIcon /></InputGroupAddon><InputGroupInput type={showPw ? "text" : "password"} placeholder="Password" /><InputGroupAddon align="inline-end"><InputGroupButton onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOffIcon /> : <EyeIcon />}</InputGroupButton></InputGroupAddon></InputGroup>
        </div>
      </section>
    </div>
  )
}
