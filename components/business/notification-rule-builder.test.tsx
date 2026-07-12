import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationRuleBuilder } from "./notification-rule-builder";
import type { NotificationRule } from "./notification-rule-builder";

vi.mock("@/components/ui/icons", () => ({
  PlusIcon: (p: Record<string, unknown>) => <svg data-testid="plus" {...p} />,
  Trash2Icon: (p: Record<string, unknown>) => (
    <svg data-testid="trash" {...p} />
  ),
  BellIcon: (p: Record<string, unknown>) => <svg data-testid="bell" {...p} />,
  MailIcon: (p: Record<string, unknown>) => <svg data-testid="mail" {...p} />,
  MessageSquareIcon: (p: Record<string, unknown>) => (
    <svg data-testid="msg" {...p} />
  ),
  GlobeIcon: (p: Record<string, unknown>) => <svg data-testid="globe" {...p} />,
  CopyIcon: (p: Record<string, unknown>) => <svg data-testid="copy" {...p} />,
  ChevronDownIcon: (p: Record<string, unknown>) => (
    <svg data-testid="chevron-down" {...p} />
  ),
}));

vi.mock("@/components/ui/switch", () => ({
  Switch: ({
    checked,
    onCheckedChange,
    disabled,
  }: {
    checked: boolean;
    onCheckedChange: (v: boolean) => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Enable rule"
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      data-checked={checked}
    />
  ),
}));

const baseRule: NotificationRule = {
  id: "1",
  name: "High Value Order Alert",
  event: "order.created",
  enabled: true,
  conditions: [{ id: "c1", field: "amount", operator: "gt", value: "10000" }],
  recipients: [{ id: "r1", type: "role", target: "manager" }],
  channels: ["email", "inApp"],
  priority: "high",
};

const recipientOptions = [
  { type: "user" as const, label: "Alice Chen", value: "u1" },
  { type: "user" as const, label: "Bob Smith", value: "u2" },
  { type: "role" as const, label: "Manager", value: "manager" },
  { type: "role" as const, label: "Finance Team", value: "finance" },
  { type: "group" as const, label: "All Staff", value: "all" },
];

const templates = [
  { id: "t1", name: "Order Alert Template" },
  { id: "t2", name: "Urgent Notification" },
];

describe("NotificationRuleBuilder", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <NotificationRuleBuilder
        rule={baseRule}
        recipientOptions={recipientOptions}
        templates={templates}
      />,
    );
    expect(
      container.querySelector('[data-slot="notification-rule-builder"]'),
    ).toBeTruthy();
  });

  it("renders rule name in input", () => {
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        recipientOptions={recipientOptions}
      />,
    );
    expect(screen.getByDisplayValue("High Value Order Alert")).toBeTruthy();
  });

  it("shows event dropdown", () => {
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        recipientOptions={recipientOptions}
      />,
    );
    const eventSelect = screen.getByLabelText("Event trigger");
    expect((eventSelect as HTMLSelectElement).value).toBe("order.created");
  });

  it("renders existing conditions", () => {
    const { container } = render(
      <NotificationRuleBuilder
        rule={baseRule}
        recipientOptions={recipientOptions}
      />,
    );
    const conditions = container.querySelectorAll(
      '[data-slot="rule-condition"]',
    );
    expect(conditions.length).toBe(1);
  });

  it("renders existing recipients", () => {
    const { container } = render(
      <NotificationRuleBuilder
        rule={baseRule}
        recipientOptions={recipientOptions}
      />,
    );
    const recipients = container.querySelectorAll(
      '[data-slot="rule-recipient"]',
    );
    expect(recipients.length).toBe(1);
  });

  it("calls onChange when name is changed", () => {
    const onChange = vi.fn();
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        onChange={onChange}
        recipientOptions={recipientOptions}
      />,
    );
    const nameInput = screen.getByDisplayValue("High Value Order Alert");
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Updated Name" }),
    );
  });

  it("adds condition when Add button is clicked", () => {
    const onChange = vi.fn();
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        onChange={onChange}
        recipientOptions={recipientOptions}
      />,
    );
    const addButtons = screen.getAllByText("Add");
    fireEvent.click(addButtons[0]!); // First Add = conditions
    expect(onChange).toHaveBeenCalled();
    const updated = onChange.mock.calls[0]![0]! as NotificationRule;
    expect(updated.conditions.length).toBe(2);
  });

  it("removes condition when trash button is clicked", () => {
    const onChange = vi.fn();
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        onChange={onChange}
        recipientOptions={recipientOptions}
      />,
    );
    const removeBtns = screen.getAllByLabelText("Remove condition");
    fireEvent.click(removeBtns[0]!);
    expect(onChange).toHaveBeenCalled();
    const updated = onChange.mock.calls[0]![0]! as NotificationRule;
    expect(updated.conditions.length).toBe(0);
  });

  it("toggles channel when clicked", () => {
    const onChange = vi.fn();
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        onChange={onChange}
        recipientOptions={recipientOptions}
      />,
    );
    const smsChannel = screen.getByText("SMS");
    fireEvent.click(smsChannel);
    expect(onChange).toHaveBeenCalled();
    const updated = onChange.mock.calls[0]![0]! as NotificationRule;
    expect(updated.channels).toContain("sms");
  });

  it("toggles enabled switch", () => {
    const onChange = vi.fn();
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        onChange={onChange}
        recipientOptions={recipientOptions}
      />,
    );
    const sw = screen.getByRole("switch");
    fireEvent.click(sw);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false }),
    );
  });

  it("shows template dropdown when templates are provided", () => {
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        recipientOptions={recipientOptions}
        templates={templates}
      />,
    );
    expect(screen.getByLabelText("Message template")).toBeTruthy();
  });

  it("renders empty condition message when no conditions", () => {
    const emptyRule: NotificationRule = { ...baseRule, conditions: [] };
    render(
      <NotificationRuleBuilder
        rule={emptyRule}
        recipientOptions={recipientOptions}
      />,
    );
    expect(screen.getByText(/No conditions/)).toBeTruthy();
  });

  it("does not show action buttons in read-only mode", () => {
    render(
      <NotificationRuleBuilder
        rule={baseRule}
        readOnly
        recipientOptions={recipientOptions}
      />,
    );
    expect(screen.queryAllByLabelText("Remove condition").length).toBe(0);
    expect(screen.queryAllByText("Add").length).toBe(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <NotificationRuleBuilder
        rule={baseRule}
        recipientOptions={recipientOptions}
        className="custom-rule"
      />,
    );
    const el = container.querySelector(
      '[data-slot="notification-rule-builder"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-rule");
  });
});
