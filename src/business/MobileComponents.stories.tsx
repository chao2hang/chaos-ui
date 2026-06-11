"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { MobileButton } from "@/components/business/mobile-button"
import { MobileInput } from "@/components/business/mobile-input"
import { MobileTextarea } from "@/components/business/mobile-textarea"
import { MobileSelect } from "@/components/business/mobile-select"
import { MobileDialog } from "@/components/business/mobile-dialog"
import { MobileSheet } from "@/components/business/mobile-sheet"
import { MobileCard } from "@/components/business/mobile-card"
import { MobileKPICard } from "@/components/business/mobile-kpi-card"
import { MobileDataTable } from "@/components/business/mobile-data-table"
import { MobileForm } from "@/components/business/mobile-form"
import { MobileFormField } from "@/components/business/mobile-form-field"
import { MobileEmptyState } from "@/components/business/mobile-empty-state"
import { MobileNavigation } from "@/components/business/mobile-navigation"
import { MobileTabs } from "@/components/business/mobile-tabs"
import { MobileDashboardLayout } from "@/components/business/mobile-dashboard-layout"
import { MobileAuthLayout } from "@/components/business/mobile-auth-layout"
import { ResponsivePreview } from "@/components/business/responsive-preview"
import {
  DollarSignIcon,
  UsersIcon,
  ShoppingCartIcon,
  InboxIcon,
  SearchIcon,
  AlertTriangleIcon,
  WifiOffIcon,
} from "lucide-react"

const meta = {
  title: "Mobile/Components",
  component: MobileButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MobileButton>

export default meta

// Button 演示
export const MobileButtons: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4 space-y-4">
        <MobileButton>Full Width Button</MobileButton>
        <MobileButton variant="outline">Outline Button</MobileButton>
        <MobileButton variant="secondary">Secondary Button</MobileButton>
        <MobileButton variant="destructive">Destructive Button</MobileButton>
        <MobileButton variant="ghost">Ghost Button</MobileButton>
      </div>
    </ResponsivePreview>
  ),
}

// Input 演示
export const MobileInputs: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4 space-y-4">
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
}

// Card 演示
export const MobileCards: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4 space-y-4">
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
}

// Dialog 演示
export const MobileDialogs: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4 space-y-4">
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
          <p>This is a mobile-optimized dialog that takes full screen on mobile devices.</p>
        </MobileDialog>
      </div>
    </ResponsivePreview>
  ),
}

// Sheet 演示
export const MobileSheets: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4 space-y-4">
        <MobileSheet
          title="Bottom Sheet"
          description="Swipe down to close"
          trigger={<MobileButton variant="outline">Open Bottom Sheet</MobileButton>}
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
}

// DataTable 演示
export const MobileDataTables: StoryObj = {
  render: () => {
    const columns = [
      { key: "id", header: "ID", primary: true },
      { key: "customer", header: "Customer" },
      { key: "amount", header: "Amount" },
      { key: "status", header: "Status" },
    ]
    const data = [
      { id: "ORD-001", customer: "Alice Johnson", amount: "$250.00", status: "Completed" },
      { id: "ORD-002", customer: "Bob Smith", amount: "$120.50", status: "Pending" },
      { id: "ORD-003", customer: "Carol White", amount: "$89.99", status: "Processing" },
    ]
    return (
      <ResponsivePreview device="mobile">
        <div className="p-4">
          <MobileDataTable columns={columns} data={data} />
        </div>
      </ResponsivePreview>
    )
  },
}

// Form 演示
export const MobileForms: StoryObj = {
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
}

// EmptyState 演示
export const MobileEmptyStates: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4 space-y-8">
        <MobileEmptyState
          variant="default"
          action={<MobileButton size="sm">Create Item</MobileButton>}
        />
        <MobileEmptyState
          variant="search"
          action={<MobileButton size="sm" variant="outline">Clear Filters</MobileButton>}
        />
        <MobileEmptyState
          variant="error"
          action={<MobileButton size="sm">Retry</MobileButton>}
        />
      </div>
    </ResponsivePreview>
  ),
}

// Navigation 演示
export const MobileNavigations: StoryObj = {
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
}

// Tabs 演示
export const MobileTabsDemo: StoryObj = {
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
}

// Dashboard Layout 演示
export const MobileDashboardLayouts: StoryObj = {
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
}

// Auth Layout 演示
export const MobileAuthLayouts: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <MobileAuthLayout>
        <MobileCard title="Sign In" description="Enter your credentials">
          <div className="space-y-4">
            <MobileFormField label="Email" required>
              <MobileInput type="email" placeholder="Enter your email" />
            </MobileFormField>
            <MobileFormField label="Password" required>
              <MobileInput type="password" placeholder="Enter your password" />
            </MobileFormField>
            <MobileButton>Sign In</MobileButton>
          </div>
        </MobileCard>
      </MobileAuthLayout>
    </ResponsivePreview>
  ),
}
