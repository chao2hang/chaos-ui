"use client"
import { FormField } from "@/components/business/form-field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function FormFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">FormField</h1>
      <p className="mt-2 text-muted-foreground">
        Wrapper for form fields with label, description, and error message.
      </p>

      <section className="mt-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Label and input</CardDescription>
          </CardHeader>
          <CardContent className="max-w-sm">
            <FormField label="Email">
              <Input placeholder="you@example.com" />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Description</CardTitle>
            <CardDescription>Helper text below the field</CardDescription>
          </CardHeader>
          <CardContent className="max-w-sm">
            <FormField
              label="Username"
              description="Must be unique. 3-20 characters."
            >
              <Input placeholder="johndoe" />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Required</CardTitle>
            <CardDescription>Shows required indicator</CardDescription>
          </CardHeader>
          <CardContent className="max-w-sm">
            <FormField label="Full Name" required>
              <Input placeholder="John Doe" />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Error</CardTitle>
            <CardDescription>Error state with message</CardDescription>
          </CardHeader>
          <CardContent className="max-w-sm">
            <FormField
              label="Password"
              error="Password must be at least 8 characters."
            >
              <Input type="password" placeholder="••••••••" aria-invalid />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Required + Description + Error</CardTitle>
            <CardDescription>All props combined</CardDescription>
          </CardHeader>
          <CardContent className="max-w-sm">
            <FormField
              label="Company Name"
              description="The legal name of your organization."
              error="This field is required."
              required
            >
              <Input placeholder="Acme Inc." aria-invalid />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Textarea</CardTitle>
            <CardDescription>Works with any input component</CardDescription>
          </CardHeader>
          <CardContent className="max-w-sm">
            <FormField
              label="Bio"
              description="Tell us about yourself. Max 280 characters."
            >
              <Textarea placeholder="I'm a software engineer..." />
            </FormField>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
