import { useState } from "react";
import { weightedAverage, letterGrade, isPassing } from "./grades";
import "./App.css";

const SPARKLE = "\u2728";
const HEART = "\u2661";
const FACES = { A: "(^o^)", B: "(^_^)", C: "(=^.^=)", D: "(._.)", F: "(T_T)" };
const MESSAGES = {
  A: "Amazing! You are a star!",
  B: "Great job, keep shining!",
  C: "Nice work, you are doing okay!",
  D: "Almost there, you can do it!",
  F: "Don't give up, try again!",
};

export default function App() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function addSubject(event) {
    event.preventDefault();
    try {
      if (!name.trim()) throw new Error("Please give your subject a name.");
      weightedAverage([{ score, weight }]);
      setSubjects([
        ...subjects,
        { id: Date.now(), name: name.trim(), score: Number(score), weight: Number(weight) },
      ]);
      setName("");
      setScore("");
      setWeight("");
      setError("");
      setResult(null);
    } catch (e) {
      setError(e.message);
    }
  }

  function removeSubject(id) {
    setSubjects(subjects.filter((s) => s.id !== id));
    setResult(null);
  }

  function calculate() {
    try {
      const average = weightedAverage(subjects);
      const letter = letterGrade(average);
      setResult({ average, letter, passing: isPassing(average) });
      setError("");
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  }

  return (
    <main className="app">
      <h1>{SPARKLE} Grade Calculator {SPARKLE}</h1>
      <p className="subtitle">Add your subjects and see your grade {HEART}</p>

      <form className="card" onSubmit={addSubject}>
        <label>
          Subject
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Math" />
        </label>
        <label>
          Score (0 to 100)
          <input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="95" />
        </label>
        <label>
          Units
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="3" />
        </label>
        <button type="submit">Add subject {HEART}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {subjects.length > 0 && (
        <ul className="card list">
          {subjects.map((s) => (
            <li key={s.id}>
              <span>{s.name}: {s.score} ({s.weight} units)</span>
              <button className="small" onClick={() => removeSubject(s.id)}>remove</button>
            </li>
          ))}
        </ul>
      )}

      <button className="big" onClick={calculate}>Calculate my grade {SPARKLE}</button>

      {result && (
        <section className="card result">
          <h2>Average: {result.average}</h2>
          <p className="letter">Grade {result.letter} {FACES[result.letter]}</p>
          <p>{result.passing ? "Passed" : "Not passed yet"}</p>
          <p>{MESSAGES[result.letter]}</p>
        </section>
      )}
    </main>
  );
}
