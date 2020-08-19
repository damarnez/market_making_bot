const Calcs = require('./Calcs')
const BigNumber = require('bignumber.js');
const FakeOrders = [
  [
    0.01,
    1,
    20
  ],
  [
    8000000000,
    1,
    -2
  ]
];

test('should return best bid', () => {
  const bestBid = Calcs.bestBid(FakeOrders)
  expect(bestBid[0]).toBe(FakeOrders[0][0]);
});


test('should return best ask', () => {
  const bestAsk = Calcs.bestAsk(FakeOrders)
  expect(bestAsk[0]).toBe(FakeOrders[1][0]);
});

test('shoud return asks and bids from a list of orders', () => {
  const { bids, asks } = Calcs.splitBidAndAsk(FakeOrders)
  expect(bids.length).toBe(1);
  expect(asks.length).toBe(1);
});


test('shoud return random float', () => {
  const from = '0.00001';
  const to = '0.00002';
  const num = Calcs.randomFloat(from, to);
  const resp = new BigNumber(num);

  expect(resp.isGreaterThanOrEqualTo(from)).toBe(true);
  expect(resp.isLessThanOrEqualTo(to)).toBe(true);
});

test('shoud return random float with bigger numbers', () => {
  const from = '100000000000000000000000000';
  const to = '100000000000000000300000000';
  const num = Calcs.randomFloat(from, to);
  const resp = new BigNumber(num);

  expect(resp.isGreaterThanOrEqualTo(from)).toBe(true);
  expect(resp.isLessThanOrEqualTo(to)).toBe(true);
});