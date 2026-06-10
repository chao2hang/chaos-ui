"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  UserIcon,
  ShieldIcon,
  CreditCardIcon,
  BellIcon,
} from "lucide-react"

export default function AccordionPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Accordion</h1>
        <p className="mt-2 text-muted-foreground">
          A vertically stacked set of collapsible sections. Supports single and multiple expanded items.
        </p>
      </div>

      {/* Single Item */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Single Expand</h2>
          <p className="text-sm text-muted-foreground">Only one item can be expanded at a time.</p>
        </div>
        <Card>
          <CardContent>
            <Accordion defaultValue={["item-1"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern and uses proper ARIA
                  attributes for screen reader compatibility.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the rest of the design system.
                  You can customize it with your own classes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It uses CSS animations for smooth expand and collapse transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Multiple Items */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Multiple Expand</h2>
          <p className="text-sm text-muted-foreground">Multiple items can be expanded simultaneously.</p>
        </div>
        <Card>
          <CardContent>
            <Accordion multiple defaultValue={["faq-1", "faq-3"]}>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards, PayPal, and bank transfers.
                  Enterprise customers can also pay via invoice.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your subscription at any time from your account
                  settings. Your access will continue until the end of the billing period.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day money-back guarantee for all plans. Contact our
                  support team for assistance with refunds.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>How do I contact support?</AccordionTrigger>
                <AccordionContent>
                  You can reach our support team via email at support@example.com or
                  through the in-app chat available 24/7.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Icons</h2>
          <p className="text-sm text-muted-foreground">Accordion items with inline icons for visual categorization.</p>
        </div>
        <Card>
          <CardContent>
            <Accordion defaultValue={["icon-1"]}>
              <AccordionItem value="icon-1">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <UserIcon className="size-4" />
                    Profile Settings
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Manage your profile information including your name, email, avatar,
                  and bio. Changes are saved automatically.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="icon-2">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <ShieldIcon className="size-4" />
                    Security
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Configure two-factor authentication, manage active sessions, and
                  review your security audit log.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="icon-3">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <CreditCardIcon className="size-4" />
                    Billing
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  View your current plan, update payment methods, download invoices,
                  and manage your subscription.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="icon-4">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <BellIcon className="size-4" />
                    Notifications
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Control how and when you receive notifications via email, push, or
                  in-app alerts for various events.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* With Form Content */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Form Content</h2>
          <p className="text-sm text-muted-foreground">Accordion sections containing form inputs for settings panels.</p>
        </div>
        <Card>
          <CardContent>
            <Accordion defaultValue={["form-general"]}>
              <AccordionItem value="form-general">
                <AccordionTrigger>General Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="acc-name">Display Name</Label>
                      <Input id="acc-name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acc-email">Email Address</Label>
                      <Input id="acc-email" type="email" defaultValue="john@example.com" />
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm">Save</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="form-password">
                <AccordionTrigger>Change Password</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="acc-current">Current Password</Label>
                      <Input id="acc-current" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acc-new">New Password</Label>
                      <Input id="acc-new" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acc-confirm">Confirm Password</Label>
                      <Input id="acc-confirm" type="password" />
                    </div>
                    <Separator />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Cancel</Button>
                      <Button size="sm">Update password</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="form-notifications">
                <AccordionTrigger>Notification Preferences</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="acc-frequency">Email Frequency</Label>
                      <Input id="acc-frequency" defaultValue="Daily digest" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acc-slack">Slack Webhook URL</Label>
                      <Input id="acc-slack" placeholder="https://hooks.slack.com/..." />
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm">Save preferences</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
