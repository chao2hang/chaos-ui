"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

export interface SocialShareProps {
  /** URL to share. */
  url?: string;
  /** Title for the shared content. */
  title?: string;
  /** Platforms to show. Default: wechat, weibo, qq, link. */
  platforms?: ("wechat" | "weibo" | "qq" | "link")[];
  /** Additional class names. */
  className?: string;
}

const platformColors = {
  wechat: "#07C160",
  weibo: "#E6162D",
  qq: "#12B7F5",
  link: "#6B7280",
} as const;

type PlatformKey = keyof typeof platformColors;

/**
 * @component SocialShare
 * @category business/marketing
 * @since 1.1.0
 * @description Social sharing bar with WeChat, Weibo, QQ, and copy link buttons / 社交分享栏，支持微信、微博、QQ、复制链接
 * @keywords share, social, wechat, weibo, qq, link, marketing
 * @example
 * <SocialShare url="https://example.com" title="Check this out" />
 */
function SocialShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title,
  platforms = ["wechat", "weibo", "qq", "link"],
  className,
}: SocialShareProps) {
  const { t } = useTranslation("social");
  const [copied, copy] = useCopyToClipboard();

  const platformLabels: Record<PlatformKey, string> = {
    wechat: t("wechat", { defaultValue: "WeChat" }),
    weibo: t("weibo", { defaultValue: "Weibo" }),
    qq: t("qq", { defaultValue: "QQ" }),
    link: t("copyLink", { defaultValue: "Copy Link" }),
  };

  const share = (platform: PlatformKey) => {
    const shareUrl = encodeURIComponent(url);
    const shareTitle = encodeURIComponent(title ?? document.title);
    switch (platform) {
      case "weibo":
        window.open(
          `https://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`,
          "_blank",
        );
        break;
      case "qq":
        window.open(
          `https://connect.qq.com/widget/shareqq/index.html?url=${shareUrl}&title=${shareTitle}`,
          "_blank",
        );
        break;
      case "link":
        copy(url);
        break;
      default:
        break;
    }
  };

  return (
    <div
      data-slot="social-share"
      className={cn("flex items-center gap-2", className)}
    >
      {platforms.map((p) => {
        const color = platformColors[p];
        return (
          <Button
            key={p}
            variant="outline"
            size="sm"
            onClick={() => share(p as PlatformKey)}
            style={{
              borderColor: color,
              color,
            }}
          >
            {p === "link" && copied ? (
              <CheckIcon />
            ) : (
              <span>{platformLabels[p]}</span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

export { SocialShare };
