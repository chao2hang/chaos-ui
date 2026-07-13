import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhoneInput } from "./phone-input";

describe("PhoneInput", () => {
  it("renders country select and phone field", () => {
    const { container } = render(<PhoneInput placeholder="手机号" />);
    expect(container.querySelector('[data-slot="phone-input"]')).not.toBeNull();
    expect(screen.getByPlaceholderText("手机号")).toBeDefined();
    expect(screen.getByLabelText("Select country code")).toBeDefined();
  });

  it("strips non-digits and emits full number on change", () => {
    const onChange = vi.fn();
    render(
      <PhoneInput defaultCountry="+86" onChange={onChange} placeholder="p" />,
    );
    fireEvent.change(screen.getByPlaceholderText("p"), {
      target: { value: "138-0013-8000" },
    });
    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls.at(-1)![0];
    expect(last.countryCode).toBe("+86");
    expect(last.phone).toBe("13800138000");
    expect(last.full).toBe("+8613800138000");
  });

  it("updates country code", () => {
    const onChange = vi.fn();
    render(<PhoneInput onChange={onChange} defaultValue="100" />);
    fireEvent.change(screen.getByLabelText("Select country code"), {
      target: { value: "+1" },
    });
    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls.at(-1)![0];
    expect(last.countryCode).toBe("+1");
    expect(last.full).toBe("+1100");
  });
});
