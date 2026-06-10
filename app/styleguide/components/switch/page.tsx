"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Switch</h1>
      <p className="mt-2 text-muted-foreground">
        Toggle switch component for boolean on/off states with support for labels and descriptions.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Default</h2>
        <div className="flex items-center gap-4">
          <Switch />
          <Switch defaultChecked />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Checked</h2>
        <div className="flex items-center gap-4">
          <Switch checked />
          <Switch checked size="sm" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Disabled</h2>
        <div className="flex items-center gap-4">
          <Switch disabled />
          <Switch disabled defaultChecked />
          <Switch disabled size="sm" />
          <Switch disabled defaultChecked size="sm" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Label</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch id="airplane" />
            <Label htmlFor="airplane">Airplane Mode</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="notifications" defaultChecked />
            <Label htmlFor="notifications">Push Notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="disabled-switch" disabled />
            <Label htmlFor="disabled-switch">Disabled with label</Label>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Description</h2>
        <div className="max-w-sm space-y-4">
          <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
            <div>
              <Label htmlFor="marketing-desc">Marketing emails</Label>
              <p className="text-xs text-muted-foreground">
                Receive emails about new products, features, and more.
              </p>
            </div>
            <Switch id="marketing-desc" />
          </div>
          <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
            <div>
              <Label htmlFor="security-desc">Security alerts</Label>
              <p className="text-xs text-muted-foreground">
                Get notified about security events on your account.
              </p>
            </div>
            <Switch id="security-desc" defaultChecked />
          </div>
          <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
            <div>
              <Label htmlFor="dark-mode">Dark mode</Label>
              <p className="text-xs text-muted-foreground">
                Switch between light and dark theme.
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Sizes</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch size="sm" />
            <span className="text-xs text-muted-foreground">Small</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch />
            <span className="text-xs text-muted-foreground">Default</span>
          </div>
        </div>
      </section>
    </div>
  )
}
