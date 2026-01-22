import express from "express";
import cors from "cors";
import { fetchOptions } from "./data.js";
import { analyze } from "./analytics.js";
import { getHistoricalPrices } from "./history.js";
import { backtestCoveredCall } from "./backtest.js";
import { calculateMetrics } from "./metrics.js";

const app = express();
app.use(cors());

app.get("/api/screener", async (req, res) => {
  const symbols = (req.query.symbols || "AAPL,MSFT,TSLA").split(",");
  const results = [];

  for (const s of symbols) {
    const data = await fetchOptions(s);
    data.options.forEach(o =>
      results.push({ symbol: s, ...analyze(o, data.stockPrice) })
    );
  }

  res.json(results.sort((a, b) => b.expectedReturn - a.expectedReturn));
});

app.get("/api/backtest", async (req, res) => {
  const { symbol = "AAPL", cadence = "monthly" } = req.query;
  const days = cadence === "weekly" ? 7 : 30;

  const prices = await getHistoricalPrices(symbol, "2018-01-01", "2024-01-01");
  const curve = await backtestCoveredCall({ prices, daysToExpiration: days });
  const metrics = calculateMetrics(curve);

  res.json({ symbol, cadence, metrics, equityCurve: curve });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
