"use client"

import * as React from "react"
import { UsersIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FilterBuilder } from "@/components/business/filter-builder"
import { Transfer, TransferItem } from "@/components/business/transfer"
import { cn } from "@/lib/utils"

export interface AudienceSegmentBuilderProps {
  fields: Array<{ key: string; label: string }>
  segments: TransferItem[]
  selectedSegmentKeys?: string[]
  onSegmentsChange?: (keys: string[]) => void
  onFiltersChange?: (result: {
    logic: string
    filters: { field: string; operator: string; value: string }[]
  }) => void
  estimatedSize?: number
  className?: string
}

export function AudienceSegmentBuilder({
  fields,
  segments,
  selectedSegmentKeys = [],
  onSegmentsChange,
  onFiltersChange,
  estimatedSize,
  className,
}: AudienceSegmentBuilderProps) {
  const [localKeys, setLocalKeys] = React.useState(selectedSegmentKeys)
  const keys = onSegmentsChange ? selectedSegmentKeys : localKeys

  const handleKeysChange = (next: string[]) => {
    setLocalKeys(next)
    onSegmentsChange?.(next)
  }

  return (
    <Card data-slot="audience-segment-builder" className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UsersIcon className="size-4" />
          Audience segment
        </CardTitle>
        <CardDescription>
          Combine reusable segments with rule-based filters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{keys.length} saved segments</Badge>
          {estimatedSize !== undefined && (
            <Badge variant="outline">{estimatedSize.toLocaleString()} estimated users</Badge>
          )}
        </div>
        <Transfer
          dataSource={segments}
          targetKeys={keys}
          onChange={handleKeysChange}
          titles={["Available", "Included"]}
          className="min-w-0"
        />
        <div className="rounded-lg border p-4">
          <FilterBuilder fields={fields} onChange={onFiltersChange} />
        </div>
      </CardContent>
    </Card>
  )
}
