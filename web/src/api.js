export async function getScreener() {
  const res = await fetch("http://localhost:3001/api/screener?symbols=AAPL,MSFT,TSLA");
  return res.json();
}

export async function getBacktest(symbol, cadence = "monthly") {
  const res = await fetch(`http://localhost:3001/api/backtest?symbol=${symbol}&cadence=${cadence}`);
  return res.json();
}
