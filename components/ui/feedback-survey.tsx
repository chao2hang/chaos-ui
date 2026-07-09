"use client";

import * as React from "react";
import {
  StarIcon,
  SendIcon,
  SmileIcon,
  FrownIcon,
  MehIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeedbackSurveyProps {
  /** Survey title / 调查标题 */
  title?: string;
  /** Survey description / 调查描述 */
  description?: string;
  /** Feedback type / 反馈类型 */
  type?: "rating" | "satisfaction" | "nps" | "thumbs" | "custom";
  /** For rating: max stars / 星级上限 */
  maxRating?: number;
  /** For NPS: min/max score */
  npsRange?: [number, number];
  /** Whether to show text feedback input / 是否显示文本反馈 */
  showTextFeedback?: boolean;
  /** Text feedback placeholder / 文本反馈占位 */
  feedbackPlaceholder?: string;
  /** Submit button text / 提交按钮文字 */
  submitLabel?: string;
  /** Current value (controlled) / 受控值 */
  value?: number;
  /** Default value (uncontrolled) / 默认值 */
  defaultValue?: number;
  /** Text feedback value / 文本反馈值 */
  feedbackText?: string;
  /** Called when value changes / 值变更回调 */
  onChange?: (value: number) => void;
  /** Called when submitted / 提交回调 */
  onSubmit?: (value: number, feedback: string) => void;
  /** Additional class / 额外类名 */
  className?: string;
  /** Whether the survey is disabled / 是否禁用 */
  disabled?: boolean;
  /** Whether the survey has been submitted / 是否已提交 */
  submitted?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function FeedbackSurvey({
  title = "说说你的体验",
  description,
  type = "rating",
  maxRating = 5,
  npsRange = [0, 10],
  showTextFeedback = true,
  feedbackPlaceholder = "告诉我们更多...",
  submitLabel = "提交反馈",
  value: controlledValue,
  defaultValue,
  feedbackText: controlledFeedback,
  onChange,
  onSubmit,
  className,
  disabled = false,
  submitted: controlledSubmitted,
}: FeedbackSurveyProps) {
  const [internalValue, setInternalValue] = React.useState<number | null>(
    defaultValue ?? null,
  );
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const [internalFeedback, setInternalFeedback] = React.useState("");
  const [internalSubmitted, setInternalSubmitted] = React.useState(false);

  const value = controlledValue ?? internalValue;
  const feedbackText =
    controlledFeedback ?? internalFeedback;
  const submitted = controlledSubmitted ?? internalSubmitted;
  const displayValue = hoverValue ?? value;

  const updateValue = (v: number) => {
    if (!controlledValue) setInternalValue(v);
    onChange?.(v);
  };

  const handleSubmit = () => {
    if (value != null) {
      setInternalSubmitted(true);
      onSubmit?.(value, feedbackText);
    }
  };

  // Submitted state
  if (submitted) {
    return (
      <div
        data-slot="feedback-survey"
        className={cn(
          "flex flex-col items-center gap-3 rounded-lg border p-6 text-center",
          className,
        )}
      >
        <ThumbsUpIcon className="size-10 text-green-500" />
        <h3 className="text-lg font-semibold">感谢你的反馈！</h3>
        <p className="text-sm text-muted-foreground">
          {value != null && `你给出了 ${value} 分的评价`}
        </p>
      </div>
    );
  }

  // Rating stars
  const renderRating = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const star = i + 1;
        const filled = displayValue != null && star <= displayValue;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => updateValue(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            className={cn(
              "transition-transform hover:scale-110",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <StarIcon
              className={cn(
                "size-8 transition-colors",
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/30",
              )}
            />
          </button>
        );
      })}
    </div>
  );

  // Satisfaction faces
  const renderSatisfaction = () => (
    <div className="flex items-center gap-4">
      {[
        { value: 1, icon: FrownIcon, color: "text-red-400", label: "不满意" },
        { value: 2, icon: MehIcon, color: "text-amber-400", label: "一般" },
        { value: 3, icon: SmileIcon, color: "text-green-400", label: "满意" },
      ].map((face) => {
        const Icon = face.icon;
        const selected = value === face.value;
        return (
          <button
            key={face.value}
            type="button"
            disabled={disabled}
            onClick={() => updateValue(face.value)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg p-3 transition-all",
              selected && "bg-accent ring-2 ring-primary/30",
              !selected && "hover:bg-muted/50",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <Icon className={cn("size-10", face.color)} />
            <span className="text-xs">{face.label}</span>
          </button>
        );
      })}
    </div>
  );

  // NPS (0-10)
  const renderNPS = () => {
    const [min, max] = npsRange;
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: max - min + 1 }, (_, i) => {
            const n = min + i;
            const selected = displayValue != null && n === displayValue;
            return (
              <button
                key={n}
                type="button"
                disabled={disabled}
                onClick={() => updateValue(n)}
                onMouseEnter={() => setHoverValue(n)}
                onMouseLeave={() => setHoverValue(null)}
                className={cn(
                  "size-8 rounded-md text-xs font-medium transition-all",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/20",
                  disabled && "cursor-not-allowed opacity-50",
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div className="flex w-full justify-between text-[10px] text-muted-foreground">
          <span>不太可能</span>
          <span>非常可能</span>
        </div>
      </div>
    );
  };

  // Thumbs up/down
  const renderThumbs = () => (
    <div className="flex items-center gap-4">
      {[
        { value: 1, icon: ThumbsUpIcon, color: "text-green-500", label: "有帮助" },
        { value: -1, icon: ThumbsUpIcon, color: "text-red-400", label: "没帮助", flip: true },
      ].map((btn) => {
        const Icon = btn.icon;
        const selected = value === btn.value;
        return (
          <button
            key={btn.value}
            type="button"
            disabled={disabled}
            onClick={() => updateValue(selected ? 0 : btn.value)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-3 transition-all min-w-[80px]",
              selected && "bg-accent border-primary/30",
              !selected && "hover:bg-muted/50",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <Icon
              className={cn(
                "size-8",
                btn.color,
                btn.flip && "rotate-180",
              )}
            />
            <span className="text-xs">{btn.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      data-slot="feedback-survey"
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border p-6",
        className,
      )}
    >
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {/* Rating display */}
      {type === "rating" && renderRating()}
      {type === "satisfaction" && renderSatisfaction()}
      {type === "nps" && renderNPS()}
      {type === "thumbs" && renderThumbs()}

      {/* Text feedback */}
      {showTextFeedback && (
        <textarea
          value={feedbackText}
          onChange={(e) => setInternalFeedback(e.target.value)}
          placeholder={feedbackPlaceholder}
          disabled={disabled}
          rows={3}
          className={cn(
            "w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm",
            "outline-none resize-none transition-colors",
            "placeholder:text-muted-foreground",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled || value == null}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
          "hover:bg-primary/90 transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        <SendIcon className="size-3.5" />
        {submitLabel}
      </button>
    </div>
  );
}

export { FeedbackSurvey };
export type { FeedbackSurveyProps };
