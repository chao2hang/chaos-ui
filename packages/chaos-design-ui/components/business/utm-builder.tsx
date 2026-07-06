"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CopyIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface UtmBuilderProps extends React.ComponentProps<"div"> {
  baseUrl?: string;
  onChange?: (url: string) => void;
  className?: string;
}

function UtmBuilder({
  baseUrl = "",
  onChange,
  className,
  ...props
}: UtmBuilderProps) {
  const [source, setSource] = React.useState("");
  const [medium, setMedium] = React.useState("");
  const [campaign, setCampaign] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [content, setContent] = React.useState("");

  const buildUrl = (): string => {
    if (!baseUrl) return "";
    const params = new URLSearchParams();
    if (source) params.set("utm_source", source);
    if (medium) params.set("utm_medium", medium);
    if (campaign) params.set("utm_campaign", campaign);
    if (term) params.set("utm_term", term);
    if (content) params.set("utm_content", content);
    const qs = params.toString();
    return qs ? `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${qs}` : baseUrl;
  };

  const url = buildUrl();

  React.useEffect(() => {
    onChange?.(url);
  }, [url, onChange]);

  const copyUrl = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    toast.success("已复制到剪贴板");
  };

  return (
    <div
      data-slot="utm-builder"
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">基础 URL</Label>
          <Input
            value={baseUrl}
            readOnly
            className="bg-muted/30 h-8 font-mono text-xs"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">utm_source *</Label>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="google / newsletter / twitter"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">utm_medium *</Label>
            <Input
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="cpc / email / social"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">utm_campaign</Label>
            <Input
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="spring_sale"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">utm_term</Label>
            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="running+shoes"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs">utm_content</Label>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="logolink / textlink"
              className="h-8 text-sm"
            />
          </div>
        </div>
      </div>
      {url && (
        <div className="bg-muted/20 space-y-2 rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <LinkIcon className="text-muted-foreground size-4" />
            <span className="text-muted-foreground text-xs font-medium">
              生成的 URL
            </span>
          </div>
          <p className="font-mono text-xs break-all">{url}</p>
          <Button size="sm" variant="outline" onClick={copyUrl}>
            <CopyIcon /> 复制
          </Button>
        </div>
      )}
    </div>
  );
}

export { UtmBuilder };
export type { UtmBuilderProps };
