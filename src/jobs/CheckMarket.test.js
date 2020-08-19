
const axios = require('axios');
jest.mock('axios');
const CheckMarket = require('./CheckMarket');
const Orders = require('../helpers/Orders');
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

const FakeStragegy = {
  run: async () => {
    return {
      bids: [{ value: 1 }, { value: 0.1 }, { value: 0.2 }],
      asks: [{ value: 100000 }, { value: 11000 }, { value: 12000 }]
    };
  }
}

test('shoud exist run function on the Check', () => {
  expect(typeof CheckMarket.run).toBe('function');
});

test('should generate 5 bids and 5 asks', async () => {
  axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: FakeOrders }));
  await CheckMarket.run([FakeStragegy])();
  expect(Orders.getBids().length).toBe(3);
  expect(Orders.getAsks().length).toBe(3);
  Orders.cleanOrders();
});