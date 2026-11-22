import { describe, expect, it } from "vitest";
import { AMENITIES, neighborhoods } from "./neighborhood-data";

describe("sample neighborhood data", () => {
  it("has unique ids", () => {
    const ids = neighborhoods.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only uses known amenities and sane numbers", () => {
    for (const n of neighborhoods) {
      for (const a of n.amenities) expect(AMENITIES).toContain(a);
      expect(n.avgRent).toBeGreaterThan(0);
      expect(n.walkScore).toBeGreaterThanOrEqual(0);
      expect(n.walkScore).toBeLessThanOrEqual(100);
    }
  });
});
