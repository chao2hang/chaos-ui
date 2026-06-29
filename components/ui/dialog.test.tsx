import { describe, it, expect } from "vitest";
import type {
  DialogProps,
  DialogHeaderProps,
  DialogBodyProps,
  DialogTitleProps,
  DialogContentProps,
} from "@/components/ui/dialog";

// Dialog sub-components (Title/Body/Content) require <Dialog.Root> context,
// so we test type exports + module importability here. Behavioral tests live
// in Storybook stories.

describe("Dialog", () => {
  it("Dialog*Props types are importable", () => {
    const _d: DialogProps = {};
    const _h: DialogHeaderProps = {};
    const _b: DialogBodyProps = {};
    const _t: DialogTitleProps = {};
    const _c: DialogContentProps = { showCloseButton: true };
    expect(_d).toBeDefined();
    expect(_h).toBeDefined();
    expect(_b).toBeDefined();
    expect(_t).toBeDefined();
    expect(_c.showCloseButton).toBe(true);
  });

  it("Dialog module is importable", async () => {
    const mod = await import("@/components/ui/dialog");
    expect(mod.Dialog).toBeDefined();
    expect(mod.DialogContent).toBeDefined();
    expect(mod.DialogTitle).toBeDefined();
    expect(mod.DialogHeader).toBeDefined();
  });
});
