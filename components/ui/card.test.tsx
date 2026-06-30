import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardSection,
} from "./card";

describe("card", () => {
  it("exports Card", () => {
    expect(Card).toBeDefined();
  });

  it("exports CardHeader", () => {
    expect(CardHeader).toBeDefined();
  });

  it("exports CardFooter", () => {
    expect(CardFooter).toBeDefined();
  });

  it("exports CardTitle", () => {
    expect(CardTitle).toBeDefined();
  });

  it("exports CardAction", () => {
    expect(CardAction).toBeDefined();
  });

  it("exports CardDescription", () => {
    expect(CardDescription).toBeDefined();
  });

  it("exports CardContent", () => {
    expect(CardContent).toBeDefined();
  });

  it("exports CardSection", () => {
    expect(CardSection).toBeDefined();
  });
});
