export function isValidNumber(value, min, max) {
  if (value === "" || value === null || value === undefined) return false;
  const n = Number(value);
  return Number.isFinite(n) && n >= min && n <= max;
}

export function weightedAverage(subjects) {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    throw new Error("Add at least one subject.");
  }
  let totalWeight = 0;
  let total = 0;
  for (const subject of subjects) {
    if (!isValidNumber(subject.score, 0, 100)) {
      throw new Error("Scores must be between 0 and 100.");
    }
    if (!isValidNumber(subject.weight, 0, 1000) || Number(subject.weight) === 0) {
      throw new Error("Units must be greater than 0.");
    }
    total += Number(subject.score) * Number(subject.weight);
    totalWeight += Number(subject.weight);
  }
  return Math.round((total / totalWeight) * 100) / 100;
}

export function letterGrade(average) {
  if (average >= 90) return "A";
  if (average >= 80) return "B";
  if (average >= 70) return "C";
  if (average >= 60) return "D";
  return "F";
}

export function isPassing(average, passMark = 60) {
  return average >= passMark;
}
