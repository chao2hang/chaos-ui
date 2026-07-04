"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { z } from "zod";

import { SchemaForm } from "@/components/ui/schema-form";

const meta = {
  title: "Components/SchemaForm",
  component: SchemaForm,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    layout: {
      control: "select",
      options: ["stack", "grid"],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

const loginDefaults: LoginValues = { email: "", password: "" };

function LoginFormDemo({ withErrors = false }: { withErrors?: boolean }) {
  const [submitted, setSubmitted] = React.useState<LoginValues | null>(null);

  return (
    <div className="w-full max-w-sm space-y-4">
      <SchemaForm<LoginValues>
        schema={loginSchema}
        defaultValues={
          withErrors
            ? { email: "operations", password: "short" }
            : loginDefaults
        }
        fields={{
          email: {
            type: "email",
            label: "Email",
            required: true,
            placeholder: "ops@example.com",
            description: "Use your workspace email address.",
          },
          password: {
            type: "password",
            label: "Password",
            required: true,
            placeholder: "••••••••",
          },
        }}
        submitText="Sign in"
        resetText="Clear"
        onSubmit={(v) => {
          setSubmitted(v);
        }}
      />
      {submitted ? (
        <pre className="bg-muted rounded-md p-2 text-xs">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  role: z.enum(["admin", "editor", "viewer"]),
  active: z.boolean(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const profileDefaults: ProfileValues = {
  name: "",
  bio: "",
  role: "viewer",
  active: false,
};

function ProfileFormDemo() {
  const [result, setResult] = React.useState<ProfileValues | null>(null);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <SchemaForm<ProfileValues>
        schema={profileSchema}
        defaultValues={profileDefaults}
        layout="grid"
        columns={2}
        fields={{
          name: { type: "text", label: "Display name", required: true },
          role: {
            type: "select",
            label: "Role",
            options: [
              { value: "admin", label: "Admin" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Viewer" },
            ],
          },
          bio: {
            type: "textarea",
            label: "Bio",
            placeholder: "Tell us about yourself",
          },
          active: { type: "switch", label: "Active" },
        }}
        submitText="Save profile"
        resetText="Reset"
        onSubmit={(v) => {
          setResult(v);
        }}
      />
      {result ? (
        <pre className="bg-muted rounded-md p-2 text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export const Login: Story = {
  render: () => <LoginFormDemo />,
};

export const WithValidationErrors: Story = {
  render: () => <LoginFormDemo withErrors />,
  parameters: {
    docs: {
      description: {
        story:
          "Default values intentionally fail zod validation so the form surfaces errors immediately on mount.",
      },
    },
  },
};

export const GridLayout: Story = {
  render: () => <ProfileFormDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Grid layout with mixed control types — text, select, textarea, and switch — rendered from a single zod schema and field overrides.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <SchemaForm<LoginValues>
      schema={loginSchema}
      defaultValues={loginDefaults}
      fields={{
        email: { type: "email", label: "Email", required: true },
        password: { type: "password", label: "Password", required: true },
      }}
      submitText="Sign in"
      resetText="Clear"
      isLoading
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Submit and reset buttons are disabled while `isLoading` is true.",
      },
    },
  },
};
