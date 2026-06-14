"use client";

import * as React from "react";
import { SearchIcon, StarIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export interface AdvancedSearchField {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export type AdvancedSearchValues = Record<string, string>;

export interface SavedSearch {
  id: string;
  label: string;
  values: AdvancedSearchValues;
}

export interface AdvancedSearchProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  fields: AdvancedSearchField[];
  savedSearches?: SavedSearch[];
  defaultValues?: AdvancedSearchValues;
  onSearch?: (values: AdvancedSearchValues) => void;
  onSaveSearch?: (values: AdvancedSearchValues) => void;
}

export function AdvancedSearch({
  fields,
  savedSearches = [],
  defaultValues = {},
  onSearch,
  onSaveSearch,
  className,
  ...props
}: AdvancedSearchProps) {
  const { t } = useTranslation("data");
  const [values, setValues] =
    React.useState<AdvancedSearchValues>(defaultValues);

  const setValue = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  return (
    <form
      data-slot="advanced-search"
      className={cn("space-y-4 rounded-lg border p-4", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(values);
      }}
      {...props}
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="advanced-search-query">
            {t("advancedSearch.label")}
          </Label>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="advanced-search-query"
              className="pl-8"
              placeholder={t("advancedSearch.placeholder")}
              value={values.query ?? ""}
              onChange={(event) => setValue("query", event.target.value)}
            />
          </div>
        </div>
        {fields.map((field) => (
          <div key={field.key} className="min-w-40 space-y-1.5">
            <Label>{field.label}</Label>
            <Select
              value={values[field.key] ?? ""}
              onValueChange={(value) => {
                if (value) setValue(field.key, value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("advancedSearch.any")} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      {savedSearches.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t("advancedSearch.saved")}
          </span>
          {savedSearches.map((saved) => (
            <Button
              key={saved.id}
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto rounded-full p-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => setValues(saved.values)}
            >
              <Badge variant="outline">{saved.label}</Badge>
            </Button>
          ))}
        </div>
      )}
      <div className="flex justify-end gap-2">
        {onSaveSearch && (
          <Button
            type="button"
            variant="outline"
            onClick={() => onSaveSearch(values)}
          >
            <StarIcon />
            {t("advancedSearch.saveFilter")}
          </Button>
        )}
        <Button type="submit">
          <SearchIcon />
          {t("advancedSearch.label")}
        </Button>
      </div>
    </form>
  );
}
