import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, Mail } from "lucide-react"

export default function InputPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Input</h1>
      <p className="mt-2 text-muted-foreground">
        Text input component for forms with support for labels, icons, and validation states.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Default</h2>
        <div className="max-w-sm">
          <Input />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Placeholder</h2>
        <div className="max-w-sm">
          <Input placeholder="Enter your email..." />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Disabled</h2>
        <div className="max-w-sm space-y-3">
          <Input disabled />
          <Input disabled placeholder="Disabled with placeholder" />
          <Input disabled value="Disabled with value" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Label</h2>
        <div className="max-w-sm space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Error</h2>
        <div className="max-w-sm space-y-1.5">
          <Label htmlFor="email-error">Email</Label>
          <Input id="email-error" aria-invalid defaultValue="invalid-email" />
          <p className="text-xs text-destructive">Please enter a valid email address.</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Icon</h2>
        <div className="max-w-sm space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8" placeholder="Search..." />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8" placeholder="Email address" />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Button</h2>
        <div className="flex max-w-sm gap-2">
          <Input placeholder="Subscribe to newsletter..." />
          <Button>Subscribe</Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">File Input</h2>
        <div className="max-w-sm">
          <Input type="file" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Description</h2>
        <div className="max-w-sm space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="johndoe" />
          <p className="text-xs text-muted-foreground">
            This is your public display name. You can only change it once.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Input Types</h2>
        <div className="max-w-sm space-y-3">
          <Input type="text" placeholder="Text" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="number" placeholder="Number" />
          <Input type="tel" placeholder="Telephone" />
          <Input type="url" placeholder="URL" />
          <Input type="search" placeholder="Search" />
          <Input type="date" />
        </div>
      </section>
    </div>
  )
}
