"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button, Stepper, Step } from "@chaos_team/chaos-ui/ui";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from "@chaos_team/chaos-ui/ui-icons";

type WizardRenderContext = {
  formData: Record<string, unknown>;
  updateField: (key: string, value: unknown) => void;
  errors: Record<string, string>;
};

/**
 * @component FormWizard
 * @category business/ux
 * @since 0.2.0
 * @description Multi-step form wizard with stepper navigation, per-step validation, and progressive data collection / 多步骤表单向导，支持步骤导航、逐步验证和渐进式数据收集
 * @keywords form, wizard, multi-step, stepper, validation
 * @example
 * <FormWizard steps={[{ title: "Step 1", render: (ctx) => <Input onChange={e => ctx.updateField("name", e.target.value)} /> }]} />
 */
function FormWizard({
  steps,
  onComplete,
  className,
}: {
  steps: {
    title: string;
    description?: string;
    render: (context: WizardRenderContext) => React.ReactNode;
    validate?: (data: Record<string, unknown>) => Record<string, string>;
  }[];
  onComplete?: (data: Record<string, unknown>) => void;
  className?: string;
}) {
  const { t } = useTranslation("navigation");
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<Record<string, unknown>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const step = steps[currentStep] ?? { title: "", render: () => null };
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const validate = (): boolean => {
    if (!step.validate) return true;
    const stepErrors = step.validate ? step.validate(formData) : {};
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = (): void => {
    if (!validate()) return;
    if (isLast) {
      onComplete?.(formData);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = (): void => {
    setErrors({});
    setCurrentStep((s) => s - 1);
  };

  const updateField = (key: string, value: unknown): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next: Record<string, string> = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  return (
    <div data-slot="form-wizard" className={cn("space-y-6", className)}>
      <Stepper activeStep={currentStep}>
        {steps.map((s) => (
          <Step key={s.title}>{s.title}</Step>
        ))}
      </Stepper>

      <div className="min-h-[200px] rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
        {step.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {step.description}
          </p>
        )}
        {step.render({ formData, updateField, errors })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={isFirst}>
          <ChevronLeftIcon className="size-4 mr-1" />
          {t("formWizard.back")}
        </Button>
        <Button onClick={handleNext}>
          {isLast ? (
            <>
              <CheckIcon className="size-4 mr-1" /> {t("formWizard.submit")}
            </>
          ) : (
            <>
              {t("formWizard.next")}{" "}
              <ChevronRightIcon className="size-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export { FormWizard };
export type { WizardRenderContext };
