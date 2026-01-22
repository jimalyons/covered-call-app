// Simple premium estimator (for backtesting)
export function estimateCallPremium(price, iv, days, delta) {
  return price * iv * Math.sqrt(days / 365) * delta;
}
