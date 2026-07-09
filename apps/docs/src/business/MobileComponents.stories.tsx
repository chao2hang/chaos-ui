"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { MobileButton } from "@/components/business/mobile-button";
import { MobileInput } from "@/components/business/mobile-input";
import { MobileTextarea } from "@/components/business/mobile-textarea";
import { MobileSelect } from "@/components/business/mobile-select";
import { MobileDialog } from "@/components/business/mobile-dialog";
import { MobileSheet } from "@/components/business/mobile-sheet";
import { MobileCard } from "@/components/business/mobile-card";
import { MobileKPICard } from "@/components/business/mobile-kpi-card";
import { MobileDataTable } from "@/components/business/mobile-data-table";
import { MobileForm } from "@/components/business/mobile-form";
import { MobileFormField } from "@/components/business/mobile-form-field";
import { MobileEmptyState } from "@/components/business/mobile-empty-state";
import { MobileNavigation } from "@/components/business/mobile-navigation";
import { MobileTabs } from "@/components/mobile/mobile-tabs";
import { MobileDashboardLayout } from "@/components/business/mobile-dashboard-layout";
import { MobileAuthLayout } from "@/components/business/mobile-auth-layout";
import { ResponsivePreview } from "@/components/business/responsive-preview";
import {
  DollarSignIcon,
  UsersIcon,
  ShoppingCartIcon,
  InboxIcon,
  SearchIcon,
  AlertTriangleIcon,
  WifiOffIcon,
} from "lucide-react";

const meta: Meta<typeof MobileButton> = {
  title: "Mobile/Components",
  component: MobileButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// Button 演示
export const MobileButtons: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-4 p-4">
        <MobileButton>Full Width Button</MobileButton>
        <MobileButton variant="outline">Outline Button</MobileButton>
        <MobileButton variant="secondary">Secondary Button</MobileButton>
        <MobileButton variant="destructive">Destructive Button</MobileButton>
        <MobileButton variant="ghost">Ghost Button</MobileButton>
      </div>
    </ResponsivePreview>
  ),
};

// Input 演示
export const MobileInputs: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-4 p-4">
        <MobileInput placeholder="Mobile input" />
        <MobileInput placeholder="With error" aria-invalid />
        <MobileTextarea placeholder="Mobile textarea" />
        <MobileSelect
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" },
          ]}
          placeholder="Select option"
        />
      </div>
    </ResponsivePreview>
  ),
};

// Card 演示
export const MobileCards: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-4 p-4">
        <MobileKPICard
          title="Revenue"
          value="$45,231"
          change="+20.1%"
          changeType="positive"
          icon={DollarSignIcon}
        />
        <MobileKPICard
          title="Users"
          value="2,350"
          change="+12.5%"
          changeType="positive"
          icon={UsersIcon}
        />
        <MobileKPICard
          title="Sales"
          value="+12,234"
          change="-2.5%"
          changeType="negative"
          icon={ShoppingCartIcon}
        />
      </div>
    </ResponsivePreview>
  ),
};

// Dialog 演示
export const MobileDialogs: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-4 p-4">
        <MobileDialog
          title="Confirm Action"
          description="Are you sure you want to proceed?"
          trigger={<MobileButton>Open Dialog</MobileButton>}
          actions={
            <>
              <MobileButton variant="outline">Cancel</MobileButton>
              <MobileButton>Confirm</MobileButton>
            </>
          }
        >
          <p>
            This is a mobile-optimized dialog that takes full screen on mobile
            devices.
          </p>
        </MobileDialog>
      </div>
    </ResponsivePreview>
  ),
};

// Sheet 演示
export const MobileSheets: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-4 p-4">
        <MobileSheet
          title="Bottom Sheet"
          description="Swipe down to close"
          trigger={
            <MobileButton variant="outline">Open Bottom Sheet</MobileButton>
          }
        >
          <div className="space-y-4">
            <p>This is a mobile-optimized bottom sheet.</p>
            <MobileButton>Action 1</MobileButton>
            <MobileButton variant="outline">Action 2</MobileButton>
          </div>
        </MobileSheet>
      </div>
    </ResponsivePreview>
  ),
};

// DataTable 演示
export const MobileDataTables: Story = {
  render: () => {
    const columns = [
      { key: "id", header: "ID", primary: true },
      { key: "customer", header: "Customer" },
      { key: "amount", header: "Amount" },
      { key: "status", header: "Status" },
    ];
    const data = [
      {
        id: "ORD-001",
        customer: "Alice Johnson",
        amount: "$250.00",
        status: "Completed",
      },
      {
        id: "ORD-002",
        customer: "Bob Smith",
        amount: "$120.50",
        status: "Pending",
      },
      {
        id: "ORD-003",
        customer: "Carol White",
        amount: "$89.99",
        status: "Processing",
      },
    ];
    return (
      <ResponsivePreview device="mobile">
        <div className="p-4">
          <MobileDataTable columns={columns} data={data} />
        </div>
      </ResponsivePreview>
    );
  },
};

