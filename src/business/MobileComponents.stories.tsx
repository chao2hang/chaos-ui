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
import { MobileBottomNav } from "@/components/business/mobile-bottom-nav"
import { MobileFilterBuilder } from "@/components/business/mobile-filter-builder"
import { MobileFormWizard } from "@/components/business/mobile-form-wizard"
import { MobileKanban } from "@/components/business/mobile-kanban"
import { MobilePageHeader } from "@/components/business/mobile-page-header"
import { PullToRefresh as MobilePullToRefresh } from "@/components/business/mobile-pull-to-refresh"
import {
  MobileCardSkeleton,
  MobileDetailSkeleton,
  MobileListItemSkeleton,
} from "@/components/business/mobile-skeleton"
import { SwipeActions as MobileSwipeActions } from "@/components/business/mobile-swipe-actions"
import { ResponsivePreview } from "@/components/business/responsive-preview"
import {
  DollarSignIcon,
  HomeIcon,
  InboxIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  StarIcon,
  Trash2Icon,
  UsersIcon,
  ShoppingCartIcon,
} from "lucide-react"

const meta = {
  title: "Mobile/Components",
  component: MobileButton,
  tags: ["autodocs", "a11y"],
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

export const MobileBottomNavigation: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="relative h-[560px] overflow-hidden rounded-lg border bg-background">
        <div className="p-4 pb-20">
          <MobilePageHeader title="Dashboard" description="Today" />
          <div className="mt-4 space-y-3">
            <MobileKPICard
              title="Revenue"
              value="$45,231"
              change="+20.1%"
              changeType="positive"
              icon={DollarSignIcon}
            />
            <MobileCard title="Tasks" description="3 approvals need review">
              <p className="text-sm text-muted-foreground">Bottom navigation remains fixed at the viewport edge.</p>
            </MobileCard>
          </div>
        </div>
        <MobileBottomNav
          className="absolute md:flex"
          items={[
            { label: "Home", href: "#home", icon: <HomeIcon className="size-5" />, active: true },
            { label: "Inbox", href: "#inbox", icon: <InboxIcon className="size-5" />, badge: 3 },
            { label: "Reports", href: "#reports", icon: <LayoutDashboardIcon className="size-5" /> },
            { label: "Settings", href: "#settings", icon: <SettingsIcon className="size-5" /> },
          ]}
          onChange={() => undefined}
        />
      </div>
    </ResponsivePreview>
  ),
}

export const MobileFilters: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4">
        <MobileFilterBuilder
          fields={[
            { key: "status", label: "Status" },
            { key: "owner", label: "Owner" },
            { key: "budget", label: "Budget" },
          ]}
        />
      </div>
    </ResponsivePreview>
  ),
}

export const MobileFormWizards: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4">
        <MobileFormWizard
          steps={[
            {
              title: "Basics",
              description: "Name the campaign",
              render: ({ formData, updateField, errors }) => (
                <MobileFormField label="Campaign name" error={errors.name} required>
                  <MobileInput
                    value={String(formData.name ?? "")}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Summer launch"
                  />
                </MobileFormField>
              ),
              validate: (data): Record<string, string> => {
                if (!data.name) return { name: "Campaign name is required" }
                return {}
              },
            },
            {
              title: "Budget",
              description: "Set an initial budget",
              render: ({ formData, updateField }) => (
                <MobileFormField label="Budget">
                  <MobileInput
                    inputMode="numeric"
                    value={String(formData.budget ?? "")}
                    onChange={(event) => updateField("budget", event.target.value)}
                    placeholder="50000"
                  />
                </MobileFormField>
              ),
            },
          ]}
        />
      </div>
    </ResponsivePreview>
  ),
}

export const MobileKanbanBoard: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="p-4">
        <MobileKanban
          columns={[
            { id: "todo", title: "To Do", items: [{ id: "1", title: "Approve brief" }] },
            { id: "doing", title: "Doing", items: [{ id: "2", title: "Review media plan" }] },
            { id: "done", title: "Done", items: [{ id: "3", title: "Upload assets" }] },
          ]}
        />
      </div>
    </ResponsivePreview>
  ),
}

export const MobilePullToRefreshDemo: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <MobilePullToRefresh
        className="h-[520px] rounded-lg border"
        onRefresh={() => new Promise((resolve) => setTimeout(resolve, 600))}
      >
        <MobilePageHeader title="Activity" description="Pull down on touch devices" />
        <div className="space-y-2 p-4">
          {["Creative approved", "Budget updated", "Segment synced", "Report exported"].map((item) => (
            <MobileCard key={item} title={item} description="Just now">
              <p className="text-sm text-muted-foreground">Activity item synced successfully.</p>
            </MobileCard>
          ))}
        </div>
      </MobilePullToRefresh>
    </ResponsivePreview>
  ),
}

export const MobileSkeletons: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-4 p-4">
        <MobileCardSkeleton />
        <div className="rounded-lg border">
          <MobileListItemSkeleton />
          <MobileListItemSkeleton />
          <MobileListItemSkeleton />
        </div>
        <MobileDetailSkeleton />
      </div>
    </ResponsivePreview>
  ),
}

export const MobileSwipeActionsDemo: StoryObj = {
  render: () => (
    <ResponsivePreview device="mobile">
      <div className="space-y-3 p-4">
        <MobileSwipeActions
          leftAction={{ label: "Delete", color: "#dc2626", icon: <Trash2Icon className="size-4" />, onClick: () => undefined }}
          rightAction={{ label: "Favorite", color: "#16a34a", icon: <StarIcon className="size-4" />, onClick: () => undefined }}
        >
          <MobileCard title="Spring launch" description="Swipe left or right on touch devices">
            <p className="text-sm text-muted-foreground">Review the latest campaign update.</p>
          </MobileCard>
        </MobileSwipeActions>
      </div>
    </ResponsivePreview>
  ),
}

