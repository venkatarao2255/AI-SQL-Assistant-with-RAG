import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Generate SQL + Results
  const handleQuery = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError("");
      setSql("");
      setResults([]);
      setExplanation("");

      const res = await axios.post("http://localhost:5000/api/query", {
        userInput: input,
      });

      setSql(res.data.sql);
      setResults(res.data.results);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Explain SQL Query
  const handleExplain = async () => {
    try {
      setError("");

      const res = await axios.post("http://localhost:5000/api/explain", {
        sql: sql,
      });

      setExplanation(res.data.explanation);

    } catch (err) {
      console.error(err);
      setError("Failed to get explanation.");
    }
  };

  return (
    <div className="container">
      <h1>🧠 AI SQL Assistant</h1>

      {/* Input Section */}
      <div className="card">
        <input
          type="text"
          placeholder="e.g. top 3 highest salary employees"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleQuery}>
          {loading ? "Thinking..." : "Run"}
        </button>

        <p className="hint">
          Example: "employees with salary greater than 60000"
        </p>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* SQL Output */}
      {sql && (
        <div className="card">
          <h2>Generated SQL</h2>

          <pre>{sql}</pre>

          {/* Explain Button */}
          <button
            style={{ marginTop: "10px" }}
            onClick={handleExplain}
          >
            Explain Query
          </button>
        </div>
      )}

      {/* Explanation Output */}
      {explanation && (
        <div className="card">
          <h2>Explanation</h2>
          <p>{explanation}</p>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="card">
          <h2>Results</h2>

          <table>
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {results.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && !sql && results.length === 0 && (
        <p className="empty">Enter a query to get started 👆</p>
      )}
    </div>
  );
}