// Form 演示
export const MobileForms: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <MobileForm>
        <MobileFormField label="Name" required>
          <MobileInput placeholder="Enter your name" />
        </MobileFormField>
        <MobileFormField label="Email" required>
          <MobileInput type="email" placeholder="Enter your email" />
        </MobileFormField>
        <MobileFormField label="Message">
          <MobileTextarea placeholder="Enter your message" />
        </MobileFormField>
        <MobileButton>Submit</MobileButton>
      </MobileForm>
    </ResponsivePreview>
  ),
};

// EmptyState 演示
export const MobileEmptyStates: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-8 p-4">
        <MobileEmptyState
          variant="default"
          action={<MobileButton size="sm">Create Item</MobileButton>}
        />
        <MobileEmptyState
          variant="search"
          action={
            <MobileButton size="sm" variant="outline">
              Clear Filters
            </MobileButton>
          }
        />
        <MobileEmptyState
          variant="error"
          action={<MobileButton size="sm">Retry</MobileButton>}
        />
      </div>
    </ResponsivePreview>
  ),
};

// Navigation 演示
export const MobileNavigations: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4">
        <MobileNavigation
          items={[
            { label: "All", active: true },
            { label: "Active" },
            { label: "Completed" },
            { label: "Pending" },
            { label: "Archived" },
          ]}
        />
      </div>
    </ResponsivePreview>
  ),
};

// Tabs 演示
export const MobileTabsDemo: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <MobileTabs
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: <p>Overview content for mobile</p>,
          },
          {
            value: "details",
            label: "Details",
            content: <p>Details content for mobile</p>,
          },
          {
            value: "settings",
            label: "Settings",
            content: <p>Settings content for mobile</p>,
          },
        ]}
      />
    </ResponsivePreview>
  ),
};

// Dashboard Layout 演示
export const MobileDashboardLayouts: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <MobileDashboardLayout title="Dashboard" description="Welcome back">
        <div className="space-y-4">
          <MobileKPICard
            title="Revenue"
            value="$45,231"
            change="+20.1%"
            changeType="positive"
            icon={DollarSignIcon}
          />
          <MobileKPICard
            title="Users"
            value="2,350"
            change="+12.5%"
            changeType="positive"
            icon={UsersIcon}
          />
        </div>
      </MobileDashboardLayout>
    </ResponsivePreview>
  ),
};

// Auth Layout 演示
export const MobileAuthLayouts: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <MobileAuthLayout
        title="Welcome back"
        description="Sign in to your account to continue"
        footer={
          <>
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-primary font-medium underline underline-offset-4"
            >
              Sign up
            </a>
          </>
        }
      >
        <div className="space-y-5">
          <MobileButton variant="outline" className="gap-3">
            <svg className="size-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </MobileButton>

          <MobileButton variant="outline" className="gap-3">
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with Apple
          </MobileButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-4">
                or
              </span>
            </div>
          </div>

          <MobileFormField label="Email" required>
            <MobileInput type="email" placeholder="name@example.com" />
          </MobileFormField>

          <div className="space-y-2">
            <MobileFormField label="Password" required>
              <MobileInput type="password" placeholder="Enter your password" />
            </MobileFormField>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-primary text-sm font-medium underline underline-offset-4"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <MobileButton>Sign In</MobileButton>
        </div>
      </MobileAuthLayout>
    </ResponsivePreview>
  ),
};

export const MobileAuthSignUp: Story = {
  render: () => (
    <ResponsivePreview device="mobile">
      <MobileAuthLayout
        title="Create account"
        description="Sign up to get started with our platform"
        footer={
          <>
            Already have an account?{" "}
            <a
              href="#"
              className="text-primary font-medium underline underline-offset-4"
            >
              Sign in
            </a>
          </>
        }
      >
        <div className="space-y-5">
          <MobileFormField label="Full Name" required>
            <MobileInput placeholder="John Doe" />
          </MobileFormField>

          <MobileFormField label="Email" required>
            <MobileInput type="email" placeholder="name@example.com" />
          </MobileFormField>

          <MobileFormField label="Password" required>
            <MobileInput type="password" placeholder="Create a password" />
          </MobileFormField>

          <MobileFormField label="Confirm Password" required>
            <MobileInput type="password" placeholder="Confirm your password" />
          </MobileFormField>

          <MobileButton>Create Account</MobileButton>

          <p className="text-muted-foreground text-center text-xs">
            By signing up, you agree to our{" "}
            <a href="#" className="underline underline-offset-4">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4">
              Privacy Policy
            </a>
          </p>
        </div>
      </MobileAuthLayout>
    </ResponsivePreview>
  ),
};
