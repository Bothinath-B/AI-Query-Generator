export default function ResultTable({ data }) {
    // Handle empty or no data
    if (!data || data.length === 0) {
        return (
            <div className="glass-card text-center" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div style={{ padding: 'var(--spacing-xl)', opacity: 0.6 }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📊</div>
                    <h3 style={{ color: 'var(--color-text-dim)' }}>No Results Yet</h3>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                        Generate and run a query to see results here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="results-section" style={{ marginTop: 'var(--spacing-lg)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>📈 Query Results</h2>

            {data.map((result, resultIdx) => {
                // Handle different result types
                if (result.error) {
                    return (
                        <div
                            key={resultIdx}
                            className="glass-card"
                            style={{
                                marginBottom: 'var(--spacing-md)',
                                background: 'rgba(244, 63, 94, 0.1)',
                                border: '1px solid rgba(244, 63, 94, 0.3)'
                            }}
                        >
                            <h3 style={{ color: 'var(--color-accent)', marginTop: 0 }}>❌ Error</h3>
                            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                {result.error}
                            </p>
                            {result.statement && (
                                <pre style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.85rem' }}>
                                    {result.statement}
                                </pre>
                            )}
                        </div>
                    );
                }

                if (result.status === 'executed') {
                    return (
                        <div
                            key={resultIdx}
                            className="glass-card"
                            style={{
                                marginBottom: 'var(--spacing-md)',
                                background: 'rgba(34, 211, 238, 0.1)',
                                border: '1px solid rgba(34, 211, 238, 0.3)'
                            }}
                        >
                            <h3 style={{ color: 'var(--color-success)', marginTop: 0 }}>✅ Query Executed Successfully</h3>
                            {result.statement && (
                                <pre style={{ fontSize: '0.85rem' }}>{result.statement}</pre>
                            )}
                        </div>
                    );
                }

                // Handle SELECT results with rows
                if (result.rows && result.rows.length > 0) {
                    const headers = Object.keys(result.rows[0]);

                    return (
                        <div key={resultIdx} style={{ marginBottom: 'var(--spacing-lg)' }}>
                            {result.statement && (
                                <div className="glass-card" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                                        Query Statement:
                                    </h4>
                                    <pre style={{ fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                                        {result.statement}
                                    </pre>
                                </div>
                            )}

                            <div style={{ overflowX: 'auto' }}>
                                <table>
                                    <thead>
                                        <tr>
                                            {headers.map((h) => (
                                                <th key={h}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.rows.map((row, idx) => (
                                            <tr key={idx}>
                                                {headers.map((h) => (
                                                    <td key={h}>{row[h] !== null ? String(row[h]) : '—'}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div style={{
                                marginTop: 'var(--spacing-sm)',
                                textAlign: 'right',
                                color: 'var(--color-text-dimmer)',
                                fontSize: '0.85rem'
                            }}>
                                {result.rows.length} row{result.rows.length !== 1 ? 's' : ''} returned
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}
