import type { Meta, StoryObj } from "@storybook/react"
import { FormAutosaveIndicator } from "@/components/business/form/form-autosave-indicator";
import { FormDirtyWarning } from "@/components/business/form/form-dirty-warning";
import { FormErrorSummary } from "@/components/business/form/form-error-summary";
import { FormStepSummary } from "@/components/business/form/form-step-summary";
import { FormRepeater } from "@/components/business/form/form-repeater";
import { FormFieldGroup } from "@/components/business/form/form-field-group";
import { FormProgress } from "@/components/business/form/form-progress";
import { Button } from "@chaos_team/chaos-ui/ui"
import { Input } from "@chaos_team/chaos-ui/ui"
import { useState } from "react"

const FormMeta = {
  title: "Business/Form",
  parameters: { layout: "padded" },
} satisfies Meta

export default FormMeta
type Story = StoryObj<typeof FormMeta>

const sections = [
  { id: "name", title: "名称", description: "组织或个人名称" },
  { id: "email", title: "邮箱", description: "通知邮箱" },
  { id: "address", title: "地址", description: "物理地址", optional: true },
  { id: "tags", title: "标签", description: "用于分类" },
]

export const AutosaveStates: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="text-sm font-medium">AutosaveIndicator 状态</div>
      <FormAutosaveIndicator status="idle" />
      <FormAutosaveIndicator status="saving" />
      <FormAutosaveIndicator status="saved" lastSaved={Date.now() - 3000} />
      <FormAutosaveIndicator status="error" error={new Error("网络错误")} />
    </div>
  ),
}

export const DirtyWarningDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="space-y-3">
        <Button onClick={() => setOpen(true)}>显示离开确认</Button>
        <FormDirtyWarning
          open={open}
          onOpenChange={setOpen}
          onDiscard={() => setOpen(false)}
          onSave={async () => { await new Promise((r) => setTimeout(r, 800)); setOpen(false) }}
        />
      </div>
    )
  },
}

export const ErrorSummaryDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium">ErrorSummary</div>
      <FormErrorSummary
        errors={[
          { field: "name", message: "名称不能为空" },
          { field: "email", message: "邮箱格式不正确" },
          { field: "password", message: "密码至少 8 位" },
        ]}
        onJumpTo={(field) => console.info("jump to", field)}
      />
      <FormErrorSummary errors={[{ message: "服务器错误，请稍后重试" }]} />
    </div>
  ),
}

export const StepSummaryDemo: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <div className="text-sm font-medium">StepSummary 步骤汇总</div>
      <FormStepSummary
        steps={sections}
        values={{ name: "Chaos Design", email: "hi@chaos.com", address: "", tags: ["design-system", "ui"] }}
        onJumpTo={(id) => console.info("jump to", id)}
      />
    </div>
  ),
}

export const RepeaterDemo: Story = {
  render: () => {
    const [items, setItems] = useState<Array<{ name: string; email: string }>>([
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ])
    return (
      <div className="max-w-2xl space-y-3">
        <div className="text-sm font-medium">Repeater 字段数组</div>
        <FormRepeater
          value={items}
          onChange={setItems}
          defaultItem={() => ({ name: "", email: "" })}
          min={1}
          max={5}
          addLabel="添加成员"
          renderItem={(item, _i, { onChange, onRemove, canRemove }) => (
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={item.name}
                onChange={(e) => onChange({ ...item, name: e.target.value })}
                placeholder="姓名"
              />
              <div className="flex gap-1">
                <Input
                  value={item.email}
                  onChange={(e) => onChange({ ...item, email: e.target.value })}
                  placeholder="邮箱"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={onRemove}
                  disabled={!canRemove}
                  aria-label="删除"
                >
                  ×
                </Button>
              </div>
            </div>
          )}
        />
      </div>
    )
  },
}

export const FieldGroupDemo: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <div className="text-sm font-medium">FieldGroup 字段分组</div>
      <FormFieldGroup legend="基本信息" description="公开显示的信息" required columns={2}>
        <Input placeholder="名称" />
        <Input placeholder="邮箱" />
      </FormFieldGroup>
      <FormFieldGroup legend="偏好设置" description="个性化选项" columns={3}>
        <Input placeholder="语言" />
        <Input placeholder="时区" />
        <Input placeholder="主题" />
      </FormFieldGroup>
    </div>
  ),
}

export const ProgressDemo: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div className="text-sm font-medium">Progress 进度条变体</div>
      <FormProgress current={2} total={4} variant="bar" labels={["开始", "信息", "偏好", "完成"]} />
      <FormProgress current={3} total={5} variant="steps" />
      <FormProgress current={2} total={5} variant="dots" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <section>
        <h3 className="mb-2 text-sm font-medium">AutosaveIndicator</h3>
        <div className="grid grid-cols-2 gap-3">
          <FormAutosaveIndicator status="idle" />
          <FormAutosaveIndicator status="saving" />
          <FormAutosaveIndicator status="saved" lastSaved={Date.now() - 5000} />
          <FormAutosaveIndicator status="error" error={new Error("保存失败")} />
        </div>
      </section>
      <section>
        <h3 className="mb-2 text-sm font-medium">ErrorSummary</h3>
        <FormErrorSummary
          errors={[
            { field: "name", message: "名称不能为空" },
            { field: "email", message: "邮箱格式不正确" },
          ]}
        />
      </section>
      <section>
        <h3 className="mb-2 text-sm font-medium">StepSummary</h3>
        <FormStepSummary
          steps={sections}
          values={{ name: "Chaos", email: "hi@chaos.com" }}
        />
      </section>
      <section>
        <h3 className="mb-2 text-sm font-medium">Progress Variants</h3>
        <div className="space-y-3">
          <FormProgress current={2} total={4} variant="bar" />
          <FormProgress current={3} total={5} variant="steps" />
          <FormProgress current={2} total={5} variant="dots" />
        </div>
      </section>
    </div>
  ),
}
