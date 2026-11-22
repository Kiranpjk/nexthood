import { describe, expect, it } from "vitest";
import { cn, getErrorMessage } from "./utils";

describe("cn", () => {
  it("joins classes and drops falsy values", () => {
    expect(cn("p-2", false && "hidden", undefined, "text-sm")).toBe("p-2 text-sm");
  });

  it("lets the later Tailwind class win on conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("getErrorMessage", () => {
  it("uses the message of an Error", () => {
    expect(getErrorMessage(new Error("Wrong password"), "fallback")).toBe("Wrong password");
  });

  it("accepts a thrown string", () => {
    expect(getErrorMessage("offline", "fallback")).toBe("offline");
  });

  it("falls back for anything else", () => {
    expect(getErrorMessage({ code: 42 }, "fallback")).toBe("fallback");
    expect(getErrorMessage(new Error(""), "fallback")).toBe("fallback");
  });
});
