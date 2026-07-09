"use client";

import * as React from "react";
import { UsersIcon } from "@chaos_team/chaos-ui/ui-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";
import { Badge } from "@chaos_team/chaos-ui/ui";
import { FilterBuilder } from "@chaos_team/chaos-ui/business";
import { Transfer } from "@chaos_team/chaos-ui/ui";
import type { TransferItem } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface AudienceSegmentBuilderProps {
  fields: Array<{ key: string; label: string }>;
  segments: TransferItem[];
  selectedSegmentKeys?: string[];
  onSegmentsChange?: (keys: string[]) => void;
  onFiltersChange?: (result: {
    logic: string;
    filters: { field: string; operator: string; value: string }[];
  }) => void;
  estimatedSize?: number;
  className?: string;
}

/**
 * @component AudienceSegmentBuilder
 * @category business/ux
 * @since 0.2.0
 * @description Compose audience groups from reusable segments and rule-based filters / 通过复用群体和规则筛选组合目标用户群
 * @keywords audience, segment, filter, targeting, users
 * @example
 * <AudienceSegmentBuilder fields={[{ key: "country", label: "Country" }]} segments={[{ key: "vip", title: "VIP" }]} />
 */
export function AudienceSegmentBuilder({
  fields,
  segments,
  selectedSegmentKeys = [],
  onSegmentsChange,
  onFiltersChange,
  estimatedSize,
  className,
}: AudienceSegmentBuilderProps) {
  const [localKeys, setLocalKeys] = React.useState(selectedSegmentKeys);
  const keys = onSegmentsChange ? selectedSegmentKeys : localKeys;

  const handleKeysChange = (next: string[]) => {
    setLocalKeys(next);
    onSegmentsChange?.(next);
  };

  return (
    <Card
      data-slot="audience-segment-builder"
      className={cn("overflow-hidden", className)}
    >
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
            <Badge variant="outline">
              {estimatedSize.toLocaleString()} estimated users
            </Badge>
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
          <FilterBuilder
            fields={fields}
            {...(onFiltersChange ? { onChange: onFiltersChange } : {})}
          />
        </div>
      </CardContent>
    </Card>
  );
}
