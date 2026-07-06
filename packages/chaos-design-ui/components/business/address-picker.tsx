"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AddressValue {
  province: string;
  city: string;
  district: string;
}

interface AddressPickerProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  value?: AddressValue;
  onChange?: (value: AddressValue) => void;
  className?: string;
  placeholder?: { province?: string; city?: string; district?: string };
}

const provinces = [
  { code: "11", name: "北京市" },
  { code: "31", name: "上海市" },
  { code: "44", name: "广东省" },
  { code: "33", name: "浙江省" },
  { code: "32", name: "江苏省" },
];

const cities: Record<string, { code: string; name: string }[]> = {
  "11": [{ code: "1101", name: "北京市" }],
  "31": [{ code: "3101", name: "上海市" }],
  "44": [
    { code: "4401", name: "广州市" },
    { code: "4403", name: "深圳市" },
  ],
  "33": [
    { code: "3301", name: "杭州市" },
    { code: "3302", name: "宁波市" },
  ],
  "32": [
    { code: "3201", name: "南京市" },
    { code: "3205", name: "苏州市" },
  ],
};

const districts: Record<string, { code: string; name: string }[]> = {
  "1101": [
    { code: "110101", name: "东城区" },
    { code: "110102", name: "西城区" },
  ],
  "4401": [
    { code: "440103", name: "荔湾区" },
    { code: "440104", name: "越秀区" },
    { code: "440106", name: "天河区" },
  ],
  "4403": [
    { code: "440303", name: "罗湖区" },
    { code: "440304", name: "福田区" },
    { code: "440305", name: "南山区" },
  ],
};

function AddressPicker({
  value,
  onChange,
  className,
  placeholder = { province: "省份", city: "城市", district: "区县" },
  ...props
}: AddressPickerProps) {
  const [province, setProvince] = React.useState(value?.province ?? "");
  const [city, setCity] = React.useState(value?.city ?? "");
  const [district, setDistrict] = React.useState(value?.district ?? "");

  const updateValue = React.useCallback(
    (p: string, c: string, d: string) => {
      const v: AddressValue = { province: p, city: c, district: d };
      onChange?.(v);
    },
    [onChange],
  );

  const handleProvinceChange = (code: string) => {
    setProvince(code);
    setCity("");
    setDistrict("");
    updateValue(code, "", "");
  };

  const handleCityChange = (code: string) => {
    setCity(code);
    setDistrict("");
    updateValue(province, code, "");
  };

  const handleDistrictChange = (code: string) => {
    setDistrict(code);
    updateValue(province, city, code);
  };

  const cityList = cities[province] ?? [];
  const districtList = districts[city] ?? [];

  return (
    <div
      data-slot="address-picker"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <Select value={province} onValueChange={handleProvinceChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={placeholder.province} />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((p) => (
            <SelectItem key={p.code} value={p.code}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={city} onValueChange={handleCityChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={placeholder.city} />
        </SelectTrigger>
        <SelectContent>
          {cityList.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={district} onValueChange={handleDistrictChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={placeholder.district} />
        </SelectTrigger>
        <SelectContent>
          {districtList.map((d) => (
            <SelectItem key={d.code} value={d.code}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { AddressPicker };
export type { AddressPickerProps };
