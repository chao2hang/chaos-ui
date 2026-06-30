import { describe, it, expect } from "vitest";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "./avatar";

describe("avatar", () => {
  it("exports Avatar", () => {
    expect(Avatar).toBeDefined();
  });

  it("exports AvatarImage", () => {
    expect(AvatarImage).toBeDefined();
  });

  it("exports AvatarFallback", () => {
    expect(AvatarFallback).toBeDefined();
  });

  it("exports AvatarGroup", () => {
    expect(AvatarGroup).toBeDefined();
  });

  it("exports AvatarGroupCount", () => {
    expect(AvatarGroupCount).toBeDefined();
  });

  it("exports AvatarBadge", () => {
    expect(AvatarBadge).toBeDefined();
  });
});
