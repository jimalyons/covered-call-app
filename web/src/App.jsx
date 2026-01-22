import { useEffect, useState } from "react";
import { getScreener, getBacktest } from "./api";

export default function App() {
  const [rows, setRows] = useState([]);
  const [bt, setBt] = useState(null);
  const [loadingBt, setLoadingBt] = useState(false);

  useEffect(() => {
    getScreener().then(setRows).catch(console.error);
  }, []);

  async function runBacktest(symbol, cadence) {
    setLoadingBt(true);
    setBt(null);
    try {
      const result = await getBacktest(symbol, cadence);
      setBt(result);
    } finally {
      setLoadingBt(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <h2>Covered Call Screener</h2>
      <p>Click a row to run a backtest.</p>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Strike</th>
            <th>DTE</th>
            <th>Premium</th>
            <th>Delta</th>
            <th>Ann Yield</th>
            <th>Expected Return</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => runBacktest(r.symbol, "monthly")}
              title="Click to backtest monthly"
            >
              <td>{r.symbol}</td>
              <td>{r.strike}</td>
              <td>{r.days}</td>
              <td>{r.premium}</td>
              <td>{r.delta}</td>
              <td>{(r.annualizedYield * 100).toFixed(1)}%</td>
              <td>{(r.expectedReturn * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 24 }}>
        <h3>Backtest</h3>

        {loadingBt && <p>Running backtest…</p>}

        {bt && (
          <div>
            <p>
              <b>{bt.symbol}</b> ({bt.cadence})
            </p>

            <pre style={{ background: "#f6f6f6", padding: 12, overflowX: "auto" }}>
{JSON.stringify(bt.metrics, null, 2)}
            </pre>

            <button onClick={() => runBacktest(bt.symbol, "weekly")}>
              Run Weekly Backtest
            </button>{" "}
            <button onClick={() => runBacktest(bt.symbol, "monthly")}>
              Run Monthly Backtest
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
