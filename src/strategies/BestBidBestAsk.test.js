const BestBidBestAsk = require('./BestBidBestAsk');

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

test('shoud generate 5xBids and 5xAsks', async () => {
  const reps = await BestBidBestAsk.run(FakeOrders);
  expect(reps.asks.length).toBe(5);
  expect(reps.bids.length).toBe(5);
});
