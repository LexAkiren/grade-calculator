import { describe, it, expect } from "vitest";
import * as extra from "./extra";

describe("remark functions", () => {
  it("covers every tier of every remark function", () => {
    const values = [96, 92, 87, 82, 77, 72, 67, 62, 57, 52, 47, 42, 35, 10];
    for (const fn of Object.values(extra)) {
      const results = values.map((n) => fn(n));
      expect(new Set(results).size).toBe(14);
    }
  });
});
