export function describePerformance(average) {
  if (average >= 95) {
    return "Outstanding";
  } else if (average >= 90) {
    return "Excellent";
  } else if (average >= 85) {
    return "Very good";
  } else if (average >= 80) {
    return "Good";
  } else if (average >= 75) {
    return "Fair";
  } else if (average >= 70) {
    return "Satisfactory";
  } else if (average >= 65) {
    return "Needs work";
  } else if (average >= 60) {
    return "Barely passing";
  } else if (average >= 55) {
    return "Weak";
  } else if (average >= 50) {
    return "Poor";
  } else if (average >= 45) {
    return "Very poor";
  } else if (average >= 40) {
    return "Critical";
  } else if (average >= 30) {
    return "Dire";
  }
  return "Failing";
}
