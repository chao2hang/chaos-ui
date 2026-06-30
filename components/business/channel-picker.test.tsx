import { describe, it, expect } from "vitest";
import { defaultChannelOptions, ChannelPicker } from "./channel-picker";
import type {
  MarketingChannel,
  ChannelOption,
  ChannelPickerProps,
} from "./channel-picker";

describe("channel-picker", () => {
  it("exports defaultChannelOptions", () => {
    expect(defaultChannelOptions).toBeDefined();
  });

  it("exports ChannelPicker", () => {
    expect(ChannelPicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MarketingChannel | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ChannelOption | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: ChannelPickerProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
