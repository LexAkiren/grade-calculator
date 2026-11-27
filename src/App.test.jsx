// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

function addSubject(name, score, units) {
  fireEvent.change(screen.getByPlaceholderText("Math"), { target: { value: name } });
  fireEvent.change(screen.getByPlaceholderText("95"), { target: { value: score } });
  fireEvent.change(screen.getByPlaceholderText("3"), { target: { value: units } });
  fireEvent.click(screen.getByRole("button", { name: /Add subject/ }));
}

describe("Grade calculator app", () => {
  it("shows the average, grade and pass status for valid subjects", () => {
    render(<App />);
    addSubject("Math", "90", "3");
    addSubject("English", "80", "1");
    fireEvent.click(screen.getByRole("button", { name: /Calculate my grade/ }));
    expect(screen.getByText("Average: 87.5")).toBeTruthy();
    expect(screen.getByText(/Grade B/)).toBeTruthy();
    expect(screen.getByText("Passed")).toBeTruthy();
  });

  it("shows a not passed result for a low average", () => {
    render(<App />);
    addSubject("Science", "40", "3");
    fireEvent.click(screen.getByRole("button", { name: /Calculate my grade/ }));
    expect(screen.getByText(/Grade F/)).toBeTruthy();
    expect(screen.getByText("Not passed yet")).toBeTruthy();
  });

  it("shows an error when calculating with no subjects", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Calculate my grade/ }));
    expect(screen.getByText("Add at least one subject.")).toBeTruthy();
  });

  it("rejects a score above 100", () => {
    render(<App />);
    addSubject("Math", "150", "3");
    expect(screen.getByText("Scores must be between 0 and 100.")).toBeTruthy();
  });

  it("requires a subject name", () => {
    render(<App />);
    addSubject("", "90", "3");
    expect(screen.getByText("Please give your subject a name.")).toBeTruthy();
  });

  it("removes a subject from the list", () => {
    render(<App />);
    addSubject("Math", "90", "3");
    expect(screen.getByText(/Math: 90/)).toBeTruthy();
    fireEvent.click(screen.getByText("remove"));
    expect(screen.queryByText(/Math: 90/)).toBeNull();
  });
});
