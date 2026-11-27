import { describe, expect, it } from "vitest";
import { isPassing, isValidNumber, letterGrade, weightedAverage } from "./grades";

describe("weightedAverage", () => {
  it("computes the average weighted by units for valid input", () => {
    const subjects = [
      { score: 90, weight: 3 },
      { score: 80, weight: 1 },
    ];
    expect(weightedAverage(subjects)).toBe(87.5);
  });

  it("gives the same score back for a single subject", () => {
    expect(weightedAverage([{ score: 75, weight: 2 }])).toBe(75);
  });

  it("rejects an empty subject list", () => {
    expect(() => weightedAverage([])).toThrow("Add at least one subject.");
  });

  it("rejects scores outside 0 to 100", () => {
    expect(() => weightedAverage([{ score: 101, weight: 3 }])).toThrow("between 0 and 100");
    expect(() => weightedAverage([{ score: -1, weight: 3 }])).toThrow("between 0 and 100");
  });

  it("rejects zero or missing units", () => {
    expect(() => weightedAverage([{ score: 90, weight: 0 }])).toThrow("Units must be greater than 0.");
    expect(() => weightedAverage([{ score: 90, weight: "" }])).toThrow("Units must be greater than 0.");
  });
});

describe("letterGrade", () => {
  it("returns the correct letter for each range", () => {
    expect(letterGrade(95)).toBe("A");
    expect(letterGrade(85)).toBe("B");
    expect(letterGrade(75)).toBe("C");
    expect(letterGrade(65)).toBe("D");
    expect(letterGrade(40)).toBe("F");
  });

  it("handles the boundary values", () => {
    expect(letterGrade(90)).toBe("A");
    expect(letterGrade(89.99)).toBe("B");
    expect(letterGrade(60)).toBe("D");
    expect(letterGrade(59.99)).toBe("F");
  });
});

describe("isPassing", () => {
  it("passes at and above the pass mark", () => {
    expect(isPassing(60)).toBe(true);
    expect(isPassing(88)).toBe(true);
  });

  it("fails below the pass mark", () => {
    expect(isPassing(59.9)).toBe(false);
  });

  it("supports a custom pass mark", () => {
    expect(isPassing(70, 75)).toBe(false);
  });
});

describe("isValidNumber", () => {
  it("rejects blanks and non-numbers", () => {
    expect(isValidNumber("", 0, 100)).toBe(false);
    expect(isValidNumber("abc", 0, 100)).toBe(false);
    expect(isValidNumber(null, 0, 100)).toBe(false);
  });
});
