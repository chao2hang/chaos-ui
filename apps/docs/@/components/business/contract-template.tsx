"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, EyeIcon, DownloadIcon } from "lucide-react";

export interface ContractField {
  key: string;
  label: string;
  value: string;
  type?: "text" | "textarea";
}

interface ContractTemplateProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  title?: string;
  fields: ContractField[];
  onChange?: (fields: ContractField[]) => void;
  onPreview?: () => void;
  onDownload?: () => void;
  className?: string;
}

function ContractTemplate({
  title = "合同模板",
  fields,
  onChange,
  onPreview,
  onDownload,
  className,
  ...props
}: ContractTemplateProps) {
  const handleChange = (key: string, value: string) => {
    onChange?.(fields.map((f) => (f.key === key ? { ...f, value } : f)));
  };

  return (
    <Card data-slot="contract-template" className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileTextIcon className="size-4" />
          {title}
        </CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onPreview}>
            <EyeIcon /> 预览
          </Button>
          <Button size="sm" variant="outline" onClick={onDownload}>
            <DownloadIcon /> 下载
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) =>
          field.type === "textarea" ? (
            <div key={field.key} className="space-y-1.5">
              <label className="text-sm font-medium">{field.label}</label>
              <Textarea
                value={field.value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
              />
            </div>
          ) : (
            <div key={field.key} className="space-y-1.5">
              <label className="text-sm font-medium">{field.label}</label>
              <Input
                value={field.value}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );
}

export { ContractTemplate };
export type { ContractTemplateProps };
