export function calculateMetrics(curve) {
  if (!curve?.length) {
    return { totalReturn: 0, cagr: 0, maxDrawdown: 0 };
  }

  const start = curve[0].equity;
  const end = curve.at(-1).equity;

  const years =
    (curve.at(-1).date - curve[0].date) / (365 * 24 * 60 * 60 * 1000);

  let peak = start;
  let maxDrawdown = 0;

  for (const p of curve) {
    peak = Math.max(peak, p.equity);
    maxDrawdown = Math.min(maxDrawdown, (p.equity - peak) / peak);
  }

  return {
    totalReturn: (end - start) / start,
    cagr: years > 0 ? Math.pow(end / start, 1 / years) - 1 : 0,
    maxDrawdown
  };
}
