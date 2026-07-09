"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Textarea } from "@chaos_team/chaos-ui/ui";
import { MapPinIcon, PinIcon } from "@chaos_team/chaos-ui/ui-icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * Structured address value.
 */
interface AddressValue {
  /** Province / 省份 */
  province?: string;
  /** City / 城市 */
  city?: string;
  /** District / 区县 */
  district?: string;
  /** Street / 街道 */
  street?: string;
  /** Detailed address / 详细地址 */
  detail?: string;
  /** Latitude / 纬度 */
  lat?: number;
  /** Longitude / 经度 */
  lng?: number;
}

/**
 * Props for the AddressInput component.
 */
interface AddressInputProps {
  /** Current address value / 当前地址值 */
  value?: AddressValue;
  /** Change callback / 变更回调 */
  onChange?: (value: AddressValue) => void;
  /** Show map placeholder (default: false) / 是否显示地图占位 */
  showMap?: boolean;
  /** Show geolocation inputs (default: false) / 是否显示经纬度输入 */
  showGeolocation?: boolean;
  /** Additional className / 额外类名 */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Built-in sample data for province/city/district selects           */
/* ------------------------------------------------------------------ */

const PROVINCES = [
  { code: "110000", name: "北京市" },
  { code: "310000", name: "上海市" },
  { code: "330000", name: "浙江省" },
  { code: "440000", name: "广东省" },
  { code: "510000", name: "四川省" },
];

const CITIES: Record<string, { code: string; name: string }[]> = {
  "110000": [{ code: "110100", name: "北京市" }],
  "310000": [{ code: "310100", name: "上海市" }],
  "330000": [
    { code: "330100", name: "杭州市" },
    { code: "330200", name: "宁波市" },
  ],
  "440000": [
    { code: "440100", name: "广州市" },
    { code: "440300", name: "深圳市" },
  ],
  "510000": [
    { code: "510100", name: "成都市" },
    { code: "510700", name: "绵阳市" },
  ],
};

const DISTRICTS: Record<string, { code: string; name: string }[]> = {
  "110100": [
    { code: "110101", name: "东城区" },
    { code: "110102", name: "西城区" },
    { code: "110105", name: "朝阳区" },
  ],
  "310100": [
    { code: "310101", name: "黄浦区" },
    { code: "310104", name: "徐汇区" },
    { code: "310105", name: "长宁区" },
  ],
  "330100": [
    { code: "330102", name: "上城区" },
    { code: "330105", name: "拱墅区" },
    { code: "330106", name: "西湖区" },
  ],
  "330200": [
    { code: "330203", name: "海曙区" },
    { code: "330204", name: "江东区" },
  ],
  "440100": [
    { code: "440103", name: "荔湾区" },
    { code: "440104", name: "越秀区" },
    { code: "440106", name: "天河区" },
  ],
  "440300": [
    { code: "440303", name: "罗湖区" },
    { code: "440304", name: "福田区" },
    { code: "440305", name: "南山区" },
  ],
  "510100": [
    { code: "510104", name: "锦江区" },
    { code: "510105", name: "青羊区" },
    { code: "510106", name: "金牛区" },
  ],
  "510700": [
    { code: "510703", name: "涪城区" },
    { code: "510704", name: "游仙区" },
  ],
};

/* ------------------------------------------------------------------ */
/*  AddressInput - main export                                        */
/* ------------------------------------------------------------------ */

/**
 * @component AddressInput
 * @category business/address
 * @since 0.2.0
 * @description Structured address input with province/city/district
 *   cascading selects, street input, detail textarea, and optional
 *   geolocation fields. / 结构化地址输入，包含省/市/区级联选择、街道输入、
 *   详细地址文本域，以及可选的经纬度字段。
 * @keywords address, input, province, city, district, geolocation, cascading
 * @example
 * ```tsx
 * <AddressInput
 *   value={addr}
 *   onChange={setAddr}
 *   showGeolocation
 * />
 * ```
 */
function AddressInput({
  value,
  onChange,
  showMap = false,
  showGeolocation = false,
  className,
}: AddressInputProps) {
  const internalValue: AddressValue = value ?? {};

  const update = (patch: Partial<AddressValue>) => {
    onChange?.({ ...internalValue, ...patch });
  };

  const provinceCode = PROVINCES.find(
    (p) => p.name === internalValue.province,
  )?.code;
  const cityCode = provinceCode
    ? CITIES[provinceCode]?.find((c) => c.name === internalValue.city)?.code
    : undefined;
  const districts = cityCode ? (DISTRICTS[cityCode] ?? []) : [];

  const handleProvinceChange = (province: string) => {
    update({ province, city: "", district: "" });
  };

  const handleCityChange = (city: string) => {
    update({ city, district: "" });
  };

  return (
    <div
      data-slot="address-input"
      className={cn("flex flex-col gap-3", className)}
    >
      {/* Province / City / District cascading selects */}
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <MapPinIcon className="size-4 shrink-0" />
        <span>行政区划</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <select
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-lg border bg-transparent px-2 text-sm transition-colors outline-none focus-visible:ring-3"
          value={internalValue.province ?? ""}
          onChange={(e) => handleProvinceChange(e.target.value)}
          aria-label="省份"
        >
          <option value="">请选择省份</option>
          {PROVINCES.map((p) => (
            <option key={p.code} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-lg border bg-transparent px-2 text-sm transition-colors outline-none focus-visible:ring-3"
          value={internalValue.city ?? ""}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={!provinceCode}
          aria-label="城市"
        >
          <option value="">请选择城市</option>
          {provinceCode &&
            (CITIES[provinceCode] ?? []).map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>
        <select
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-lg border bg-transparent px-2 text-sm transition-colors outline-none focus-visible:ring-3"
          value={internalValue.district ?? ""}
          onChange={(e) => update({ district: e.target.value })}
          disabled={!cityCode}
          aria-label="区县"
        >
          <option value="">请选择区县</option>
          {districts.map((d) => (
            <option key={d.code} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Map placeholder */}
      {showMap && (
        <div className="bg-muted/50 text-muted-foreground flex h-32 items-center justify-center rounded-lg border border-dashed text-sm">
          <MapPinIcon className="mr-1.5 size-4" />
          地图占位区域
        </div>
      )}

      {/* Street input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-muted-foreground text-sm">街道/乡镇</label>
        <Input
          placeholder="请输入街道/乡镇"
          value={internalValue.street ?? ""}
          onChange={(e) => update({ street: e.target.value })}
        />
      </div>

      {/* Detail textarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-muted-foreground text-sm">详细地址</label>
        <Textarea
          placeholder="请输入详细地址"
          value={internalValue.detail ?? ""}
          onChange={(e) => update({ detail: e.target.value })}
          className="min-h-20"
        />
      </div>

      {/* Geolocation */}
      {showGeolocation && (
        <div className="flex flex-col gap-1.5">
          <label className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <PinIcon className="size-4" />
            经纬度坐标
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              step="any"
              placeholder="纬度 (lat)"
              value={internalValue.lat ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                update(
                  val
                    ? { lat: Number(val) }
                    : { lat: undefined as unknown as number },
                );
              }}
            />
            <Input
              type="number"
              step="any"
              placeholder="经度 (lng)"
              value={internalValue.lng ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                update(
                  val
                    ? { lng: Number(val) }
                    : { lng: undefined as unknown as number },
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { AddressInput };
export type { AddressValue, AddressInputProps };
