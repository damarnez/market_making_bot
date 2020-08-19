const Orders = require('./Orders');
const Balance = require('./Balance');
const FakeBids = [
  { value: '65' }, { value: '69' }, { value: '66' }
];
const FakeAsk = [
  { value: '99' }, { value: '98' }, { value: '97' }
];
const FakeOrders = [
  [
    70,
    1,
    20
  ],
  [
    100,
    1,
    -2
  ]
];

test('shoud create a new bid', () => {
  expect(Orders.getBids().length).toBe(0);
  Orders.newBid(FakeBids);

  expect(Orders.getBids().length).toBe(3);
  Orders.cleanOrders();
});

test('shoud create a new ask', () => {
  expect(Orders.getAsks().length).toBe(0);
  Orders.newAsk(FakeAsk);
  expect(Orders.getAsks().length).toBe(3);
  Orders.cleanOrders();
});

test('shoud remove be filled bids and asks and the balance updated', () => {
  const balance = Balance.get();
  expect(balance.ETH).toBe(process.env.INIT_ETH || "10.000000000000000000");
  expect(balance.USD).toBe(process.env.INIT_USD || "20000.00000");
  const newFakeBids = [
    { value: '62' }, { value: '63' }, { value: '68' }
  ];

  const newFakeAsks = [
    { value: '96' }, { value: '95' }, { value: '94' }
  ];

  Orders.newBid(newFakeBids);
  expect(Orders.getBids().length).toBe(3);
  Orders.newAsk(newFakeAsks);
  expect(Orders.getAsks().length).toBe(3);

  const FakeOrdersFill = [
    [
      60,
      1,
      20
    ],
    [
      100,
      1,
      -2
    ]
  ];

  Orders.check(FakeOrdersFill);
  expect(Orders.getBids().length).toBe(0);

  const updatedBalance = Balance.get();
  expect(Orders.getBids().length).toBe(0);

  expect(updatedBalance.ETH).not.toBe(process.env.INIT_ETH || "10.000000000000000000");
  expect(updatedBalance.USD).not.toBe(process.env.INIT_USD || "20000.00000");

  Orders.cleanOrders();
});
