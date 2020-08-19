const Balance = require('./Balance')

test('should return the current balance', () => {
  const balance = Balance.get();
  expect(balance.ETH).toBe(process.env.INIT_ETH || "10.000000000000000000");
  expect(balance.USD).toBe(process.env.INIT_USD || "20000.00000");
});


test('should update the balance', () => {
  const expected = '500';
  Balance.update({ USD: expected, ETH: expected });
  const balance = Balance.get();
  expect(balance.ETH).toBe(expected);
  expect(balance.USD).toBe(expected);
});
