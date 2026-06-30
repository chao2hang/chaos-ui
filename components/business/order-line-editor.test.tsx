import { describe, it, expect } from "vitest";
import { OrderLineEditor } from "./order-line-editor";
import type {
  OrderLineEditorProps,
  OrderLine,
  SkuOption,
} from "./order-line-editor";

describe("order-line-editor", () => {
  it("exports OrderLineEditor", () => {
    expect(OrderLineEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: OrderLineEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: OrderLine | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: SkuOption | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
