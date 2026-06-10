"use client"

import * as React from "react"
import { DetailLayout } from "@/components/layout/detail-layout"
import type { DetailTab } from "@/components/layout/detail-layout"
import { StatusTag } from "@/components/business/status-tag"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PencilIcon, TrashIcon } from "lucide-react"

const overviewContent = (
  <div className="grid gap-4 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-medium">Wireless Headphones</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">SKU</dt>
            <dd className="font-medium">WH-1000</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Category</dt>
            <dd className="font-medium">Electronics</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Status</dt>
            <dd><StatusTag status="approved" /></dd>
          </div>
        </dl>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Pricing & Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Price</dt>
            <dd className="font-medium">$250.00</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Cost</dt>
            <dd className="font-medium">$120.00</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Stock</dt>
            <dd className="font-medium">145 units</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Revenue</dt>
            <dd className="text-lg font-bold">$36,250.00</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  </div>
)

const variantsContent = (
  <Card>
    <CardContent className="pt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Variant</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Black</TableCell>
            <TableCell>WH-1000-BK</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">85</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">White</TableCell>
            <TableCell>WH-1000-WH</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">42</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Silver</TableCell>
            <TableCell>WH-1000-SV</TableCell>
            <TableCell className="text-right">$280.00</TableCell>
            <TableCell className="text-right">18</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const tabs: DetailTab[] = [
  { value: "overview", label: "Overview", content: overviewContent },
  { value: "variants", label: "Variants", content: variantsContent },
  {
    value: "reviews",
    label: "Reviews",
    content: (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        </CardContent>
      </Card>
    ),
  },
]

export default function DetailLayoutPage() {
  return (
    <DetailLayout
      title="Wireless Headphones"
      subtitle="SKU: WH-1000 · Electronics"
      tabs={tabs}
      actions={
        <>
          <Button variant="outline" size="sm">
            <PencilIcon />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <TrashIcon />
            Delete
          </Button>
        </>
      }
      onBack={() => {}}
    />
  )
}
