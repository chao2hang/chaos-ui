"use client"

import * as React from "react"
import { PageHeader } from "@/components/business/page-header"
import { StatusTag } from "@/components/business/status-tag"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PencilIcon, TrashIcon, CopyIcon } from "lucide-react"

export default function DetailPagePattern() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ORD-001"
        breadcrumbItems={[
          { label: "Dashboard", href: "#" },
          { label: "Orders", href: "#" },
          { label: "ORD-001" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <StatusTag status="completed" />
            <Button variant="outline" size="sm">
              <CopyIcon />
              Duplicate
            </Button>
            <Button variant="outline" size="sm">
              <PencilIcon />
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              <TrashIcon />
              Delete
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Name</dt>
                    <dd className="font-medium">Olivia Martin</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="font-medium">olivia@example.com</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd className="font-medium">+1 (555) 123-4567</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Date</dt>
                    <dd className="font-medium">January 15, 2024</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Payment</dt>
                    <dd className="font-medium">Credit Card</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Total</dt>
                    <dd className="text-lg font-bold">$1,250.00</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">123 Main Street, Apt 4B<br />New York, NY 10001<br />United States</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="items" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Wireless Headphones</TableCell>
                    <TableCell>WH-1000</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    <TableCell className="text-right font-medium">$500.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">USB-C Cable</TableCell>
                    <TableCell>UC-050</TableCell>
                    <TableCell className="text-right">5</TableCell>
                    <TableCell className="text-right">$15.00</TableCell>
                    <TableCell className="text-right font-medium">$75.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Laptop Stand</TableCell>
                    <TableCell>LS-200</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">$675.00</TableCell>
                    <TableCell className="text-right font-medium">$675.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { time: "Jan 15, 2024 3:45 PM", event: "Order marked as completed", user: "System" },
                  { time: "Jan 15, 2024 2:30 PM", event: "Payment confirmed", user: "Payment Gateway" },
                  { time: "Jan 15, 2024 10:15 AM", event: "Order shipped", user: "Warehouse" },
                  { time: "Jan 14, 2024 4:00 PM", event: "Order created", user: "Olivia Martin" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-primary" />
                      {i < 3 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium">{item.event}</p>
                      <p className="text-xs text-muted-foreground">{item.time} · {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">No notes added yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
