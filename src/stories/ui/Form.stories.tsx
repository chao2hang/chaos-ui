"use client"

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormGrid, FormGridItem } from "@/components/ui/form-grid"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const meta = {
  title: "Components/Form",
  component: FormItem,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FormItem>

export default meta
type Story = StoryObj<typeof meta>

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginValues = z.infer<typeof loginSchema>

function LoginFormDemo({ withErrors = false }: { withErrors?: boolean }) {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: withErrors ? "operations" : "ops@example.com",
      password: withErrors ? "short" : "correct-horse",
    },
    mode: "onChange",
  })

  React.useEffect(() => {
    if (withErrors) {
      void form.trigger()
    }
  }, [form, withErrors])

  return (
    <Form {...form}>
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={form.handleSubmit(() => undefined)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <Input placeholder="ops@example.com" type="email" {...field} />
              </FormControl>
              <FormDescription>Use your workspace email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  )
}

const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  owner: z.string().min(1, "Owner is required"),
  budget: z.string().min(1, "Budget is required"),
  notes: z.string().optional(),
})

type CampaignValues = z.infer<typeof campaignSchema>

function CampaignFormDemo() {
  const form = useForm<CampaignValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "Summer retail launch",
      owner: "Lina Chen",
      budget: "125000",
      notes: "Launch across paid social and lifecycle email.",
    },
  })

  return (
    <Form {...form}>
      <form
        className="w-full max-w-2xl space-y-4"
        onSubmit={form.handleSubmit(() => undefined)}
      >
        <FormGrid columns={2}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Campaign</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Owner</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Budget</FormLabel>
                <FormControl>
                  <Input inputMode="numeric" {...field} />
                </FormControl>
                <FormDescription>Budget is stored in whole dollars.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormGridItem span={2}>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGridItem>
        </FormGrid>
        <Button type="submit">Save campaign</Button>
      </form>
    </Form>
  )
}

function DisabledReadonlyDemo() {
  const form = useForm({
    defaultValues: {
      accountId: "ACME-4281",
      billingEmail: "billing@example.com",
    },
  })

  return (
    <Form {...form}>
      <div className="w-full max-w-md space-y-4">
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account ID</FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormDescription>Read-only fields keep their form metadata.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing email</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription>Disabled controls inherit the standard input state.</FormDescription>
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

export const Login: Story = {
  render: () => <LoginFormDemo />,
}

export const WithValidationErrors: Story = {
  render: () => <LoginFormDemo withErrors />,
}

export const GridLayout: Story = {
  render: () => <CampaignFormDemo />,
}

export const DisabledAndReadonly: Story = {
  render: () => <DisabledReadonlyDemo />,
}

