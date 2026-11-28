const TIERS = [
  [95, "Outstanding"],
  [90, "Excellent"],
  [85, "Very good"],
  [80, "Good"],
  [75, "Fair"],
  [70, "Satisfactory"],
  [65, "Needs work"],
  [60, "Barely passing"],
  [55, "Weak"],
  [50, "Poor"],
  [45, "Very poor"],
  [40, "Critical"],
  [30, "Dire"],
];

export function remark(average) {
  for (const [limit, label] of TIERS) {
    if (average >= limit) {
      return label;
    }
  }
  return "Failing";
}
