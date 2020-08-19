const Orders = require('./Orders');
const FakeGeneratedOrders = [
  { value: '10' }, { value: '11' }, { value: '12' }
];

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

test('shoud create a new bid', () => {
  expect(Orders.getBids().length).toBe(0);
  Orders.newBid(FakeGeneratedOrders);
  expect(Orders.getBids().length).toBe(3);
});

test('shoud create a new ask', () => {
  expect(Orders.getAsks().length).toBe(0);
  Orders.newAsk(FakeGeneratedOrders);
  expect(Orders.getAsks().length).toBe(3);
});

test('shoud remove be filled bids and asks', () => {
  Orders.newBid(FakeGeneratedOrders);
  expect(Orders.getBids().length).toBe(3);
  Orders.check(FakeOrders);
  expect(Orders.getBids().length).toBe(0);
});
