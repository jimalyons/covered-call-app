export function analyze(opt, stockPrice) {
  const premiumYield = opt.premium / stockPrice;
  const annualizedYield = premiumYield * (365 / opt.days);
  const upside = Math.max(0, (opt.strike - stockPrice) / stockPrice);
  const assignmentProb = Math.abs(opt.delta);

  return {
    ...opt,
    premiumYield,
    annualizedYield,
    expectedReturn:
      annualizedYield * (1 - assignmentProb) +
      (annualizedYield + upside) * assignmentProb
  };
}
