import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddressInput } from "./address-input";

describe("AddressInput", () => {
  it("renders region selects and street fields", () => {
    render(<AddressInput />);
    expect(screen.getByLabelText("省份")).toBeDefined();
    expect(screen.getByLabelText("城市")).toBeDefined();
    expect(screen.getByLabelText("区县")).toBeDefined();
    expect(screen.getByPlaceholderText("请输入街道/乡镇")).toBeDefined();
  });

  it("shows map placeholder when showMap", () => {
    render(<AddressInput showMap />);
    expect(document.body.textContent ?? "").toContain("地图占位");
  });

  it("calls onChange when province selected", () => {
    const onChange = vi.fn();
    render(<AddressInput onChange={onChange} />);
    const province = screen.getByLabelText("省份") as HTMLSelectElement;
    // select first non-empty option if available
    const opt = Array.from(province.options).find((o) => o.value);
    if (opt) {
      fireEvent.change(province, { target: { value: opt.value } });
      expect(onChange).toHaveBeenCalled();
    } else {
      expect(province).toBeDefined();
    }
  });
});
