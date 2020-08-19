const Balance = require('./Balance')

test('should return the current balance', () => {
  const balance = Balance.get();
  expect(balance.ETH).toBe(process.env.INIT_ETH);
  expect(balance.USD).toBe(process.env.INIT_USD);
});


test('should update the balance', () => {
  const expected = '500';
  Balance.update({ USD: expected, ETH: expected });
  const balance = Balance.get();
  expect(balance.ETH).toBe(expected);
  expect(balance.USD).toBe(expected);
});
