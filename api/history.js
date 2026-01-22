import fetch from "node-fetch";

export async function getHistoricalPrices(symbol, start, end) {
  const p1 = Math.floor(new Date(start).getTime() / 1000);
  const p2 = Math.floor(new Date(end).getTime() / 1000);

  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}` +
    `?period1=${p1}&period2=${p2}&interval=1d`;

  const res = await fetch(url);
  const json = await res.json();

  const r = json.chart.result?.[0];
  if (!r?.timestamp?.length) return [];

  return r.timestamp
    .map((t, i) => ({
      date: new Date(t * 1000),
      close: r.indicators.quote[0].close[i]
    }))
    .filter(p => Number.isFinite(p.close));
}
