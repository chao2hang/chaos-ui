import { describe, it, expect } from "vitest";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "./input-group";

describe("input-group", () => {
  it("exports InputGroup", () => {
    expect(InputGroup).toBeDefined();
  });

  it("exports InputGroupAddon", () => {
    expect(InputGroupAddon).toBeDefined();
  });

  it("exports InputGroupButton", () => {
    expect(InputGroupButton).toBeDefined();
  });

  it("exports InputGroupText", () => {
    expect(InputGroupText).toBeDefined();
  });

  it("exports InputGroupInput", () => {
    expect(InputGroupInput).toBeDefined();
  });

  it("exports InputGroupTextarea", () => {
    expect(InputGroupTextarea).toBeDefined();
  });
});
