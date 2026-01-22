export async function getScreener() {
  return fetch("/api/screener?symbols=AAPL,MSFT,TSLA").then(r => r.json());
}

export async function getBacktest(symbol, cadence = "monthly") {
  return fetch(`/api/backtest?symbol=${symbol}&cadence=${cadence}`).then(r => r.json());
}
