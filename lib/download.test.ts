import { describe, it, expect, vi } from "vitest";
import { download } from "@/lib/download";

describe("lib/download", () => {
  it("text creates anchor and clicks", () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");
    download.text("test.txt", "hello");
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("json downloads stringified", () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");
    download.json("data.json", { a: 1 });
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("blob downloads", () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");
    download.blob("file.bin", new Blob(["data"]));
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("csv with empty rows", () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");
    download.csv("empty.csv", []);
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("csv with data escapes commas", () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");
    download.csv("data.csv", [{ name: "a,b", val: 1 }]);
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("url creates anchor", () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");
    download.url("file", "https://example.com/f");
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});
