import { estimateCallPremium } from "./optionModel.js";

export async function backtestCoveredCall({
  prices,
  daysToExpiration,
  delta = 0.3,
  iv = 0.3,
  capital = 10000
}) {
  if (!prices?.length) return [];

  let shares = Math.floor(capital / prices[0].close);
  let cash = capital - shares * prices[0].close;
  const curve = [];

  for (let i = 0; i < prices.length - daysToExpiration; i += daysToExpiration) {
    const entry = prices[i].close;
    const exit = prices[i + daysToExpiration].close;

    const premium = estimateCallPremium(entry, iv, daysToExpiration, delta);
    cash += premium * shares;

    const strike = entry * (1 + delta);

    // If assigned, we sell at strike and rebuy shares at exit
    if (exit > strike) {
      cash += strike * shares;
      shares = Math.floor(cash / exit);
      cash -= shares * exit;
    }

    curve.push({
      date: prices[i + daysToExpiration].date,
      equity: cash + shares * exit
    });
  }

  return curve;
}
