import { useState } from "react";
import { generateSQL, runSQL, explainSQL } from "../services/api";

export default function QueryInput({ onResult }) {
    const [prompt, setPrompt] = useState("");
    const [generated, setGenerated] = useState("");
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a query description");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const res = await generateSQL(prompt);
            setGenerated(res.data.query);
        } catch (err) {
            setError("Failed to generate SQL. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRun = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await runSQL(generated);
            onResult(res.data.result);
        } catch (err) {
            setError("Failed to run query. Please check your SQL.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExplain = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await explainSQL(generated);
            setExplanation(res.data.explanation);
        } catch (err) {
            setError("Failed to explain query.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generated);
        // Simple feedback
        const btn = document.getElementById('copy-btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    };

    return (
        <div className="glass-card query-input-section">
            <h2>✨ Describe Your Query</h2>

            <textarea
                placeholder="Example: Show me all users who registered in the last 30 days..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
            />

            <div className="button-group flex flex-gap flex-wrap mt-2">
                <button
                    onClick={handleGenerate}
                    className={`btn-primary ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : '🚀 Generate SQL'}
                </button>
            </div>

            {error && (
                <div className="error-message" style={{
                    marginTop: 'var(--spacing-md)',
                    padding: 'var(--spacing-sm)',
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-accent)'
                }}>
                    ⚠️ {error}
                </div>
            )}

            {generated && (
                <div className="generated-section mt-2" style={{ animation: 'slideUp 0.5s ease-out' }}>
                    <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Generated Query</h3>
                        <button
                            id="copy-btn"
                            onClick={handleCopy}
                            className="btn-secondary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            📋 Copy
                        </button>
                    </div>

                    <pre>{generated}</pre>

                    <div className="button-group flex flex-gap flex-wrap mt-2">
                        <button
                            onClick={handleRun}
                            className="btn-primary"
                            disabled={loading}
                        >
                            ▶️ Run Query
                        </button>
                        <button
                            onClick={handleExplain}
                            className="btn-secondary"
                            disabled={loading}
                        >
                            💡 Explain Query
                        </button>
                    </div>
                </div>
            )}

            {explanation && (
                <div className="explanation-section mt-2" style={{
                    padding: 'var(--spacing-md)',
                    background: 'rgba(34, 211, 238, 0.1)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    animation: 'slideUp 0.5s ease-out'
                }}>
                    <h3 style={{ marginTop: 0, color: 'var(--color-secondary)' }}>📖 Explanation</h3>
                    <div style={{ color: 'var(--color-text-dim)', lineHeight: 1.8 }}>
                        {Array.isArray(explanation) ? (
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                {explanation.map((item, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{explanation}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
