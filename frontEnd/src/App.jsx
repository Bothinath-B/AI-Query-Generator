import { useState } from "react";
import QueryInput from "./components/QueryInput";
import ResultTable from "./components/ResultTable";
import "./index.css";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero text-center">
        <h1>AI SQL Query Generator</h1>
        <p className="subtitle">
          Transform natural language into powerful SQL queries with AI
        </p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <QueryInput onResult={setResults} />
        <ResultTable data={results} />
      </main>
    </div>
  );
}

export default App;
