export async function fetchOptions(symbol) {
  // Mock options data (replace with real provider later)
  return {
    stockPrice: 190,
    options: [
      { strike: 195, premium: 3.2, days: 7, delta: 0.25, iv: 0.28 },
      { strike: 200, premium: 5.4, days: 30, delta: 0.30, iv: 0.31 }
    ]
  };
}
