"use client"

import * as React from "react"
import { PageHeader } from "@/components/business/page-header"
import { FormField } from "@/components/business/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeftIcon, SaveIcon } from "lucide-react"

export default function FormPagePattern() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Product"
        description="Add a new product to your catalog"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>
              <SaveIcon />
              Save Product
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the product details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Product Name" required>
              <Input placeholder="e.g. Wireless Headphones" />
            </FormField>

            <FormField label="SKU" required>
              <Input placeholder="e.g. WH-1000" />
            </FormField>

            <FormField label="Category" required>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Status" required>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Description" description="Brief description of the product for customers." className="md:col-span-2">
              <Textarea placeholder="Describe the product..." className="min-h-24" />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>Set pricing and inventory details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Price" required>
              <Input type="number" placeholder="0.00" />
            </FormField>

            <FormField label="Compare at Price" description="Original price before discount.">
              <Input type="number" placeholder="0.00" />
            </FormField>

            <FormField label="Cost per Item">
              <Input type="number" placeholder="0.00" />
            </FormField>

            <FormField label="Stock Quantity">
              <Input type="number" placeholder="0" />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>
          <SaveIcon />
          Save Product
        </Button>
      </div>
    </div>
  )
}
