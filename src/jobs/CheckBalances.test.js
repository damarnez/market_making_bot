const CheckBalances = require('./CheckBalances');


test('shoud exist run function on the Check', () => {
  expect(typeof CheckBalances.run).toBe('function');
});
