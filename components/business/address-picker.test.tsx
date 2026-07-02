import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddressPicker } from "./address-picker";
import type { AddressPickerProps, AddressOption } from "./address-picker";

const EMPTY: string[] = [];

const CUSTOM_DATA: AddressOption[] = [
  {
    code: "P1",
    name: "TestProvince",
    children: [
      {
        code: "C1",
        name: "TestCity",
        children: [
          { code: "D1", name: "TestDistrict" },
          { code: "D2", name: "AnotherDistrict" },
        ],
      },
    ],
  },
];

describe("AddressPicker", () => {
  it("exports the component and types", () => {
    expect(AddressPicker).toBeDefined();
    const _p: AddressPickerProps = { value: EMPTY };
    expect(_p.value).toEqual([]);
  });

  it("renders trigger with placeholder when value is empty", () => {
    render(<AddressPicker value={EMPTY} placeholder="Pick address" />);
    expect(screen.getByText("Pick address")).toBeDefined();
  });

  it("renders with default placeholder when none provided", () => {
    render(<AddressPicker value={EMPTY} />);
    expect(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740")).toBeDefined();
  });

  it("opens popover on click and shows provinces in first column", async () => {
    render(<AddressPicker value={EMPTY} options={CUSTOM_DATA} />);
    fireEvent.click(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740"));
    await waitFor(() => {
      expect(screen.getByText("TestProvince")).toBeDefined();
    });
  });

  it("uses built-in sample data when options prop is not provided", () => {
    render(<AddressPicker value={EMPTY} />);
    fireEvent.click(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740"));
    waitFor(() => {
      expect(screen.getByText("\u5317\u4eac\u5e02")).toBeDefined();
    });
  });

  it("cascading: selecting province shows cities in second column", async () => {
    render(<AddressPicker value={EMPTY} options={CUSTOM_DATA} />);
    fireEvent.click(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740"));
    await waitFor(() => expect(screen.getByText("TestProvince")).toBeDefined());
    fireEvent.click(screen.getByText("TestProvince"));
    await waitFor(() => expect(screen.getByText("TestCity")).toBeDefined());
  });

  it("cascading: selecting city shows districts in third column", async () => {
    render(<AddressPicker value={EMPTY} options={CUSTOM_DATA} />);
    fireEvent.click(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740"));
    await waitFor(() => expect(screen.getByText("TestProvince")).toBeDefined());
    fireEvent.click(screen.getByText("TestProvince"));
    await waitFor(() => expect(screen.getByText("TestCity")).toBeDefined());
    fireEvent.click(screen.getByText("TestCity"));
    await waitFor(() => expect(screen.getByText("TestDistrict")).toBeDefined());
  });

  it("search filters options within a column", async () => {
    render(<AddressPicker value={EMPTY} options={CUSTOM_DATA} />);
    fireEvent.click(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740"));
    await waitFor(() => expect(screen.getByText("TestProvince")).toBeDefined());
    fireEvent.click(screen.getByText("TestProvince"));
    await waitFor(() => expect(screen.getByText("TestCity")).toBeDefined());
    fireEvent.click(screen.getByText("TestCity"));
    await waitFor(() => expect(screen.getByText("TestDistrict")).toBeDefined());

    // Type in the district-level search
    const searchInputs = screen.getAllByRole("textbox");
    const districtSearch = searchInputs[searchInputs.length - 1];
    fireEvent.change(districtSearch!, { target: { value: "Another" } });
    expect(screen.getByText("AnotherDistrict")).toBeDefined();
    expect(screen.queryByText("TestDistrict")).toBeNull();
  });

  it("displays labels joined with / when value is provided", () => {
    render(
      <AddressPicker
        value={["330000", "330100", "330106"]}
      />,
    );
    expect(screen.getByText("\u6d59\u6c5f\u7701 / \u676d\u5dde\u5e02 / \u897f\u6e56\u533a")).toBeDefined();
  });

  it("onChange fires with codes and labels on full selection", async () => {
    const onChange = vi.fn();
    render(<AddressPicker value={EMPTY} options={CUSTOM_DATA} onChange={onChange} />);
    fireEvent.click(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740"));
    await waitFor(() => expect(screen.getByText("TestProvince")).toBeDefined());
    fireEvent.click(screen.getByText("TestProvince"));
    await waitFor(() => expect(screen.getByText("TestCity")).toBeDefined());
    fireEvent.click(screen.getByText("TestCity"));
    await waitFor(() => expect(screen.getByText("TestDistrict")).toBeDefined());
    fireEvent.click(screen.getByText("TestDistrict"));
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const [codes, labels] = onChange.mock.calls[0]!;
    expect(codes).toEqual(["P1", "C1", "D1"]);
    expect(labels).toEqual(["TestProvince", "TestCity", "TestDistrict"]);
  });

  it("disabled state prevents opening", () => {
    render(<AddressPicker value={EMPTY} disabled placeholder="Pick address" />);
    const trigger = screen.getByText("Pick address").closest("button");
    expect(trigger?.disabled).toBe(true);
  });

  it("clearable: clear button clears selection", async () => {
    const onChange = vi.fn();
    render(
      <AddressPicker
        value={["330000", "330100", "330106"]}
        clearable
        onChange={onChange}
      />,
    );
    const clearBtn = screen.getByLabelText("\u6e05\u9664\u9009\u62e9");
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith([], []);
  });

  it("clearable: clear button is not shown when no selection", () => {
    render(
      <AddressPicker value={EMPTY} clearable />,
    );
    expect(screen.queryByLabelText("\u6e05\u9664\u9009\u62e9")).toBeNull();
  });

  it("lazy load: fires onLoad when level=4 and district is selected", async () => {
    const onLoad = vi.fn().mockResolvedValue([
      { code: "S1", name: "Street1" },
      { code: "S2", name: "Street2" },
    ]);
    render(
      <AddressPicker
        value={["P1", "C1", "D1"]}
        options={CUSTOM_DATA}
        level={4}
        onLoad={onLoad}
      />,
    );
    // Open the popover to trigger panel render
    fireEvent.click(screen.getByText(/TestProvince/));
    await waitFor(() => expect(onLoad).toHaveBeenCalledWith("D1"));
    await waitFor(() => expect(screen.getByText("Street1")).toBeDefined());
  });

  it("shows no-data message when search yields no results", async () => {
    render(<AddressPicker value={EMPTY} options={CUSTOM_DATA} />);
    fireEvent.click(screen.getByText("\u8bf7\u9009\u62e9\u5730\u5740"));
    await waitFor(() => expect(screen.getByText("TestProvince")).toBeDefined());
    const searchInputs = screen.getAllByRole("textbox");
    fireEvent.change(searchInputs[0]!, { target: { value: "zzzzz" } });
    await waitFor(() => expect(screen.getByText("\u65e0\u6570\u636e")).toBeDefined());
  });

  it("button trigger mode renders with inline-flex", () => {
    const { container } = render(
      <AddressPicker
        value={EMPTY}
        options={CUSTOM_DATA}
        inputTrigger={false}
        placeholder="Pick address"
      />,
    );
    const root = container.querySelector("[data-slot=\"address-picker\"]");
    expect(root).toBeDefined();
    expect(screen.getByText("Pick address")).toBeDefined();
  });

  it("applies className to root element", () => {
    const { container } = render(
      <AddressPicker
        value={EMPTY}
        options={CUSTOM_DATA}
        className="custom-class"
      />,
    );
    const root = container.querySelector("[data-slot=\"address-picker\"]");
    expect(root?.className).toContain("custom-class");
  });
});
